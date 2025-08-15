"""
GitHub OAuth routes for authentication
"""

import requests
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from app.database import get_db
from app.users.models import User
from app.auth.jwt_utils import create_access_token
from app.auth.dependencies import get_current_user
from app.auth.schemas import TokenResponse
from app.schemas import UserProfileResponse
from app.utils.serialization import load_user_with_relationships, serialize_sqlalchemy_to_pydantic

# Load environment variables
load_dotenv("env.local")

# GitHub OAuth Configuration
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
GITHUB_CALLBACK_URL = os.getenv("GITHUB_CALLBACK_URL")
FRONTEND_URL = "http://localhost:3000"  # Frontend URL for redirect

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.get("/github/login")
async def github_login():
    """
    Redirect user to GitHub OAuth authorization
    """
    if not GITHUB_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GitHub OAuth not configured"
        )
    
    # GitHub OAuth authorization URL
    github_auth_url = (
        "https://github.com/login/oauth/authorize?"
        f"client_id={GITHUB_CLIENT_ID}&"
        f"redirect_uri={GITHUB_CALLBACK_URL}&"
        "scope=user:email&"
        "state=devsnap_oauth"
    )
    
    return RedirectResponse(url=github_auth_url)

@router.get("/github/callback")
async def github_callback(code: str, state: str, db: Session = Depends(get_db)):
    """
    Handle GitHub OAuth callback and create/update user
    """
    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Authorization code not provided"
        )
    
    try:
        # Exchange authorization code for access token
        token_response = requests.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code
            },
            headers={"Accept": "application/json"}
        )
        
        if token_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to exchange code for token"
            )
        
        token_data = token_response.json()
        access_token = token_data.get("access_token")
        
        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Access token not received"
            )
        
        # Get user data from GitHub
        user_response = requests.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"token {access_token}",
                "Accept": "application/vnd.github.v3+json"
            }
        )
        
        if user_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get user data from GitHub"
            )
        
        github_user = user_response.json()
        
        # Check if user exists in database
        user = db.query(User).filter(User.github_id == str(github_user["id"])).first()
        
        if user:
            # Update existing user
            user.name = github_user["name"] or github_user["login"]
            user.email = github_user.get("email")  # Can be None
            user.github_username = github_user["login"]
            user.profile_image = github_user.get("avatar_url")
        else:
            # Create new user
            user = User(
                github_id=str(github_user["id"]),
                name=github_user["name"] or github_user["login"],
                email=github_user.get("email"),  # Can be None
                github_username=github_user["login"],
                profile_image=github_user.get("avatar_url")
            )
            db.add(user)
        
        db.commit()
        db.refresh(user)
        
        # Create JWT token
        token_data = {
            "sub": str(user.id),
            "email": user.email,
            "github_id": user.github_id
        }
        
        access_token = create_access_token(data=token_data)
        
        # Redirect to frontend with token
        frontend_url = f"{FRONTEND_URL}/auth/callback?token={access_token}&provider=github"
        return RedirectResponse(url=frontend_url)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OAuth callback failed: {str(e)}"
        )

@router.get("/me", response_model=UserProfileResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get current user profile with all related data (projects, blogs, etc.)
    """
    # Load user with all relationships using utility function
    user_with_relations = load_user_with_relationships(db, user_id=str(current_user.id))
    
    if not user_with_relations:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Clean serialization using Pydantic
    return serialize_sqlalchemy_to_pydantic(user_with_relations, UserProfileResponse)

@router.post("/logout")
async def logout():
    """
    Logout endpoint (client should remove token)
    """
    return {"message": "Successfully logged out"}

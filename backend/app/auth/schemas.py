"""
Authentication schemas for OAuth requests and responses
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TokenResponse(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    name: str

class UserProfileResponse(BaseModel):
    """Schema for user profile response"""
    id: str
    name: str
    email: str
    github_id: Optional[str] = None
    github_username: Optional[str] = None
    profile_image: Optional[str] = None
    created_at: datetime
    updated_at: datetime

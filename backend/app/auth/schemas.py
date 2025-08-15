"""
Authentication schemas for OAuth requests and responses
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Import the comprehensive UserProfileResponse from shared schemas
from app.schemas import UserProfileResponse

class TokenResponse(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    name: str

# UserProfileResponse is now imported from app.users.schemas
# This ensures consistency across the application

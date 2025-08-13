"""
User schemas for request/response validation
"""

from uuid import UUID
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Create schema (for POST requests)
class UserCreate(BaseModel):
    """Schema for creating a new user"""
    name: str
    email: EmailStr
    github_id: Optional[str] = None
    github_username: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    theme_preference: str = "light"

# Update schema (for PUT requests)
class UserUpdate(BaseModel):
    """Schema for updating a user"""
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    github_id: Optional[str] = None
    github_username: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    theme_preference: Optional[str] = None

# Response schema (for GET requests)
class UserResponse(BaseModel):
    """Schema for user responses"""
    id: UUID
    name: str
    email: str
    github_id: Optional[str] = None
    github_username: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    theme_preference: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy model

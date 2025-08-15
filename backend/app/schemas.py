"""
Shared schemas for the application
"""

from uuid import UUID
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Import the response schemas for proper typing
from app.projects.schemas import ProjectResponse
from app.blogs.schemas import BlogResponse

# Comprehensive user profile schema (includes all related data)
class UserProfileResponse(BaseModel):
    """Schema for comprehensive user profile responses including projects and blogs"""
    id: UUID
    name: str
    email: Optional[str] = None  # GitHub users might not have public email
    github_id: Optional[str] = None
    github_username: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    theme_preference: str
    created_at: datetime
    updated_at: datetime
    projects: List[ProjectResponse] = []
    blogs: List[BlogResponse] = []
    
    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy model

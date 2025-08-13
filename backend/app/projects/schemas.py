"""
Project schemas for request/response validation
"""

from uuid import UUID
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Create schema (for POST requests)
class ProjectCreate(BaseModel):
    """Schema for creating a new project"""
    user_id: UUID
    title: str
    description: Optional[str] = None
    tech_stack: Optional[list[str]] = None
    github_link: Optional[str] = None
    demo_link: Optional[str] = None
    summary: Optional[str] = None

# Update schema (for PUT requests)
class ProjectUpdate(BaseModel):
    """Schema for updating a project"""
    user_id: Optional[UUID] = None
    title: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[list[str]] = None
    github_link: Optional[str] = None
    demo_link: Optional[str] = None
    summary: Optional[str] = None

# Response schema (for GET requests)
class ProjectResponse(BaseModel):
    """Schema for project responses"""
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str] = None
    tech_stack: Optional[list[str]] = None
    github_link: Optional[str] = None
    demo_link: Optional[str] = None
    summary: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy model

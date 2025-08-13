"""
Blog schemas for request/response validation
"""

from uuid import UUID
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Create schema (for POST requests)
class BlogCreate(BaseModel):
    """Schema for creating a new blog"""
    user_id: UUID
    title: str
    content: str
    summary: Optional[str] = None

# Update schema (for PUT requests)
class BlogUpdate(BaseModel):
    """Schema for updating a blog"""
    user_id: Optional[UUID] = None
    title: Optional[str] = None
    content: Optional[str] = None
    summary: Optional[str] = None

# Response schema (for GET requests)
class BlogResponse(BaseModel):
    """Schema for blog responses"""
    id: UUID
    user_id: UUID
    title: str
    content: str
    summary: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy model

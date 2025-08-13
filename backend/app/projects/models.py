"""
Projects model - represents the projects table
"""

from sqlalchemy import Column, String, Text, DateTime, ARRAY, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import uuid

class Project(Base):
    """
    Project model - represents the projects table
    
    Fields:
    - id: UUID primary key (auto-generated)
    - user_id: Foreign key to users table (required)
    - title: Project title (required)
    - description: Project description (optional)
    - tech_stack: Array of technologies used (optional)
    - github_link: Link to GitHub repository (optional)
    - demo_link: Link to live demo (optional)
    - summary: AI-generated project summary (optional)
    - created_at: Timestamp when project was created
    - updated_at: Timestamp when project was last updated
    """
    __tablename__ = "projects"
    
    # Primary key - UUID for better security
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Foreign key to users table
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    
    # Project information
    title = Column(String(255), nullable=False)
    description = Column(Text)
    tech_stack = Column(ARRAY(String))
    github_link = Column(String(255))
    demo_link = Column(String(255))
    summary = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationship to User model
    user = relationship("User", back_populates="projects")

"""
User model - represents the users table
"""

from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import uuid

class User(Base):
    """
    User model - represents the users table
    
    Fields:
    - id: UUID primary key (auto-generated)
    - name: User's full name (required)
    - email: User's email address (required, unique)
    - github_id: GitHub OAuth ID for authentication (optional, unique)
    - github_username: GitHub username (optional)
    - bio: User biography (AI-generated)
    - profile_image: URL to profile image
    - theme_preference: UI theme preference (default: 'light')
    - created_at: Timestamp when user was created
    - updated_at: Timestamp when user was last updated
    """
    __tablename__ = "users"
    
    # Primary key - UUID for better security
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # User information
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=True)
    github_id = Column(String(255), unique=True, nullable=True)  # GitHub OAuth ID
    github_username = Column(String(100))
    bio = Column(Text)
    profile_image = Column(Text)
    theme_preference = Column(String(50), default="light")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")

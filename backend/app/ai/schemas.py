"""
AI schemas for request/response validation
"""

from pydantic import BaseModel
from typing import Optional, List

# Bio generation request
class BioGenerationRequest(BaseModel):
    """Request schema for bio generation"""
    name: str  # Required: user's name
    current_role: Optional[str] = None  # e.g., "Junior Frontend Developer"
    skills: Optional[List[str]] = None  # e.g., ["React", "Python", "AWS"]
    tone_preference: Optional[str] = "professional"  # professional, friendly, funny, etc.
    

# Project summary generation request
class ProjectSummaryRequest(BaseModel):
    """Request schema for project summary generation"""
    title: str  # Required: project title
    description: Optional[str] = None  # Optional: project description
    tech_stack: Optional[List[str]] = None  # Optional: technologies used
    
# AI response
class AIResponse(BaseModel):
    """Response schema for AI-generated content"""
    content: str  # The AI-generated text
    success: bool  # Whether the request was successful
    message: Optional[str] = None  # Optional message

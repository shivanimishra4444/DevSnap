"""
AI router - handles AI-powered content generation endpoints
"""

from fastapi import APIRouter, HTTPException
from app.ai.service import AIService
from app.ai.schemas import BioGenerationRequest, ProjectSummaryRequest, AIResponse

# Create router
router = APIRouter()

@router.post("/generate-bio", response_model=AIResponse)
async def generate_bio(request: BioGenerationRequest):
    """
    Generate a compelling bio for a user using AI
    
    This endpoint takes user information and generates a professional bio
    suitable for a portfolio website.
    """
    try:
        # Prepare user info for AI service
        user_info = {
            "name": request.name,
            "current_role": request.current_role,
            "skills": request.skills or [],
            "tone_preference": request.tone_preference,
        }
        
        # Generate bio using AI
        generated_bio = await AIService.generate_bio(user_info)
        
        # Return the response
        return AIResponse(
            content=generated_bio,
            success=True,
            message="Bio generated successfully"
        )
        
    except Exception as e:
        # If something goes wrong, return an error
        raise HTTPException(
            status_code=500,
            detail=f"Error generating bio: {str(e)}"
        )

@router.post("/generate-project-summary", response_model=AIResponse)
async def generate_project_summary(request: ProjectSummaryRequest):
    """
    Generate a compelling project summary using AI
    
    This endpoint takes project information and generates a professional
    summary suitable for a portfolio.
    """
    try:
        # Prepare project info for AI service
        project_info = {
            "title": request.title,
            "description": request.description,
            "tech_stack": request.tech_stack or [],
        }
        
        # Generate project summary using AI
        generated_summary = await AIService.generate_project_summary(project_info)
        
        # Return the response
        return AIResponse(
            content=generated_summary,
            success=True,
            message="Project summary generated successfully"
        )
        
    except Exception as e:
        # If something goes wrong, return an error
        raise HTTPException(
            status_code=500,
            detail=f"Error generating project summary: {str(e)}"
        )

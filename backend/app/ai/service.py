"""
AI Service for generating content using OpenAI
"""

from openai import OpenAI
from typing import Optional
from app.ai.config import OPENAI_API_KEY, OPENAI_MODEL, MAX_TOKENS, TEMPERATURE

# Configure OpenAI client
client = None
if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)

class AIService:
    """Service for AI-powered content generation"""
    
    @staticmethod
    async def generate_bio(user_info: dict) -> str:
        """
        Generate a compelling bio for a user based on their information
        
        Args:
            user_info: Dictionary containing user information
                - name: User's name
                - current_role: Current job role
                - skills: List of technical skills
                - tone_preference: Desired tone (professional, friendly, funny)
        Returns:
            Generated bio text
        """
        # Check if we have an API key
        if not OPENAI_API_KEY:
            return "AI service not configured. Please add OPENAI_API_KEY to your environment variables."
        
        # Get tone preference and set appropriate instructions
        tone = user_info.get('tone_preference', 'professional').lower()
        tone_instructions = {
            'professional': 'Professional and formal tone, suitable for corporate environments',
            'friendly': 'Warm and approachable tone, making connections with readers',
            'funny': 'Light-hearted and humorous tone, showing personality while staying professional',
            'casual': 'Relaxed and conversational tone, like talking to a colleague'
        }.get(tone, 'Professional and engaging tone')
        
        # Create a prompt (instructions) for the AI
        prompt = f"""
        Write a {tone} portfolio bio for {user_info.get('name', 'Developer')}.
        
        User Information:
        - Name: {user_info.get('name', 'Developer')}
        - Current Role: {user_info.get('current_role', 'Developer')}
        - Skills: {', '.join(user_info.get('skills', []))}
        
        
        Requirements:
        - {tone_instructions}
        - Highlight their role and key skills
        - Include passion for technology and development
        - Keep it concise (2-3 sentences)
        - Make it suitable for a portfolio website
        
        Generate the bio:
        """
        
        try:
            # Send request to OpenAI using new API
            response = client.chat.completions.create(
                model=OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a professional bio writer specializing in developer portfolios."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=MAX_TOKENS,
                temperature=TEMPERATURE
            )
            
            # Return the AI's response
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            return f"Error generating bio: {str(e)}"
    
    @staticmethod
    async def generate_project_summary(project_info: dict) -> str:
        """
        Generate a compelling project summary based on project information
        
        Args:
            project_info: Dictionary containing project information
                - title: Project title
                - description: Project description
                - tech_stack: List of technologies used
                - github_link: GitHub repository link
                - demo_link: Demo link (optional)
        
        Returns:
            Generated project summary
        """
        # Check if we have an API key
        if not OPENAI_API_KEY:
            return "AI service not configured. Please add OPENAI_API_KEY to your environment variables."
        
        # Create a prompt for project summary
        prompt = f"""
        Generate a compelling project summary for: {project_info.get('title', 'Project')}
        
        Project Information:
        - Title: {project_info.get('title', 'Project')}
        - Description: {project_info.get('description', 'No description provided')}
        - Tech Stack: {project_info.get('tech_stack', [])}
       
        
        Requirements:
        - Highlight key features and technologies
        - Explain the problem it solves
        - Mention the impact or results
        - Keep it concise (2-3 sentences)
        - Professional and engaging tone
        - Suitable for a portfolio
        
        Generate the project summary:
        """
        
        try:
            # Send request to OpenAI using new API
            response = client.chat.completions.create(
                model=OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a technical writer specializing in project descriptions for developer portfolios."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=MAX_TOKENS,
                temperature=TEMPERATURE
            )
            
            # Return the AI's response
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            return f"Error generating project summary: {str(e)}"

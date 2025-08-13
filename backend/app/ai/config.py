"""
AI Configuration for OpenAI integration
"""

import os
from dotenv import load_dotenv

# Load environment variables from env.local file
load_dotenv("env.local")

# OpenAI Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")

# AI Settings
MAX_TOKENS = 500  # Maximum length of AI response
TEMPERATURE = 0.7  # Controls creativity (0.0 = very focused, 1.0 = very creative)

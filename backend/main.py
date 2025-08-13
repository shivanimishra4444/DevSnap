"""
DevSnap FastAPI Backend 
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Import database and models
from app.database import engine
from app.users.models import User
from app.projects.models import Project
from app.blogs.models import Blog

# Import routers
from app.users.router import router as users_router
from app.projects.router import router as projects_router
from app.ai.router import router as ai_router
from app.auth.router import router as auth_router

# Create database tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    User.metadata.create_all(bind=engine)
    Project.metadata.create_all(bind=engine)
    Blog.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    yield
    # Shutdown
    print("🔄 Shutting down DevSnap API...")

# Create FastAPI app
app = FastAPI(
    title="DevSnap API",
    description="A portfolio website builder for developers",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware (allows frontend to communicate with backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api", tags=["Authentication"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(projects_router, prefix="/api/projects", tags=["Projects"])
app.include_router(ai_router, prefix="/api/ai", tags=["AI"])

# Simple test endpoint
@app.get("/")
async def root():
    """
    Root endpoint - Welcome message
    """
    return {
        "message": "Welcome to DevSnap API! 🚀",
        "status": "running",
        "next_step": "Database connection"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "message": "API is running!"}

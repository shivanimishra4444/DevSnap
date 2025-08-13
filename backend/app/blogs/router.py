"""
Blogs router - handles blog-related endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.database import get_db
from app.blogs.models import Blog
from app.blogs.schemas import BlogCreate, BlogUpdate, BlogResponse

# Create router
router = APIRouter()

@router.post("/", response_model=BlogResponse)
def create_blog(blog: BlogCreate, db: Session = Depends(get_db)):
    """
    Create a new blog
    """
    # Create new blog (users can have multiple blogs)
    db_blog = Blog(**blog.dict())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    
    return db_blog

@router.get("/", response_model=List[BlogResponse])
def get_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all blogs with pagination
    """
    blogs = db.query(Blog).offset(skip).limit(limit).all()
    return blogs

@router.get("/{blog_id}", response_model=BlogResponse)
def get_blog(blog_id: UUID, db: Session = Depends(get_db)):
    """
    Get a specific blog by ID
    """
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@router.put("/{blog_id}", response_model=BlogResponse)
def update_blog(blog_id: UUID, blog: BlogUpdate, db: Session = Depends(get_db)):
    """
    Update a specific blog by ID
    """
    # Check if blog exists
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Update blog fields (only non-None values)
    update_data = blog.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_blog, field, value)
    
    # Save changes to database
    db.commit()
    db.refresh(db_blog)
    
    return db_blog

@router.delete("/{blog_id}")
def delete_blog(blog_id: UUID, db: Session = Depends(get_db)):
    """
    Delete a specific blog by ID
    """
    # Check if blog exists
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Delete blog from database
    db.delete(db_blog)
    db.commit()
    
    return {"message": "Blog deleted successfully"}

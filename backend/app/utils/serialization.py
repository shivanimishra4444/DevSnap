"""
Utility functions for clean SQLAlchemy to Pydantic serialization
"""

from typing import TypeVar, Type, List
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

T = TypeVar('T', bound=BaseModel)

def serialize_sqlalchemy_to_pydantic(
    sqlalchemy_obj, 
    pydantic_model: Type[T]
) -> T:
    """
    Cleanly serialize a SQLAlchemy object to a Pydantic model
    
    Args:
        sqlalchemy_obj: The SQLAlchemy model instance
        pydantic_model: The Pydantic model class to serialize to
    
    Returns:
        Pydantic model instance
    """
    return pydantic_model.model_validate(sqlalchemy_obj)

def serialize_sqlalchemy_list_to_pydantic(
    sqlalchemy_objs: List, 
    pydantic_model: Type[T]
) -> List[T]:
    """
    Cleanly serialize a list of SQLAlchemy objects to Pydantic models
    
    Args:
        sqlalchemy_objs: List of SQLAlchemy model instances
        pydantic_model: The Pydantic model class to serialize to
    
    Returns:
        List of Pydantic model instances
    """
    return [pydantic_model.model_validate(obj) for obj in sqlalchemy_objs]

def load_user_with_relationships(db: Session, user_id: str, github_id: str = None):
    """
    Load user with all relationships using eager loading
    
    Args:
        db: Database session
        user_id: User ID (if loading by ID)
        github_id: GitHub ID (if loading by GitHub ID)
    
    Returns:
        User with loaded relationships
    """
    from app.users.models import User
    
    query = db.query(User).options(
        joinedload(User.projects),
        joinedload(User.blogs)
    )
    
    if user_id:
        return query.filter(User.id == user_id).first()
    elif github_id:
        return query.filter(User.github_id == github_id).first()
    
    return None

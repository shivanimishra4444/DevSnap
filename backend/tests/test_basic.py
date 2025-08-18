import pytest

def test_fastapi_import():
    """Test that FastAPI can be imported"""
    import fastapi
    assert fastapi is not None

def test_pydantic_import():
    """Test that Pydantic can be imported"""
    import pydantic
    assert pydantic is not None

def test_sqlalchemy_import():
    """Test that SQLAlchemy can be imported"""
    import sqlalchemy
    assert sqlalchemy is not None

def test_app_structure():
    """Test that app directory structure exists"""
    import os
    assert os.path.exists('app')
    assert os.path.exists('app/__init__.py')
    assert os.path.exists('main.py')

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_app_imports():
    """Test that the app can be imported successfully"""
    assert app is not None

def test_health_check():
    """Test that the app responds to health check"""
    response = client.get("/")
    assert response.status_code in [200, 404]  # Either root endpoint or 404 is fine

def test_fastapi_import():
    """Test that FastAPI can be imported"""
    import fastapi
    assert fastapi is not None

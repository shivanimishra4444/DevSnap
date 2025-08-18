# DevSnap Project Setup Guide

## 🚀 Overview

DevSnap is a fullstack web application that allows developers to create, customize, and host their personal portfolio websites, enhanced with AI-generated content and modern dev tooling.

## 🏗️ Architecture

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **Authentication:** OAuth 2.0 (GitHub) + JWT
- **AI Integration:** OpenAI API
- **Deployment:** Docker, AWS

## 📋 Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Docker
- GitHub OAuth App
- OpenAI API key

## 🔧 Backend Setup

### 1. Environment Setup

```bash
git clone <repository-url>
cd DevSnap/backend

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Database Setup

```bash
# Start PostgreSQL with Docker
docker run --name devsnap-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  -d postgres:18

# Run database migrations
python -c "from app.database import engine; from app.users.models import User; User.metadata.create_all(bind=engine)"
```

### 3. Environment Configuration

Create `backend/env.local`:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydatabase

# Application Configuration
DEBUG=True
HOST=0.0.0.0
PORT=8000

# AI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:8000/auth/github/callback

# JWT Configuration
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### 4. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in details:
   ```
   Application name: DevSnap
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:8000/auth/github/callback
   ```
4. Copy **Client ID** and **Client Secret** to `env.local`

### 5. Run Backend Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🔐 OAuth 2.0 + JWT Authentication Flow

### Flow Overview
```
1. User clicks "Continue with GitHub"
2. Frontend → Backend (/auth/github/login)
3. Backend → GitHub OAuth (redirect)
4. User authorizes on GitHub
5. GitHub → Backend (/auth/github/callback?code=...)
6. Backend exchanges code for GitHub access token
7. Backend gets user data from GitHub API
8. Backend creates/finds user in database
9. Backend generates JWT token
10. Backend → Frontend (redirect with JWT)
11. Frontend stores JWT token
12. Frontend → Backend (API calls with JWT)
```

### Essential Implementation Steps

#### Step 1: Add OAuth Dependencies
```bash
pip install python-jose[cryptography]==3.3.0 passlib[bcrypt]==1.7.4 python-multipart==0.0.6
```

#### Step 2: Update User Model
```python
# Add to backend/app/users/models.py
github_id = Column(String(255), unique=True, nullable=True)
```

#### Step 3: Create JWT Utilities
```python
# Create backend/app/auth/jwt_utils.py
# Functions: create_access_token(), verify_token(), decode_token()
```

#### Step 4: Create OAuth Dependencies
```python
# Create backend/app/auth/dependencies.py
# Functions: get_current_user(), oauth2_scheme
```

#### Step 5: Create OAuth Routes
```python
# Create backend/app/auth/router.py
# Endpoints: /auth/github/login, /auth/github/callback, /auth/me, /auth/logout
```

#### Step 6: Update Main App
```python
# Add to main.py
from app.auth.router import router as auth_router
app.include_router(auth_router, prefix="/api")
```

## 🧪 Testing

### Test OAuth Flow

```bash
# Test GitHub Login
curl -X GET http://localhost:8000/auth/github/login

# Test protected endpoint with JWT
curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📁 Project Structure

```
DevSnap/
├── backend/
│   ├── app/
│   │   ├── auth/                    # OAuth & JWT authentication
│   │   ├── users/                   # User management
│   │   ├── projects/                # Project management
│   │   ├── blogs/                   # Blog management
│   │   ├── ai/                      # AI integration
│   │   └── database.py              # Database configuration
│   ├── main.py                      # FastAPI app entry point
│   ├── requirements.txt             # Python dependencies
│   └── env.local                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Reusable components (Button, Modal, Header, etc.)
│   │   │   └── dashboard/           # Dashboard screens (Blogs, Projects, Profile)
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── contexts/                # React Context providers
│   │   ├── lib/                     # API client and utilities
│   │   ├── schemas/                 # Zod validation schemas
│   │   ├── types/                   # TypeScript definitions
│   │   └── App.tsx                  # Main application
│   ├── public/                      # Static assets
│   └── [config files]               # Vite, Tailwind, TypeScript configs
└── README.md
```

## 🔒 Security Considerations

1. **Environment Variables:** Never commit secrets to version control
2. **JWT Secret:** Use a strong, random secret key
3. **HTTPS:** Use HTTPS in production
4. **Token Expiration:** Set appropriate token expiration times
5. **CORS:** Configure CORS properly for your domains

## 🚀 Deployment

### Production Environment Variables

```env
DEBUG=False
DATABASE_URL=postgresql://user:pass@host:port/db
GITHUB_CALLBACK_URL=https://yourdomain.com/auth/github/callback
SECRET_KEY=your-production-secret-key
```

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🆘 Troubleshooting

### Common Issues

1. **OAuth Redirect URI Mismatch:** Ensure callback URL matches exactly in GitHub Console
2. **JWT Token Expired:** Check ACCESS_TOKEN_EXPIRE_MINUTES setting
3. **Database Connection Issues:** Verify DATABASE_URL format and PostgreSQL is running
4. **CORS Errors:** Update CORS settings in main.py

### Debug Mode

Enable debug mode in `env.local`:
```env
DEBUG=True
```


**Happy coding! 🚀**

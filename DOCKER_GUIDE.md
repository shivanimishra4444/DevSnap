# Simple Docker Guide for DevSnap

A beginner-friendly guide to run DevSnap with Docker.

## What is Docker?

Docker lets you run your app in containers (like lightweight virtual machines). This means:
- ✅ Same environment everywhere (your computer, AWS, etc.)
- ✅ Easy to share with other developers
- ✅ No "it works on my machine" problems

## Quick Start

### 1. Install Docker Desktop
Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your OS.

### 2. Run the App
```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### 3. Access Your App
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## What's Running?

Your app now has 3 containers:

1. **PostgreSQL Database** (port 5432)
   - Stores your data
   - Runs on port 5432

2. **Backend API** (port 8000)
   - FastAPI server
   - Handles API requests
   - Connects to database

3. **Frontend App** (port 3000)
   - React app
   - Served by Nginx
   - Talks to backend API

## Useful Commands

### Start/Stop
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove data
docker-compose down -v
```

### View Logs
```bash
# See all logs
docker-compose logs

# See backend logs only
docker-compose logs backend

# Follow logs (like tail -f)
docker-compose logs -f
```

### Rebuild
```bash
# Rebuild after code changes
docker-compose up --build

# Rebuild specific service
docker-compose build backend
```

### Database
```bash
# Connect to database
docker-compose exec postgres psql -U devsnap_user -d devsnap

# Reset database
docker-compose down -v
docker-compose up --build
```

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### Can't Connect to Database
```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Build Fails
```bash
# Clean everything and rebuild
docker-compose down
docker system prune -a
docker-compose up --build
```

## For AWS Later

When you're ready for AWS, you'll need to:

1. **Change environment variables** for production
2. **Use AWS RDS** instead of local PostgreSQL
3. **Deploy to ECS/EKS** or use AWS App Runner
4. **Set up proper domain names**

But for now, this setup works great for:
- ✅ Local development
- ✅ Testing
- ✅ Sharing with other developers
- ✅ Learning Docker

## File Structure
```
DevSnap/
├── docker-compose.yml          # Runs all services
├── backend/
│   ├── Dockerfile             # Backend container
│   └── .dockerignore          # What to ignore
├── frontend/
│   ├── Dockerfile             # Frontend container
│   ├── nginx.conf             # Web server config
│   └── .dockerignore          # What to ignore
└── DOCKER_GUIDE.md            # This file
```

## Next Steps

1. **Try the commands above** - get comfortable with Docker
2. **Make changes to your code** - see how Docker rebuilds
3. **Learn about volumes** - for persistent data
4. **Explore Docker Hub** - for other images
5. **When ready** - learn about AWS deployment

Remember: Docker is just a tool to make your life easier! 🐳

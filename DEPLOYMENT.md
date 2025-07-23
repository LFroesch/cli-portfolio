# Deployment Guide

## Quick Setup for Render/Railway

### 1. Push to GitHub
Make sure your code is committed and pushed to GitHub.

### 2. For Render:
1. Connect your GitHub repo
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`
4. **Environment**: Node
5. Set environment variables (see below)

### 3. For Railway:
1. Connect your GitHub repo
2. Railway will auto-detect and use the root `package.json`
3. Set environment variables (see below)

## Required Environment Variables

### Backend Variables:
- `NODE_ENV=production`
- `PORT=10000` (or whatever port your service uses)
- `MONGODB_URI` - Your MongoDB connection string
- `GITHUB_TOKEN` - GitHub personal access token (optional, for higher rate limits)
- `GITHUB_USERNAME` - Your GitHub username
- `EMAIL_USER` - Gmail address for contact form
- `EMAIL_PASS` - Gmail app password for contact form
- `FRONTEND_URL` - Your deployed frontend URL (for CORS)

### Frontend Build Variable:
- `VITE_API_URL` - Your deployed backend URL + `/api`

## How it Works

- The root `package.json` handles the build process
- `npm run build` installs both frontend/backend deps and builds the frontend
- `npm start` starts the backend server
- In production, the backend serves the built frontend files
- All API routes are under `/api/*`

## Local Development

- Backend: `npm run dev-backend`
- Frontend: `npm run dev-frontend`
- Or use the individual package.json files in each directory
# 🚀 Deployment Checklist

## ✅ Pre-Deployment (Ready to Deploy!)

Your project is already configured for Render/Railway deployment:

- ✅ Root `package.json` with build scripts
- ✅ Backend serves frontend in production
- ✅ Build command: `npm run build`
- ✅ Start command: `npm start`
- ✅ Node.js engines specified

## 🔧 Deployment Steps

### Option 1: Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. **Build Command**: `npm run build`
4. **Start Command**: `npm start`
5. **Environment**: Node
6. Add environment variables (see below)

### Option 2: Railway
1. Go to [railway.app](https://railway.app) → New Project
2. Deploy from GitHub repo
3. Railway auto-detects settings
4. Add environment variables (see below)

## 🔑 Environment Variables to Set

### Required:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
GITHUB_USERNAME=your_github_username
VITE_API_URL=https://your-deployed-app.onrender.com/api
```

### Optional (but recommended):
```
GITHUB_TOKEN=ghp_your_github_token_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=10000
```

## 🎯 Post-Deployment

1. **Test the site** - Make sure all sections load
2. **Check GitHub stats** - Verify API is working
3. **Test contact form** - If you set up email
4. **Update `VITE_API_URL`** - Use your actual deployed URL

## 💡 Pro Tips

- **MongoDB**: Use MongoDB Atlas (free tier available)
- **GitHub Token**: Create at github.com/settings/tokens (classic)
- **Email**: Use Gmail app password, not regular password
- **Domain**: You can add a custom domain later

---

**Ready to deploy!** Just push to GitHub and connect to Render/Railway! 🎉
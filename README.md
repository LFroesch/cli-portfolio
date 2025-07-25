# Portfolio

A modern, interactive console-style portfolio website built with React and Node.js, featuring a unique game-system inspired interface.

## =� Features

- **Console Interface**: Interactive portfolio experience
- **Real-time Stats**: GitHub integration and visitor analytics
- **Project Showcase**: Dynamic project gallery with media previews
- **Blog System**: Built-in blog with JSON-based content management
- **Contact Form**: Functional contact system with email integration
- **Mobile Responsive**: Optimized for all device sizes
- **Performance Optimized**: Fast loading with modern build tools

## =� Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Custom Animations** - Smooth transitions and effects

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **MongoDB** - Database for analytics and contact forms
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email functionality

### Security & Performance
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Cookie Parser** - Session management

## =� Quick Start

### Prerequisites
- Node.js e 18.0.0
- npm e 8.0.0
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio_site
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create `.env` files in both frontend and backend directories:
   
   **Backend `.env`:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   PORT=5000
   ```

4. **Development**
   ```bash
   # Start frontend dev server
   npm run dev-frontend
   
   # Start backend dev server (in another terminal)
   npm run dev-backend
   ```

5. **Production Build**
   ```bash
   # Build frontend and install dependencies
   npm run build
   
   # Start production server
   npm start
   ```

## <� Available Scripts

### Root Level
- `npm run install-all` - Install dependencies for both frontend and backend
- `npm run build` - Build the complete application for production
- `npm start` - Start the production server
- `npm run dev-frontend` - Start frontend development server
- `npm run dev-backend` - Start backend development server

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start with nodemon for development

## <� Customization

### Portfolio Content
Edit `frontend/src/data.js` to update:
- Personal information
- Skills and technologies
- Project descriptions
- Timeline and experience

### Blog Posts
Modify `frontend/src/blogPosts.json` to add or edit blog content.

### Styling
- Main styles: `frontend/src/index.css`
- Animations: `frontend/src/animations.css`
- Tailwind config: `frontend/tailwind.config.js`

## =' Development

### Adding New Features
1. Frontend components go in `frontend/src/components/`
2. Backend routes go in `backend/src/routes/`
3. Database models in `backend/src/models/`

### Environment Variables
- Development: Use `.env` files in respective directories
- Production: Set environment variables in your hosting platform
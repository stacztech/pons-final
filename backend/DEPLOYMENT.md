# Backend Deployment Guide

## Prerequisites
1. MongoDB Atlas account (for database)
2. Vercel account
3. Environment variables configured

## Steps to Deploy Backend

### 1. Set up MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

### 2. Environment Variables
Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=9000
NODE_ENV=production
```

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts and configure environment variables

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `backend`
5. Configure environment variables in the dashboard

### 4. Environment Variables in Vercel
Add these environment variables in your Vercel project settings:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Your JWT secret key
- `NODE_ENV`: production

### 5. Update CORS Configuration
After deployment, update the CORS origin in `index.js` with your actual frontend domain:
```javascript
app.use(cors({ 
  origin: process.env.NODE_ENV === "production" 
    ? ["https://your-actual-frontend-domain.vercel.app"] 
    : "http://localhost:4200", 
  credentials: true 
}));
```

### 6. Test the API
Test your deployed API endpoints to ensure they're working correctly.

## Important Notes

1. **Database**: Make sure your MongoDB Atlas cluster is accessible from Vercel
2. **Environment Variables**: Never commit sensitive information to your repository
3. **CORS**: Update the CORS configuration with your actual frontend domain
4. **HTTPS**: Vercel automatically provides HTTPS certificates

## Troubleshooting

1. **Connection Errors**: Check your MongoDB Atlas connection string and network access
2. **CORS Errors**: Verify the CORS configuration includes your frontend domain
3. **Environment Variables**: Ensure all required environment variables are set in Vercel 
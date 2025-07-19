# Vercel Deployment Guide

## Overview
This guide explains how to connect your frontend and backend deployments on Vercel.

## Frontend Deployment (pons-final-frontend.vercel.app)

### Environment Configuration
The frontend is now configured to automatically use the correct API URL based on the environment:

- **Development**: `http://localhost:9000/api`
- **Production**: `https://pons-final.vercel.app/api`

### Files Updated
1. `src/environments/environment.ts` - Development configuration
2. `src/environments/environment.prod.ts` - Production configuration
3. All services updated to use environment configuration:
   - `auth.service.ts`
   - `cart.service.ts`
   - `orders.service.ts`

### Build Configuration
The Angular build will automatically use the production environment when building for production.

## Backend Deployment (pons-final.vercel.app)

### Environment Variables
Set these environment variables in your Vercel backend project:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://prabakaran031420043:SjgDpgOZsUvXBRdH@meattt.pbxuidm.mongodb.net/?retryWrites=true&w=majority&appName=Meattt

# JWT Secret for signing tokens
JWT_SECRET=SECRET_KEY_JASHO

# Application Environment
NODE_ENV=production

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ponsmuttonstallandbroilerss@gmail.com
EMAIL_PASS=xbew urkj vwjj wyne
EMAIL_FROM="Pons Broilers" <ponsmuttonstallandbroilerss@gmail.com>

# Server Configuration
PORT=9000

# Client URL (Frontend URL)
CLIENT_URL=https://pons-final-frontend.vercel.app
```

### CORS Configuration
The backend is now configured to allow requests from:
- `http://localhost:4200` (development)
- `https://pons-final-frontend.vercel.app` (production)

### Files Updated
1. `index.js` - Updated CORS configuration and removed frontend serving
2. `vercel.json` - Added Vercel configuration for Node.js deployment

## Deployment Steps

### 1. Backend Deployment
1. Go to your backend Vercel project
2. Navigate to Settings > Environment Variables
3. Add all the environment variables listed above
4. Redeploy the backend

### 2. Frontend Deployment
1. The frontend will automatically use the production API URL
2. No additional configuration needed
3. Redeploy the frontend

## Testing the Connection

### 1. Test Backend API
Visit: `https://pons-final.vercel.app/`
Expected response: `{"success": true, "message": "API is working"}`

### 2. Test Frontend-Backend Connection
1. Open your frontend: `https://pons-final-frontend.vercel.app/`
2. Try to register/login
3. Check browser network tab to ensure requests go to the backend URL

### 3. Common Issues and Solutions

#### CORS Errors
- Ensure the frontend URL is correctly added to the backend CORS configuration
- Check that the backend environment variables are set correctly

#### API Connection Issues
- Verify the backend is deployed and accessible
- Check that the frontend is using the correct production API URL
- Ensure all environment variables are set in Vercel

#### Email Issues
- Verify Gmail app password is correct
- Check that email environment variables are set in Vercel

## Security Notes

1. **JWT Secret**: Use a strong, random secret in production
2. **MongoDB**: Ensure your MongoDB connection string is secure
3. **Email Credentials**: Keep email credentials secure
4. **CORS**: Only allow necessary origins

## Monitoring

1. **Vercel Logs**: Check deployment logs for any errors
2. **Network Tab**: Monitor API requests in browser developer tools
3. **Console Logs**: Check for any JavaScript errors in the frontend

## Troubleshooting

### Backend Not Responding
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Test the backend URL directly

### Frontend Can't Connect to Backend
1. Check CORS configuration
2. Verify API URLs in environment files
3. Check browser console for errors

### Authentication Issues
1. Verify JWT_SECRET is set correctly
2. Check cookie settings
3. Ensure CORS allows credentials

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test API endpoints directly
4. Check browser console for errors 
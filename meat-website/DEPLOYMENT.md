# Deployment Guide for Vercel

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a Vercel account (sign up at vercel.com)
3. Your backend should be deployed separately (you can use Vercel, Railway, Render, or any other platform)

## Steps to Deploy

### 1. Deploy Backend First
- Deploy your Node.js backend to a platform like Vercel, Railway, or Render
- Get the production URL of your backend (e.g., `https://your-backend.vercel.app`)

### 2. Update Environment Configuration
- Update `src/environments/environment.prod.ts` with your actual backend URL:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-actual-backend-url.com/api'
};
```

### 3. Deploy Frontend to Vercel

#### Option A: Using Vercel CLI
1. Navigate to the meat-website directory:
   ```bash
   cd meat-website
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: meat-website (or your preferred name)
   - Directory: ./ (current directory)
   - Override settings: No

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist/meat-website`
   - Install Command: `npm install`

### 4. Environment Variables (if needed)
If your backend requires any environment variables, add them in the Vercel dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add any required variables

### 5. Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to Domains
3. Add your custom domain

## Important Notes

1. **CORS Configuration**: Make sure your backend allows requests from your Vercel domain
2. **Environment Variables**: Update the production environment file with the correct backend URL
3. **Build Process**: The build process will automatically use the production environment
4. **HTTPS**: Vercel automatically provides HTTPS certificates

## Troubleshooting

1. **Build Errors**: Check the build logs in Vercel dashboard
2. **API Connection Issues**: Verify the backend URL in environment.prod.ts
3. **CORS Errors**: Update your backend CORS configuration to allow your Vercel domain

## Post-Deployment

1. Test all functionality on the deployed site
2. Verify API connections work correctly
3. Check that authentication flows work properly
4. Test the shopping cart and checkout process 
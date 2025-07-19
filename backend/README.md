# Meat Website Backend

This is the Node.js/Express backend for the meat website application.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Vercel Deployment

This project is configured for Vercel deployment. The following files have been set up:

- `vercel.json` - Vercel configuration

### Deployment Steps:

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Node.js
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (not needed for Node.js)
   - **Output Directory**: Leave empty
6. Add environment variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `MAILTRAP_USER`: Your Mailtrap username
   - `MAILTRAP_PASS`: Your Mailtrap password
   - Any other environment variables your app needs
7. Deploy

### Important Notes:

- Update the CORS origins in `index.js` with your frontend Vercel URL after deployment
- The frontend URL should be in the format: `https://your-frontend-project-name.vercel.app`
- Make sure all environment variables are properly set in Vercel dashboard

## Environment Variables

Required environment variables:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `MAILTRAP_USER` - Mailtrap username for email functionality
- `MAILTRAP_PASS` - Mailtrap password for email functionality
- `NODE_ENV` - Environment (development/production)

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/orders` - Order management routes
- `/api/addresses` - Address management routes
- `/api/cart` - Cart management routes 
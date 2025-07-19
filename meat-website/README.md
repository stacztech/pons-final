# Meat Website Frontend

This is the Angular frontend for the meat website application.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Vercel Deployment

This project is configured for Vercel deployment. The following files have been set up:

- `vercel.json` - Vercel configuration
- `src/environments/environment.prod.ts` - Production environment variables

### Deployment Steps:

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `meat-website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/meat-website`
6. Add environment variables:
   - `NODE_ENV`: `production`
7. Deploy

### Important Notes:

- Update the `apiUrl` in `src/environments/environment.prod.ts` with your backend Vercel URL after deployment
- The backend URL should be in the format: `https://your-backend-project-name.vercel.app/api`

## Environment Configuration

The application uses environment-specific configuration:

- `environment.ts` - Development settings
- `environment.prod.ts` - Production settings

Make sure to update the production API URL after deploying your backend.

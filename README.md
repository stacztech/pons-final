# Meat Website - Full Stack Application

A full-stack meat ordering website built with Angular (frontend) and Node.js/Express (backend).

## Project Structure

```
pons-final/
├── meat-website/          # Angular Frontend
│   ├── src/
│   ├── package.json
│   ├── vercel.json
│   └── README.md
└── backend/               # Node.js Backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── package.json
    ├── vercel.json
    └── README.md
```

## Features

- User authentication and authorization
- Product catalog with different meat categories
- Shopping cart functionality
- Order management
- Address management
- Admin panel for order management
- Email notifications

## Technology Stack

### Frontend
- Angular 16
- Bootstrap 5
- TypeScript
- RxJS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Mailtrap for email functionality

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Mailtrap account for email testing

### Frontend Setup
```bash
cd meat-website
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Vercel Deployment

This project is configured for deployment on Vercel with separate frontend and backend projects.

### Deployment Steps

#### 1. Backend Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Node.js
   - **Root Directory**: `backend`
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `MAILTRAP_USER`
   - `MAILTRAP_PASS`
   - `NODE_ENV`: `production`
6. Deploy

#### 2. Frontend Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `meat-website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/meat-website`
5. Add environment variables:
   - `NODE_ENV`: `production`
6. Deploy

#### 3. Update Configuration
After both deployments:
1. Update the backend CORS origins in `backend/index.js` with your frontend URL
2. Update the frontend API URL in `meat-website/src/environments/environment.prod.ts` with your backend URL

### Important Notes

- Both projects should be deployed as separate Vercel projects
- Environment variables must be properly configured
- CORS settings need to be updated with the correct URLs
- The frontend will be accessible at `https://your-frontend-project-name.vercel.app`
- The backend API will be accessible at `https://your-backend-project-name.vercel.app`

## Environment Variables

### Backend Required Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `MAILTRAP_USER` - Mailtrap username
- `MAILTRAP_PASS` - Mailtrap password
- `NODE_ENV` - Environment (development/production)

### Frontend Required Variables
- `NODE_ENV` - Environment (development/production)

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check-auth` - Check authentication status
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item quantity
- `POST /api/cart/remove` - Remove item from cart
- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Add new address

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 
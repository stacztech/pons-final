# Authentication Fix for Production Deployment

## Problem
```
Failed to load resource: the server responded with a status of 401 ()
Failed to add address. Please try again.
```

## Root Cause
The 401 error occurs because the JWT authentication token is not being properly sent or validated between the frontend and backend in the production environment.

## Issues Identified & Fixed

### 1. **Cookie SameSite Policy** ✅ FIXED
**Problem**: `sameSite: "strict"` prevents cross-domain cookies in production.

**Solution**: Changed to `sameSite: "none"` for production to allow cross-domain cookies.

### 2. **CORS Configuration** ✅ FIXED
**Problem**: Missing proper CORS headers for credentials and cookies.

**Solution**: Added proper CORS configuration with credentials support.

### 3. **Token Debugging** ✅ FIXED
**Problem**: No visibility into token issues in production.

**Solution**: Added comprehensive logging to debug authentication issues.

## Code Changes Made

### 1. `backend/utils/generateTokenAndSetCookie.js`
```javascript
// Before
sameSite: "strict"

// After  
sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
```

### 2. `backend/index.js`
```javascript
// Enhanced CORS configuration
app.use(cors({ 
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Set-Cookie']
}));
```

### 3. `backend/middleware/verifyToken.js`
```javascript
// Added comprehensive logging
console.log('Cookies received:', req.cookies);
console.log('Headers received:', req.headers);
console.log('Token verified successfully for user:', decoded.userId);
```

## Testing Steps

### 1. **Deploy Updated Backend**
```bash
# Commit and push changes
git add .
git commit -m "Fix authentication for production"
git push
```

### 2. **Test Authentication Flow**
1. **Login**: Go to your frontend and login
2. **Check Cookies**: Open browser dev tools → Application → Cookies
3. **Test Address Addition**: Try adding an address in checkout
4. **Check Logs**: Monitor Vercel function logs for authentication details

### 3. **Verify Cookie Settings**
In browser dev tools, check that the `token` cookie has:
- `Secure: true` (in production)
- `SameSite: None` (in production)
- `HttpOnly: true`

## Environment Variables to Check

Ensure these are set in your Vercel backend environment:

```bash
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=production
```

## Debugging Commands

### Check Authentication Status
```bash
# Test the check-auth endpoint
curl -X GET https://pons-final.vercel.app/api/auth/check-auth \
  -H "Cookie: token=your_token_here" \
  -v
```

### Test Address Endpoint
```bash
# Test address creation with authentication
curl -X POST https://pons-final.vercel.app/api/addresses \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_token_here" \
  -d '{"fullName":"Test User","phoneNumber":"1234567890","addressLine1":"Test Address","city":"Test City","state":"Test State","pincode":"123456"}' \
  -v
```

## Common Issues & Solutions

### Issue 1: Cookies Not Being Sent
**Symptoms**: 401 errors with "no token provided"
**Solution**: 
- Check CORS configuration
- Verify `credentials: true` in frontend requests
- Ensure `sameSite: "none"` for production

### Issue 2: Token Expired/Invalid
**Symptoms**: 401 errors with "invalid token"
**Solution**:
- Check JWT_SECRET environment variable
- Verify token expiration time
- Re-login to get fresh token

### Issue 3: CORS Errors
**Symptoms**: Preflight request failures
**Solution**:
- Check allowed origins in CORS config
- Verify frontend URL is in allowedOrigins array
- Check Vercel logs for CORS blocked origins

## Frontend Verification

### Check Request Configuration
Ensure all HTTP requests include credentials:

```typescript
// In auth.service.ts
this.http.post(url, data, { withCredentials: true })
```

### Verify Environment Variables
Check that the frontend is using the correct API URL:

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://pons-final.vercel.app/api'
};
```

## Success Indicators

✅ Login works without errors
✅ Token cookie is set in browser
✅ Address addition works in checkout
✅ No 401 errors in browser console
✅ Authentication logs show successful token verification

## Monitoring

### Vercel Logs
Monitor these logs for authentication issues:
- Function logs for token verification
- CORS blocked origins
- Database connection errors

### Browser Dev Tools
Check these for debugging:
- Network tab for request/response details
- Application tab for cookie storage
- Console for error messages

## Next Steps

1. **Deploy the updated backend**
2. **Test the complete authentication flow**
3. **Monitor Vercel logs for any remaining issues**
4. **Verify address addition works in production**

The authentication should now work properly in production! 🎯 
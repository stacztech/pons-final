# Troubleshooting Deployment Issues

## Current Issues:
1. **401 Unauthorized** - Authentication problems
2. **500 Internal Server Error** - Backend server errors
3. **Email sending failures** - OTP not being sent

## Step-by-Step Fix

### 1. Backend Environment Variables

**Go to your backend Vercel project** and set these environment variables:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://prabakaran031420043:SjgDpgOZsUvXBRdH@meattt.pbxuidm.mongodb.net/?retryWrites=true&w=majority&appName=Meattt

# JWT Configuration
JWT_SECRET=SECRET_KEY_JASHO

# Environment
NODE_ENV=production

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ponsmuttonstallandbroilerss@gmail.com
EMAIL_PASS=xbew urkj vwjj wyne
EMAIL_FROM="Pons Broilers" <ponsmuttonstallandbroilerss@gmail.com>

# Server Configuration
PORT=9000

# Frontend URL
CLIENT_URL=https://pons-final-frontend.vercel.app
```

### 2. Verify Environment Variables

After setting the variables:
1. Go to your backend Vercel project
2. Navigate to **Settings > Environment Variables**
3. Verify all variables are set correctly
4. **Redeploy** the backend

### 3. Test Backend API

Visit: `https://pons-final.vercel.app/`
Expected response: `{"success": true, "message": "API is working"}`

### 4. Check Vercel Logs

1. Go to your backend Vercel project
2. Click on the latest deployment
3. Check **Functions** tab for any errors
4. Look for specific error messages

### 5. Common Issues & Solutions

#### Issue: 500 Error on /api/auth/send-otp
**Possible Causes:**
- Missing environment variables
- Database connection issues
- Email configuration problems

**Solutions:**
1. Verify all environment variables are set
2. Check MongoDB connection string
3. Verify Gmail app password is correct

#### Issue: 401 Unauthorized
**Possible Causes:**
- JWT_SECRET not set
- Cookie configuration issues
- CORS problems

**Solutions:**
1. Set JWT_SECRET environment variable
2. Check CORS configuration
3. Verify cookie settings

#### Issue: Email Not Sending
**Possible Causes:**
- Gmail app password incorrect
- Email environment variables not set
- Gmail security settings

**Solutions:**
1. Verify Gmail app password
2. Check email environment variables
3. Ensure Gmail allows "less secure apps" or use app password

### 6. Gmail App Password Setup

If emails are not sending:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
   - Use this password in EMAIL_PASS

### 7. Database Connection Test

Add this to your backend to test MongoDB connection:

```javascript
// In index.js, after connectDB()
app.get("/test-db", async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const status = mongoose.connection.readyState;
    const statusText = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    res.json({ 
      success: true, 
      dbStatus: statusText[status],
      message: 'Database connection test'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
```

### 8. Frontend Testing

After fixing backend issues:

1. **Clear browser cache** and cookies
2. **Test registration** with a new email
3. **Check browser console** for any remaining errors
4. **Verify network requests** go to production URL

### 9. Debugging Steps

1. **Check Vercel Function Logs:**
   - Go to backend Vercel project
   - Click on deployment
   - Check Functions tab for errors

2. **Test Individual Endpoints:**
   - `GET /` - Should return API working message
   - `POST /api/auth/send-otp` - Should send email
   - `GET /api/auth/check-auth` - Should return 401 if not authenticated

3. **Monitor Network Requests:**
   - Open browser developer tools
   - Go to Network tab
   - Try to register/login
   - Check request/response details

### 10. Final Verification

After all fixes:

1. **Backend**: `https://pons-final.vercel.app/` returns success
2. **Frontend**: `https://pons-final-frontend.vercel.app/` loads without errors
3. **Registration**: Can register new user and receive OTP
4. **Login**: Can login with registered user
5. **Cart**: Can add items to cart

## Support

If issues persist:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Test database connection
4. Check email configuration 
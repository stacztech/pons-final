# MongoDB Connection Fix

## Issue: Operation `users.findOne()` buffering timed out after 10000ms

This error occurs when MongoDB can't establish a connection within 10 seconds.

## Solution 1: Update MongoDB Connection String

### Current (Problematic):
```
mongodb+srv://prabakaran031420043:SjgDpgOZsUvXBRdH@meattt.pbxuidm.mongodb.net/?retryWrites=true&w=majority&appName=Meattt
```

### Updated (Fixed):
```
mongodb+srv://prabakaran031420043:SjgDpgOZsUvXBRdH@meattt.pbxuidm.mongodb.net/meattt?retryWrites=true&w=majority
```

## Solution 2: Update Backend Environment Variables

Go to your backend Vercel project and update the MONGO_URI:

```env
MONGO_URI=mongodb+srv://prabakaran031420043:SjgDpgOZsUvXBRdH@meattt.pbxuidm.mongodb.net/meattt?retryWrites=true&w=majority
JWT_SECRET=SECRET_KEY_JASHO
NODE_ENV=production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ponsmuttonstallandbroilerss@gmail.com
EMAIL_PASS=xbew urkj vwjj wyne
EMAIL_FROM="Pons Broilers" <ponsmuttonstallandbroilerss@gmail.com>
PORT=9000
CLIENT_URL=https://pons-final-frontend.vercel.app
```

## Solution 3: Update Database Connection Code

Let me also update the database connection to handle timeouts better: 
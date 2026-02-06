# Storage Debugging Guide

## How to Test if Storage is Working

1. **Open your browser's Developer Tools** (F12)
2. **Go to the Network tab**
3. **Go to the Console tab** 

### Step-by-Step Test:

1. **Sign Up with test data:**
   - Email: `test@example.com`
   - Name: `Test User`
   - Password: `password123`
   - Click "Create Account"

2. **Check Console for Messages:**
   Look for these messages in the browser console:
   ```
   [v0] Register attempt: { email: 'test@example.com', name: 'Test User' }
   [v0] Hashing password...
   [v0] Password hashed successfully
   [v0] About to save user: { email: 'test@example.com', name: 'Test User' }
   [v0] Setting user: test@example.com
   [v0] Users in storage after set: ['test@example.com']
   [v0] User registered successfully: test@example.com
   ```

3. **Sign Out:**
   - Click the logout button

4. **Try to Log In:**
   - Email: `test@example.com`
   - Password: `password123`
   - Click "Sign In"

5. **Check Console for Login Messages:**
   Look for these messages:
   ```
   [v0] Login attempt: { email: 'test@example.com' }
   [v0] Storage state - users: ['test@example.com']
   [v0] Looking for user: test@example.com
   [v0] User found, checking password...
   [v0] Stored password hash exists: true
   [v0] Password match result: true
   [v0] Login successful for user: test@example.com
   ```

## If You See "User not found"

This means the storage got reset. This can happen if:
1. You hard-refreshed the page (Ctrl+F5 or Cmd+Shift+R)
2. The server restarted
3. Hot reload cleared the storage

**Solution:** Just sign up again. The storage persists within the same server session.

## If You See "Password mismatch"

This means the password hash doesn't match. Check:
1. You're using the exact same password you signed up with
2. No typos in the password
3. Try clearing the form and re-entering carefully

## Expected Console Output for Working System

### Register Flow:
```
[v0] Register attempt: {...}
[v0] Hashing password...
[v0] Password hashed successfully
[v0] About to save user: {...}
[v0] Setting user: email@example.com
[v0] Users in storage after set: ['email@example.com']
[v0] User registered successfully: email@example.com
```

### Login Flow (should immediately follow):
```
[v0] Login attempt: {...}
[v0] Storage state - users: ['email@example.com']
[v0] Looking for user: email@example.com
[v0] User found, checking password...
[v0] Stored password hash exists: true
[v0] Password match result: true
[v0] Login successful for user: email@example.com
```

## Next Steps

Once login works:
1. You'll be redirected to the Dashboard
2. Try adding transactions
3. Check the analytics and filters
4. Test account transfers

All data is stored in memory for this demo. When you refresh the page or server restarts, data will be reset. For production, connect to MongoDB Atlas as described in the documentation.

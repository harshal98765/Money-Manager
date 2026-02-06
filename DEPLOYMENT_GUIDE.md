# Money Manager - Deployment Guide

This guide covers the complete deployment process for both frontend and backend of the Money Manager application.

## Prerequisites

Before deploying, ensure you have:
1. MongoDB Atlas account with a cluster created
2. Vercel account (for frontend deployment)
3. GitHub account with repositories created
4. Node.js 18+ installed locally

## Step 1: Prepare MongoDB Atlas

1. **Create a MongoDB Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user with read/write permissions
   - Add your IP addresses to the IP whitelist (or allow all: 0.0.0.0/0)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Select "Connect Your Application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<password>` with your credentials

## Step 2: Frontend Deployment (Vercel)

### Option A: Deploy from GitHub

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Money Manager application"
   git branch -M main
   git remote add origin https://github.com/yourusername/money-manager-frontend.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Import the project

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/money_manager?retryWrites=true&w=majority
     NODE_ENV=production
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your app will be available at `https://your-project.vercel.app`

### Option B: Deploy Manually from Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Add environment variables when prompted
# MONGODB_URI: your-connection-string
# NODE_ENV: production
```

## Step 3: Backend Setup (If Separate)

If you want to deploy the backend separately:

1. **Create a separate backend repository**
   ```bash
   git init
   git add .
   git commit -m "Money Manager Backend API"
   git remote add origin https://github.com/yourusername/money-manager-backend.git
   git push -u origin main
   ```

2. **Deploy to Node.js Platform**
   - **Vercel**: Same process as frontend
   - **Heroku**: 
     ```bash
     heroku login
     heroku create money-manager-api
     git push heroku main
     heroku config:set MONGODB_URI=your-connection-string
     ```
   - **Railway.app**:
     - Connect GitHub repo
     - Add MONGODB_URI environment variable
     - Deploy

## Step 4: Post-Deployment Setup

### Update Environment Variables
If deploying to different URLs, update your frontend with the backend URL:

```javascript
// In components/Dashboard.tsx and other API calls
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Use: fetch(`${API_URL}/api/transactions`)
```

### Add to Environment Variables
```
NEXT_PUBLIC_API_URL=https://your-deployed-backend-url.com
```

### Verify Deployment
1. Open your deployed URL
2. Register a new account
3. Add a test transaction
4. Verify data appears in analytics
5. Test filtering and transfers

## Deployment Checklist

- [ ] MongoDB Atlas cluster created and secured
- [ ] Connection string obtained and tested
- [ ] GitHub repositories created and initial code pushed
- [ ] Environment variables set in Vercel
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to backend platform (if separate)
- [ ] Verified authentication works
- [ ] Tested transaction creation
- [ ] Tested analytics display
- [ ] Tested filtering and date ranges
- [ ] Tested account transfers
- [ ] Verified 12-hour edit restriction works

## Testing Post-Deployment

### Authentication Test
```bash
# Test registration
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test login
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### API Test (with valid auth token)
```bash
# Get transactions
curl -X GET https://your-app.vercel.app/api/transactions \
  -H "Cookie: auth_token=your_token_here"

# Create transaction
curl -X POST https://your-app.vercel.app/api/transactions \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=your_token_here" \
  -d '{"type":"income","amount":1000,"category":"Salary","division":"Personal","date":"2026-02-03"}'
```

## Troubleshooting

### MongoDB Connection Error
- Verify MONGODB_URI is correct in environment variables
- Check MongoDB Atlas IP whitelist includes Vercel IPs
- Test connection string locally first

### CORS Issues
- Ensure `credentials: 'include'` is set in fetch calls
- Verify backend allows same-origin requests
- Check cookie settings are not blocking auth

### Authentication Not Persisting
- Clear browser cookies
- Check `HttpOnly` cookie settings
- Verify token is being set correctly

### 404 Errors on API Routes
- Ensure API routes are in correct `/app/api/` directory
- Restart development server after adding new routes
- Check route file naming (route.ts not routes.ts)

## Performance Optimization

### For Production
1. Enable caching on Vercel
2. Use MongoDB indexes for frequently queried fields
3. Implement request debouncing on client
4. Use code splitting for large components
5. Enable compression in Next.js

### MongoDB Indexing
```javascript
// Create indexes for better query performance
db.transactions.createIndex({ userId: 1, date: -1 })
db.transactions.createIndex({ userId: 1, category: 1 })
db.transactions.createIndex({ userId: 1, division: 1 })
db.users.createIndex({ email: 1 }, { unique: true })
```

## Security Recommendations

1. **Enable MongoDB Encryption**
   - Use TLS for all connections
   - Enable encryption at rest

2. **Rate Limiting**
   - Implement rate limiting on authentication endpoints
   - Use middleware like express-rate-limit

3. **HTTPS**
   - Vercel automatically provides HTTPS
   - Ensure all API calls use HTTPS

4. **Secrets Management**
   - Never commit .env files
   - Use Vercel Secrets for sensitive data
   - Rotate keys periodically

## Monitoring & Maintenance

### Monitor Application
- Use Vercel Analytics dashboard
- Check MongoDB Atlas usage metrics
- Monitor error rates in browser console
- Set up email alerts for deployment failures

### Backup Strategy
- Enable MongoDB Atlas automated backups
- Regularly export critical data
- Test backup restoration

### Updates
- Keep dependencies updated
- Monitor security advisories
- Test updates in development first

## Rolling Back

### Vercel Rollback
1. Go to Deployments in Vercel dashboard
2. Find the previous successful deployment
3. Click the three dots
4. Select "Promote to Production"

### Database Rollback
- Use MongoDB Atlas backup and restore feature
- Or manually restore from export

## Deployment Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod

# Check deployment logs
vercel logs
```

## Support & Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [GitHub Help](https://docs.github.com/)

## Notes

- Keep your MONGODB_URI secret and never commit it
- Regularly monitor your MongoDB usage to avoid exceeding free tier limits
- Test thoroughly in staging before pushing to production
- Keep backups of important data

---

Deployment Date: ________________
Frontend URL: ________________
Backend URL (if separate): ________________
Last Updated: ________________

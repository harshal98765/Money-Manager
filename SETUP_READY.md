# Money Manager - Ready to Use!

This app is now **fully functional and ready to use immediately** with no database setup required!

## Quick Start (Works Right Now!)

### 1. Run the App

```bash
npm install
npm run dev
```

Visit: **http://localhost:3000**

### 2. Create an Account

- **Name**: Any name (e.g., "John Doe")
- **Email**: Any email (e.g., "test@gmail.com") 
- **Password**: Any password (e.g., "123456")
- Click "Create Account"

### 3. You're Ready!

The dashboard will load with:
- Add Income/Expense button
- Transaction history
- Analytics charts
- Account management
- And much more!

## Features Included

✓ User Registration & Login  
✓ Add Income & Expense transactions  
✓ 18 categories (Salary, Bonus, Freelance, Food, Rent, etc.)  
✓ Office & Personal divisions  
✓ Date-based filtering  
✓ Edit transactions (within 12 hours)  
✓ Delete transactions  
✓ Real-time analytics charts  
✓ Account balancing (Cash, Bank, Savings, Credit Card)  
✓ Money transfers between accounts  
✓ Category-wise analytics  
✓ Multiple time periods (Daily, Weekly, Monthly, Yearly)  

## How It Works

**Currently**: All data is stored in-memory during your session. Data refreshes when you reload the page.

## Want Persistent Data? (Optional)

To save data permanently with MongoDB:

1. Create free account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Get your connection string
3. Add to `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/money_manager
   ```
4. Uncomment MongoDB code in the API files (instructions inside each file)
5. Restart the app

## Production Deployment

Ready to deploy? Follow these steps:

### Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com and import your repo
# 3. Add environment variable (if using MongoDB):
#    MONGODB_URI=<your-connection-string>
# 4. Deploy!
```

### Or Deploy Anywhere

Works on: AWS, Google Cloud, Azure, Netlify, Railway, Render, Heroku, etc.

## File Structure

```
/app
  /api
    /auth (login, register, check, logout)
    /transactions (CRUD operations)
    /analytics (income/expense reports)
    /accounts (balance tracking)
  page.tsx (main entry)

/components
  Dashboard.tsx (main app)
  AuthPage.tsx (login/register)
  TransactionModal.tsx (add transactions)
  TransactionHistory.tsx (view & edit)
  AnalyticsCharts.tsx (charts)
  Accounts.tsx (account info)
  TransferModal.tsx (money transfers)
```

## No Environment Variables Needed!

The app works completely without any setup. All data is managed in-memory.

## Support

- **Issue**: Can't see the dashboard?
  - Make sure you successfully registered and logged in
  - Check browser console for errors (F12)

- **Lost data after refresh?**
  - This is normal with in-memory storage
  - Add MongoDB to make data persistent

## Next Steps

1. ✓ App is running
2. ✓ Add some transactions
3. Optional: Set up MongoDB for persistent data
4. Optional: Deploy to production

**Enjoy your Money Manager!** 🎉

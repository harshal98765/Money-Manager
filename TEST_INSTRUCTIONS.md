# Money Manager - Testing Instructions

## Problem Fixed
The "Invalid credentials" error when logging in after signup has been **FIXED**.

The issue was that each API route had its own separate in-memory storage. Now all routes share a global storage system via `/lib/storage.ts`.

## How It Works Now

1. **Registration** - User data is saved to shared global storage
2. **Login** - Login checks the same shared storage where registration saved the user
3. **Transactions** - All transaction operations use shared storage

## Test Steps

### 1. Start the Development Server
```bash
npm install
npm run dev
```

### 2. Open the App
Navigate to: `http://localhost:3000`

### 3. Create a New Account
- Click "Create a new account" button
- Fill in:
  - **Name**: Your name (e.g., "John Doe")
  - **Email**: Your email (e.g., "john@example.com")
  - **Password**: Your password (e.g., "password123")
- Click "Create Account"
- You should be logged in automatically

### 4. Test Login/Logout
- Click the "Logout" button (top right)
- You'll see the auth page again
- Click "Sign in" (at the bottom)
- Enter the same email and password you just created
- Click "Sign In"
- **You should now be logged in successfully!**

### 5. Add Some Transactions
- Click "+ Add Transaction" button
- Add an expense or income:
  - Type: Income or Expense
  - Amount: 500
  - Category: Salary (or any category)
  - Division: Personal
  - Description: Test transaction
  - Date: Today
  - Account: Cash
- Click "Add Transaction"
- You should see it appear in the transaction history below

### 6. View Analytics
- Check the charts section to see your income/expense breakdown
- Change the period filter (daily/weekly/monthly/yearly)
- Charts should update based on your transactions

### 7. Test Account Transfers
- Click "+ Transfer Money" button
- Select:
  - From Account: Cash
  - To Account: Bank
  - Amount: 100
- Click "Create Transfer"
- Check the Accounts section to see balances update

### 8. Edit & Delete Transactions
- Click "Edit" on any transaction (within 12 hours of creation)
- Make changes and save
- Or click "Delete" to remove it

## Expected Results

✓ Signup creates user account
✓ Login with same credentials works
✓ Transactions are saved and display
✓ Analytics charts show data
✓ Account transfers work
✓ All data persists during the session

## Browser Console

Open DevTools (F12) and check the Console tab. You should see logs like:
```
[v0] Register attempt: { email: 'john@example.com', name: 'John Doe' }
[v0] User registered successfully: john@example.com
[v0] Login attempt: { email: 'john@example.com' }
[v0] Login successful for user: john@example.com
```

This confirms the shared storage is working.

## Troubleshooting

**Still getting "Invalid credentials"?**
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cookies
- Try a different email address for signup

**Transactions not showing?**
- Make sure you're logged in
- Check the browser console for errors
- Refresh the page

**Charts not displaying?**
- Add at least one transaction first
- Wait a moment for the charts to render
- Check the selected time period

## Notes

- This is a **development version** with in-memory storage
- Data is lost when you refresh or close the browser
- For production, connect to MongoDB Atlas following the DEPLOYMENT_GUIDE.md
- All authentication is working correctly with bcrypt password hashing

# Money Manager - Quick Start Guide

## Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account with a connection string
- A code editor (VS Code recommended)

### Step 1: Clone and Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/money-manager-frontend.git
cd money-manager-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Step 2: Configure MongoDB (1 minute)

Edit `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/money_manager?retryWrites=true&w=majority
NODE_ENV=development
```

Replace with your actual MongoDB Atlas connection string from:
1. MongoDB Atlas → Your Cluster → Connect
2. "Connect Your Application"
3. Copy the connection string and replace placeholders

### Step 3: Run the Application (1 minute)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Step 4: Create Your First Account (1 minute)

1. Click "Sign up" on the login page
2. Enter your name, email, and password
3. Click "Create Account"
4. You're logged in!

## Using the Application

### Add Your First Transaction

1. **Click "Add Transaction"** button in the header
2. **Choose Income or Expense** using the tabs
3. **Fill in the details**:
   - Amount: Enter the transaction amount
   - Category: Select from predefined categories
   - Division: Choose Personal or Office
   - Description: Optional notes (e.g., "Lunch at restaurant")
   - Account: Choose from Cash, Bank, Savings, Credit Card
   - Date: Select the transaction date
4. **Click "Add Transaction"**

### View Your Analytics

1. **Select Time Period**: Choose Daily, Weekly, Monthly, or Yearly
2. **View Charts**:
   - Bar chart shows Income vs Expense comparison
   - Line chart shows spending trends
   - Pie chart shows category distribution
3. **Check Summary Cards**: Total Income and Total Expense at a glance

### Transfer Money Between Accounts

1. **Click "Transfer"** in the Accounts section
2. **Select Accounts**: Choose "From" and "To" accounts
3. **Enter Amount**: Type the transfer amount
4. **Add Description** (optional): Note the reason for transfer
5. **Click "Transfer"**

### Filter and Manage Transactions

1. **Open Transaction History** at the bottom of dashboard
2. **Apply Filters**:
   - Type: Income, Expense, or All
   - Category: Select specific category
   - Division: Personal, Office, or All
   - Date Range: Select start and end dates
3. **Edit a Transaction**:
   - Click the edit icon (pencil)
   - Modify amount and description
   - Note: Only within 12 hours of creation
   - Click "Save"
4. **Delete a Transaction**:
   - Click the delete icon (trash)
   - Confirm deletion

## Key Features Quick Reference

| Feature | How to Use |
|---------|-----------|
| Add Income | Click "Add Transaction" → Select "Income" tab |
| Add Expense | Click "Add Transaction" → Select "Expense" tab |
| View Analytics | Select period from dropdown (Daily/Weekly/Monthly/Yearly) |
| Transfer Money | Click "Transfer" button in Accounts section |
| Filter Transactions | Use dropdowns and date inputs in Transaction History |
| Edit Transaction | Click edit icon, modify amount/description, save within 12 hours |
| Delete Transaction | Click delete icon and confirm |
| Logout | Click "Logout" button in top right |

## Transaction Categories

### Income Categories
- Salary
- Bonus
- Investment
- Freelance
- Gift
- Other

### Expense Categories
- Food
- Movie
- Fuel
- Loan
- Medical
- Rent
- Utilities
- Transportation
- Other

## Account Types

- **Cash**: Physical cash transactions
- **Bank**: Bank account transactions
- **Savings**: Savings account transactions
- **Credit Card**: Credit card transactions

## Division Types

- **Personal**: Personal expenses/income
- **Office**: Business/office related expenses/income

## Tips & Tricks

### Pro Tips

1. **Organize by Division**: Use Personal for personal expenses and Office for business
2. **Consistent Categories**: Use the same categories to make analytics more meaningful
3. **Add Descriptions**: Brief descriptions help you remember transaction details later
4. **Regular Review**: Check your analytics weekly to understand spending patterns
5. **Plan Transfers**: Plan account-to-account transfers at month-end

### Best Practices

1. **Add Transactions Immediately**: Record transactions as they happen for accuracy
2. **Use Proper Categories**: Select the most specific category available
3. **Review Reports**: Check monthly analytics to track progress
4. **Set Goals**: Monitor spending to meet personal financial goals
5. **Keep Descriptions**: Use descriptions for unusual transactions

## Troubleshooting

### Can't Log In?
- Verify email address is correct
- Check password is correct
- Try clearing browser cache and cookies
- Ensure JavaScript is enabled

### Transactions Not Appearing?
- Refresh the page
- Check if you're logged in
- Verify the date is correct

### Accounts Not Showing Balance?
- Make sure you've added transactions
- Check the account name matches
- Refresh the page

### Edit Not Working?
- Verify it's been less than 12 hours since creation
- Check the transaction shows in history
- Try refreshing the page

### 12-Hour Edit Window
- You can only edit transactions within 12 hours of creation
- After 12 hours, you must delete and recreate the transaction

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Close modals |
| `Tab` | Navigate through form fields |
| `Enter` | Submit forms |

## Data Export

Currently, you can:
- View all transactions in the table (copy and paste to Excel)
- Take screenshots of analytics charts
- View account summaries

Future versions will include:
- PDF report export
- Excel data export
- CSV export

## Account Management

### View Your Accounts
- Accounts are shown at the top of the dashboard
- Total balance displays the sum of all accounts
- Individual account cards show balance for each account

### Account Balance
- Balance = All Income - All Expenses in that account
- Transfers between accounts balance correctly
- Accounts can have negative balances (overdraft)

## Security Notes

1. **Your Password**: Never shared with others, securely encrypted
2. **Your Data**: Private to your account, only accessible with your login
3. **Logout**: Always logout on shared computers
4. **Sessions**: Browser cookies store your session token

## Getting Help

### Common Questions

**Q: Can I edit transactions after 12 hours?**
A: No, after 12 hours you must delete and recreate the transaction.

**Q: Can I have multiple accounts?**
A: Yes, you can track Cash, Bank, Savings, and Credit Card accounts simultaneously.

**Q: Will my data be safe?**
A: Yes, passwords are encrypted and data is private to your account.

**Q: Can I export my data?**
A: Currently you can copy transaction data to Excel. PDF export coming soon.

**Q: What happens if I delete a transaction?**
A: It's removed from history and analytics. This cannot be undone.

**Q: Can I share my account?**
A: Each account is individual. Create separate accounts for different users.

**Q: How far back can I view history?**
A: All transactions from your account creation date onwards.

### Contact Support
For issues or questions:
1. Check this guide first
2. Review the main README.md
3. Check DEPLOYMENT_GUIDE.md for server issues
4. Open an issue on GitHub

## Next Steps

1. ✓ Create your account
2. ✓ Add some test transactions
3. ✓ Explore the analytics
4. ✓ Try filtering transactions
5. ✓ Test a money transfer
6. → Read README.md for detailed features
7. → Deploy to production using DEPLOYMENT_GUIDE.md

## Keyboard Navigation

- Use `Tab` to move between fields
- Use `Shift+Tab` to move backwards
- Use `Enter` to submit forms
- Use `Esc` to close dialogs

## Mobile Tips

The application is fully responsive:
- Works on phones, tablets, and desktops
- Touch-friendly buttons and inputs
- Full feature parity across devices

---

**Happy tracking! Your finances are now under control.** 💰

For detailed documentation, see README.md
For deployment instructions, see DEPLOYMENT_GUIDE.md

# Money Manager Web Application

A comprehensive personal finance management application built with Next.js, React, and MongoDB. Easily track your income, expenses, and manage multiple accounts with real-time analytics and detailed reporting.

## Features

### Core Features
- **User Authentication**: Secure registration and login system with password hashing
- **Dashboard**: Real-time overview of finances with comprehensive analytics
- **Income & Expense Tracking**: Add transactions with multiple categories and divisions
- **Multi-Account Management**: Track balances across Cash, Bank, Savings, and Credit Card accounts
- **Money Transfers**: Transfer funds between accounts seamlessly
- **Advanced Filtering**: Filter transactions by type, category, division, and date range
- **Period Analytics**: View income/expense trends by Daily, Weekly, Monthly, or Yearly periods

### Analytics & Reports
- **Income vs Expense Charts**: Visual representation of spending patterns
- **Category Breakdown**: Pie charts and summaries by category
- **Spending Trends**: Line charts showing trends over time
- **Category Summary**: Detailed breakdown of income and expenses by category

### Transaction Management
- **Edit Transactions**: Edit transactions within 12 hours of creation
- **Delete Transactions**: Remove transactions from history
- **Date-Based Tracking**: Track all transactions with precise dates and times
- **Descriptions**: Add notes to transactions for better tracking

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Validation**: Zod

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Authentication**: Custom JWT-based token system
- **Password Security**: bcryptjs for password hashing

## Project Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account and connection string
- npm or pnpm package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/money-manager-frontend.git
   cd money-manager-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/money_manager?retryWrites=true&w=majority
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to access the application.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Login to existing account
- `GET /api/auth/check` - Check authentication status
- `POST /api/auth/logout` - Logout from account

### Transactions
- `GET /api/transactions` - Get all transactions (supports filtering)
  - Query params: `startDate`, `endDate`, `category`, `division`, `type`
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/[id]` - Update a transaction (within 12 hours)
- `DELETE /api/transactions/[id]` - Delete a transaction

### Analytics
- `GET /api/analytics?period=monthly` - Get analytics data
  - Query params: `period` (daily, weekly, monthly, yearly)

### Accounts
- `GET /api/accounts` - Get all accounts and balances
- `POST /api/accounts` - Create a transfer between accounts

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  password: String (hashed),
  createdAt: Date
}
```

### Transactions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: 'income' | 'expense' | 'transfer',
  amount: Number,
  category: String,
  division: 'Personal' | 'Office',
  description: String,
  date: Date,
  account: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Guide

### Adding a Transaction
1. Click the "Add Transaction" button in the header
2. Select whether it's Income or Expense
3. Enter the amount, category, division, and optional description
4. Select the account and date
5. Click "Add Transaction"

### Transferring Money
1. Click the "Transfer" button in the Accounts section
2. Select the source and destination accounts
3. Enter the transfer amount
4. Optionally add a description
5. Click "Transfer"

### Filtering Transactions
1. Use the filter dropdowns in the Transaction History section
2. Filter by type (Income/Expense/All), category, division
3. Select start and end dates for date range filtering
4. Results update automatically

### Viewing Analytics
1. Select the time period (Daily, Weekly, Monthly, Yearly) from the dropdown
2. View the income vs expense bar chart
3. Check the spending trend line chart
4. Review category distribution and summary

## Editing & Deleting Transactions

### Edit a Transaction
- Click the edit icon in the Transaction History
- You can only edit transactions within 12 hours of creation
- Modify the amount and description
- Click "Save"

### Delete a Transaction
- Click the delete icon in the Transaction History
- Confirm the deletion

## Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel settings:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
4. Deploy

### Deploy to Other Platforms
The application can be deployed to any platform that supports Node.js:
- AWS (Amplify, Elastic Beanstalk)
- Google Cloud (App Engine, Cloud Run)
- Azure (App Service)
- Heroku
- DigitalOcean

## Environment Variables

```
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/money_manager?retryWrites=true&w=majority

# Application Environment
NODE_ENV=development|production
```

## Security Considerations

1. **Password Security**: Passwords are hashed using bcryptjs with 10 rounds of salt
2. **HTTP-Only Cookies**: Authentication tokens are stored in HTTP-only cookies
3. **CORS Protection**: Credentials are required for API requests
4. **Input Validation**: All inputs are validated on both client and server
5. **SQL Injection Prevention**: MongoDB prevents injection attacks by design

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string in `.env.local`
- Ensure MongoDB Atlas IP whitelist includes your server
- Check if the database name is correct (money_manager)

### Authentication Problems
- Clear browser cookies and try logging in again
- Check browser console for error messages
- Verify MONGODB_URI is set correctly

### Port Already in Use
```bash
# Kill process on port 3000 and restart
npm run dev -- -p 3001
```

## Future Enhancements

- Multi-currency support
- Bill reminders and recurring expenses
- Budget creation and tracking
- Export reports (PDF, Excel)
- Mobile app (React Native)
- Advanced data visualization
- Bank account integration
- Receipt image uploads
- Spending goals and recommendations

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open-source and available for personal and commercial use.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Deployment URLs

Once deployed, update these with your actual URLs:
- **Frontend**: [Your Frontend URL]
- **GitHub Frontend**: [Your Frontend Repository URL]
- **GitHub Backend**: [Your Backend Repository URL]

---

Built with ❤️ for better financial management.

import { NextRequest, NextResponse } from 'next/server';
import { getUserTransactions, setUserTransactions } from '@/lib/storage';

function getUserFromCookie(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;
  return userId || null;
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserFromCookie(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userTransactions = getUserTransactions(userId);

    // Calculate balance for each account
    const accountBalances: any = {};

    userTransactions.forEach((t) => {
      const account = t.account || 'Cash';
      if (!accountBalances[account]) {
        accountBalances[account] = 0;
      }

      if (t.type === 'income') {
        accountBalances[account] += t.amount;
      } else if (t.type === 'expense') {
        accountBalances[account] -= t.amount;
      } else if (t.type === 'transfer') {
        if (t.account === t.fromAccount) {
          accountBalances[account] -= t.amount;
        } else if (t.account === t.toAccount) {
          accountBalances[account] += t.amount;
        }
      }
    });

    // Ensure default accounts exist
    const defaultAccounts = ['Cash', 'Bank', 'Savings', 'Credit Card'];
    defaultAccounts.forEach((acc) => {
      if (!accountBalances[acc]) {
        accountBalances[acc] = 0;
      }
    });

    // Convert to array format
    const accounts = Object.entries(accountBalances).map(
      ([name, balance]: [string, any]) => ({
        name,
        balance: typeof balance === 'number' ? balance : 0,
      })
    );

    return NextResponse.json({
      accounts,
      totalBalance: Object.values(accountBalances).reduce(
        (sum: number, balance: any) => sum + (typeof balance === 'number' ? balance : 0),
        0
      ),
    });
  } catch (error) {
    console.error('[v0] Accounts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserFromCookie(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fromAccount, toAccount, amount, description } = await request.json();

    if (!fromAccount || !toAccount || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userTransactions = getUserTransactions(userId);

    // Create transfer transactions
    const now = new Date();
    const transferId = `${Date.now()}-${Math.random()}`;

    userTransactions.push(
      {
        _id: `${transferId}-out`,
        userId,
        type: 'transfer',
        amount: parseFloat(amount),
        fromAccount,
        toAccount,
        category: 'Transfer',
        division: 'Personal',
        description: description || `Transfer from ${fromAccount} to ${toAccount}`,
        date: now,
        account: fromAccount,
        transferId,
        createdAt: now,
      },
      {
        _id: `${transferId}-in`,
        userId,
        type: 'transfer',
        amount: parseFloat(amount),
        fromAccount,
        toAccount,
        category: 'Transfer',
        division: 'Personal',
        description: description || `Transfer from ${fromAccount} to ${toAccount}`,
        date: now,
        account: toAccount,
        transferId,
        createdAt: now,
      }
    );

    setUserTransactions(userId, userTransactions);

    return NextResponse.json(
      {
        message: 'Transfer created successfully',
        transferId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Transfer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

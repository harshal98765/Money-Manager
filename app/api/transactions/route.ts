import { NextRequest, NextResponse } from 'next/server';
import { getUserTransactions, setUserTransactions } from '@/lib/storage';

function getUserFromCookie(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;
  return userId || null;
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserFromCookie(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, amount, category, division, description, date, account } = body;

    if (!type || !amount || !category || !division || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transaction = {
      _id: `${Date.now()}-${Math.random()}`,
      userId,
      type,
      amount: parseFloat(amount),
      category,
      division,
      description,
      date: new Date(date),
      account: account || 'Cash',
      createdAt: new Date(),
    };

    const userTransactions = getUserTransactions(userId);
    userTransactions.push(transaction);
    setUserTransactions(userId, userTransactions);

    return NextResponse.json(
      {
        message: 'Transaction created successfully',
        transactionId: transaction._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Transaction creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserFromCookie(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');
    const division = searchParams.get('division');
    const type = searchParams.get('type');

    let transactions = getUserTransactions(userId);

    // Apply filters
    if (startDate || endDate) {
      transactions = transactions.filter((t) => {
        const tDate = new Date(t.date);
        if (startDate && tDate < new Date(startDate)) return false;
        if (endDate && tDate > new Date(endDate)) return false;
        return true;
      });
    }

    if (category) transactions = transactions.filter((t) => t.category === category);
    if (division) transactions = transactions.filter((t) => t.division === division);
    if (type) transactions = transactions.filter((t) => t.type === type);

    transactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('[v0] Fetching transactions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

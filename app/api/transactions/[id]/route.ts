import { NextRequest, NextResponse } from 'next/server';
import { getUserTransactions, setUserTransactions } from '@/lib/storage';

function getUserFromCookie(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;
  return userId || null;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserFromCookie(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const transactions = getUserTransactions(userId);
    const transactionIndex = transactions.findIndex((t) => t._id === id);

    if (transactionIndex === -1) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    const transaction = transactions[transactionIndex];

    // Check if 12 hours have passed
    const createdAt = new Date(transaction.createdAt).getTime();
    const now = Date.now();
    const hoursPassed = (now - createdAt) / (1000 * 60 * 60);

    if (hoursPassed > 12) {
      return NextResponse.json(
        { error: 'Cannot edit transaction after 12 hours' },
        { status: 403 }
      );
    }

    // Update transaction
    transactions[transactionIndex] = {
      ...transaction,
      ...body,
      amount: body.amount ? parseFloat(body.amount) : transaction.amount,
      date: body.date ? new Date(body.date) : transaction.date,
      updatedAt: new Date(),
    };

    setUserTransactions(userId, transactions);

    return NextResponse.json({
      message: 'Transaction updated successfully',
    });
  } catch (error) {
    console.error('[v0] Update transaction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserFromCookie(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const transactions = getUserTransactions(userId);
    const transactionIndex = transactions.findIndex((t) => t._id === id);

    if (transactionIndex === -1) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    transactions.splice(transactionIndex, 1);
    setUserTransactions(userId, transactions);

    return NextResponse.json({
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    console.error('[v0] Delete transaction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

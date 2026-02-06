import { NextRequest, NextResponse } from 'next/server';
import { getUserTransactions } from '@/lib/storage';

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

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'monthly';

    const transactions = getUserTransactions(userId);
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'daily':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'weekly':
        startDate.setDate(now.getDate() - 30);
        break;
      case 'monthly':
        startDate.setMonth(now.getMonth() - 12);
        break;
      case 'yearly':
        startDate.setFullYear(now.getFullYear() - 5);
        break;
    }

    const filtered = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return tDate >= startDate && t.type !== 'transfer';
    });

    // Group by period
    const groupedData: any = {};
    const categories: any = {};

    filtered.forEach((t) => {
      let key = '';
      const date = new Date(t.date);

      switch (period) {
        case 'daily':
          key = date.toISOString().split('T')[0];
          break;
        case 'weekly': {
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        }
        case 'monthly':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'yearly':
          key = date.getFullYear().toString();
          break;
      }

      if (!groupedData[key]) {
        groupedData[key] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        groupedData[key].income += t.amount;
      } else {
        groupedData[key].expense += t.amount;
      }

      // Category summary
      if (!categories[t.category]) {
        categories[t.category] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        categories[t.category].income += t.amount;
      } else {
        categories[t.category].expense += t.amount;
      }
    });

    // Sort by key
    const sortedData = Object.keys(groupedData)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = groupedData[key];
        return acc;
      }, {});

    return NextResponse.json({
      period,
      data: sortedData,
      categories,
      summary: {
        totalIncome: filtered
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0),
        totalExpense: filtered
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0),
      },
    });
  } catch (error) {
    console.error('[v0] Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

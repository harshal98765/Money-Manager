'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TransactionModal from './TransactionModal';
import TransactionHistory from './TransactionHistory';
import AnalyticsCharts from './AnalyticsCharts';
import { Plus, LogOut } from 'lucide-react';
import Accounts from './Accounts';

export default function Dashboard() {
  const [period, setPeriod] = useState('monthly');
  const [showModal, setShowModal] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchAnalytics();
    fetchTransactions();
  }, [period, refreshKey]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?period=${period}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleTransactionAdded = () => {
    setShowModal(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Money Manager</h1>
              <p className="text-sm text-muted-foreground">Manage your finances with ease</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowModal(true)}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Transaction
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-foreground">Period</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Accounts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Accounts</h2>
          <Accounts
            refreshKey={refreshKey}
            onTransferComplete={() => setRefreshKey((prev) => prev + 1)}
          />
        </div>

        {/* Analytics Charts */}
        {analyticsData && (
          <AnalyticsCharts data={analyticsData} period={period} />
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 bg-card border border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Total Income
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ${analyticsData?.summary.totalIncome.toFixed(2) || '0.00'}
            </p>
          </Card>
          <Card className="p-6 bg-card border border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Total Expense
            </h3>
            <p className="text-3xl font-bold text-red-600">
              ${analyticsData?.summary.totalExpense.toFixed(2) || '0.00'}
            </p>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <TransactionHistory transactions={transactions} onRefresh={() => setRefreshKey((prev) => prev + 1)} />
        </div>
      </main>

      {/* Add Transaction Modal */}
      {showModal && (
        <TransactionModal
          onClose={() => setShowModal(false)}
          onTransactionAdded={handleTransactionAdded}
        />
      )}
    </div>
  );
}

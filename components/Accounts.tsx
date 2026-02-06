'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TransferModal from './TransferModal';
import { ArrowRightLeft } from 'lucide-react';

interface Account {
  name: string;
  balance: number;
}

interface AccountsProps {
  refreshKey: number;
  onTransferComplete: () => void;
}

export default function Accounts({
  refreshKey,
  onTransferComplete,
}: AccountsProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, [refreshKey]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/accounts', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAccounts(data.accounts);
        setTotalBalance(data.totalBalance);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransferComplete = () => {
    setShowTransferModal(false);
    onTransferComplete();
  };

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading accounts...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Total Balance Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Balance</p>
            <p className="text-3xl font-bold text-white mt-2">
              ${totalBalance.toFixed(2)}
            </p>
          </div>
          <Button
            onClick={() => setShowTransferModal(true)}
            className="gap-2 bg-white text-blue-700 hover:bg-blue-50"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Transfer
          </Button>
        </div>
      </Card>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card
            key={account.name}
            className="p-4 bg-card border border-border hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground capitalize">
                  {account.name}
                </p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  ${account.balance.toFixed(2)}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  account.balance >= 0
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                }`}
              >
                <span
                  className={`font-bold ${
                    account.balance >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {account.balance >= 0 ? '+' : '-'}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <TransferModal
          accounts={accounts}
          onClose={() => setShowTransferModal(false)}
          onTransferComplete={handleTransferComplete}
        />
      )}
    </div>
  );
}

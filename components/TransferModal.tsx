'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, ArrowRight } from 'lucide-react';

interface Account {
  name: string;
  balance: number;
}

interface TransferModalProps {
  accounts: Account[];
  onClose: () => void;
  onTransferComplete: () => void;
}

export default function TransferModal({
  accounts,
  onClose,
  onTransferComplete,
}: TransferModalProps) {
  const [fromAccount, setFromAccount] = useState(accounts[0]?.name || '');
  const [toAccount, setToAccount] = useState(
    accounts[1]?.name || accounts[0]?.name || ''
  );
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!fromAccount || !toAccount || !amount) {
        setError('Please fill all required fields');
        setLoading(false);
        return;
      }

      if (fromAccount === toAccount) {
        setError('From and To accounts must be different');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAccount,
          toAccount,
          amount: parseFloat(amount),
          description,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        onTransferComplete();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create transfer');
      }
    } catch (err) {
      setError('Failed to create transfer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Transfer Money</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* From Account */}
          <div>
            <Label htmlFor="fromAccount" className="text-foreground">
              From Account *
            </Label>
            <Select value={fromAccount} onValueChange={setFromAccount}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.name} value={account.name}>
                    {account.name.charAt(0).toUpperCase() + account.name.slice(1)} (${account.balance.toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Arrow Icon */}
          <div className="flex justify-center py-2">
            <div className="p-2 bg-secondary/30 rounded-full">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* To Account */}
          <div>
            <Label htmlFor="toAccount" className="text-foreground">
              To Account *
            </Label>
            <Select value={toAccount} onValueChange={setToAccount}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.name} value={account.name}>
                    {account.name.charAt(0).toUpperCase() + account.name.slice(1)} (${account.balance.toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount" className="text-foreground">
              Amount *
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              required
              className="mt-2"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-foreground">
              Description (Optional)
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="e.g., Weekly savings"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {loading ? 'Transferring...' : 'Transfer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

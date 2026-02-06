'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface TransactionModalProps {
  onClose: () => void;
  onTransactionAdded: () => void;
}

const INCOME_CATEGORIES = [
  'Salary',
  'Bonus',
  'Investment',
  'Freelance',
  'Gift',
  'Other',
];

const EXPENSE_CATEGORIES = [
  'Food',
  'Movie',
  'Fuel',
  'Loan',
  'Medical',
  'Rent',
  'Utilities',
  'Transportation',
  'Other',
];

const DIVISIONS = ['Personal', 'Office'];
const ACCOUNTS = ['Cash', 'Bank', 'Savings', 'Credit Card'];

export default function TransactionModal({
  onClose,
  onTransactionAdded,
}: TransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [division, setDivision] = useState('Personal');
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState('Cash');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!amount || !category || !date) {
        setError('Please fill all required fields');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          amount: parseFloat(amount),
          category,
          division,
          description,
          account,
          date: new Date(date).toISOString(),
        }),
        credentials: 'include',
      });

      if (response.ok) {
        onTransactionAdded();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add transaction');
      }
    } catch (err) {
      setError('Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">Add Transaction</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tabs */}
          <Tabs
            value={type}
            onValueChange={(value) => {
              setType(value as 'income' | 'expense');
              setCategory('');
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expense</TabsTrigger>
            </TabsList>
          </Tabs>

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

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-foreground">
              Category *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Division */}
          <div>
            <Label htmlFor="division" className="text-foreground">
              Division
            </Label>
            <Select value={division} onValueChange={setDivision}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DIVISIONS.map((div) => (
                  <SelectItem key={div} value={div}>
                    {div}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Account */}
          <div>
            <Label htmlFor="account" className="text-foreground">
              Account
            </Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNTS.map((acc) => (
                  <SelectItem key={acc} value={acc}>
                    {acc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date" className="text-foreground">
              Date *
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
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
              {loading ? 'Adding...' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

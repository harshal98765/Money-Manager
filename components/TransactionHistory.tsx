'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Food',
  'Movie',
  'Fuel',
  'Loan',
  'Medical',
  'Rent',
  'Utilities',
  'Salary',
  'Bonus',
  'Investment',
  'Freelance',
  'Gift',
  'Transportation',
];

const DIVISIONS = ['All', 'Personal', 'Office'];

interface Transaction {
  _id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  division: string;
  description: string;
  date: string;
  createdAt: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onRefresh: () => void;
}

export default function TransactionHistory({
  transactions,
  onRefresh,
}: TransactionHistoryProps) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDivision, setFilterDivision] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});

  const filteredTransactions = transactions.filter((t) => {
    const categoryMatch =
      filterCategory === 'All' || t.category === filterCategory;
    const divisionMatch =
      filterDivision === 'All' || t.division === filterDivision;
    const typeMatch = filterType === 'All' || t.type === filterType;
    const dateMatch =
      (!startDate || new Date(t.date) >= new Date(startDate)) &&
      (!endDate || new Date(t.date) <= new Date(endDate));

    return categoryMatch && divisionMatch && typeMatch && dateMatch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        onRefresh();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
        credentials: 'include',
      });

      if (response.ok) {
        setEditingId(null);
        onRefresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update transaction');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Card className="p-6 bg-card border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Transaction History
      </h3>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterDivision} onValueChange={setFilterDivision}>
          <SelectTrigger>
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

        <Input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-foreground">Date</TableHead>
              <TableHead className="text-foreground">Description</TableHead>
              <TableHead className="text-foreground">Category</TableHead>
              <TableHead className="text-foreground">Division</TableHead>
              <TableHead className="text-foreground text-right">Amount</TableHead>
              <TableHead className="text-foreground">Type</TableHead>
              <TableHead className="text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                className="border-border hover:bg-secondary/50"
              >
                <TableCell className="text-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-foreground">
                  {transaction.description || '-'}
                </TableCell>
                <TableCell className="text-foreground">
                  {transaction.category}
                </TableCell>
                <TableCell className="text-foreground">
                  {transaction.division}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      transaction.type === 'income'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-foreground">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(transaction._id);
                      setEditData(transaction);
                    }}
                    className="p-2 hover:bg-secondary/50 rounded transition"
                    title="Edit (within 12 hours)"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="p-2 hover:bg-secondary/50 rounded transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No transactions found
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 bg-card border border-border max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Edit Transaction
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Amount
                </label>
                <Input
                  type="number"
                  value={editData.amount || ''}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  step="0.01"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Description
                </label>
                <Input
                  type="text"
                  value={editData.description || ''}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setEditingId(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdate(editingId)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}

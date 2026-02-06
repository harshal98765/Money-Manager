'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface AnalyticsChartsProps {
  data: any;
  period: string;
}

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'];

export default function AnalyticsCharts({
  data,
  period,
}: AnalyticsChartsProps) {
  const chartData = Object.entries(data.data).map(([key, value]: [string, any]) => ({
    period: key,
    income: value.income,
    expense: value.expense,
  }));

  const categoryData = Object.entries(data.categories).map(
    ([category, value]: [string, any]) => ({
      name: category,
      income: value.income,
      expense: value.expense,
      total: value.income + value.expense,
    })
  );

  const pieData = categoryData.map((item) => ({
    name: item.name,
    value: item.total,
  }));

  return (
    <div className="space-y-8">
      {/* Income vs Expense Chart */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {period.charAt(0).toUpperCase() + period.slice(1)} Income vs Expense
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="period" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            />
            <Legend />
            <Bar dataKey="income" fill="#10b981" />
            <Bar dataKey="expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Trend Line Chart */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Spending Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="period" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              dot={{ fill: '#10b981' }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              dot={{ fill: '#ef4444' }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Pie Chart */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) =>
                  `${name}: $${value.toFixed(2)}`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Summary Table */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Category Summary
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {categoryData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition"
              >
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Income: ${item.income.toFixed(2)} | Expense: ${item.expense.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold text-foreground">
                  ${item.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}


import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Expense, Category } from '@/types/expense';

interface ExpenseChartProps {
  expenses: Expense[];
}

export const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  const categoryTotals = expenses.reduce(
    (totals, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    },
    {} as Record<Category, number>
  );

  const data = [
    { name: 'Food', value: categoryTotals.Food || 0, color: '#f97316' },
    { name: 'Travel', value: categoryTotals.Travel || 0, color: '#22c55e' },
    { name: 'Other', value: categoryTotals.Other || 0, color: '#a855f7' },
  ].filter(item => item.value > 0);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-lg">No expenses to display</p>
        <p className="text-sm text-slate-400">Add some expenses to see the chart</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = totalAmount > 0 ? ((data.value / totalAmount) * 100).toFixed(1) : 0;
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-800">{data.name}</p>
          <p className="text-blue-600 font-bold">₹{data.value}</p>
          <p className="text-slate-500 text-sm">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show label for very small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>
                {value} (₹{categoryTotals[value as Category]})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

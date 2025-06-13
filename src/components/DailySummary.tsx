
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense, Category } from '@/types/expense';

interface DailySummaryProps {
  expenses: Expense[];
  selectedDate: Date;
}

export const DailySummary = ({ expenses, selectedDate }: DailySummaryProps) => {
  const categoryTotals = expenses.reduce(
    (totals, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    },
    {} as Record<Category, number>
  );

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categories: { name: Category; icon: string; color: string }[] = [
    { name: 'Food', icon: '🍔', color: 'text-orange-600' },
    { name: 'Travel', icon: '🚗', color: 'text-green-600' },
    { name: 'Other', icon: '📦', color: 'text-purple-600' },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-slate-800">Daily Summary</CardTitle>
        <p className="text-sm text-slate-600">{formatDate(selectedDate)}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg border">
          <p className="text-sm text-slate-600 mb-1">Total Expenses</p>
          <p className="text-3xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-slate-700">Category Breakdown</h4>
          {categories.map((category) => {
            const amount = categoryTotals[category.name] || 0;
            const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
            
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium text-slate-700">{category.name}</span>
                  </div>
                  <span className={`font-bold ${category.color}`}>₹{amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      category.name === 'Food' ? 'bg-orange-500' :
                      category.name === 'Travel' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 text-right">{percentage.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-200">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Total Items:</span>
            <span className="font-medium">{expenses.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

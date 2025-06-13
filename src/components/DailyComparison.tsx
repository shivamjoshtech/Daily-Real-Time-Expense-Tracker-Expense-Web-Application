
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/types/expense';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DailyComparisonProps {
  expenses: Expense[];
  selectedDate: Date;
}

export const DailyComparison = ({ expenses, selectedDate }: DailyComparisonProps) => {
  const selectedDateString = selectedDate.toISOString().split('T')[0];
  
  const previousDate = new Date(selectedDate);
  previousDate.setDate(previousDate.getDate() - 1);
  const previousDateString = previousDate.toISOString().split('T')[0];

  const todayExpenses = expenses.filter(expense => expense.date === selectedDateString);
  const yesterdayExpenses = expenses.filter(expense => expense.date === previousDateString);

  const todayTotal = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const yesterdayTotal = yesterdayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const difference = todayTotal - yesterdayTotal;
  const percentageChange = yesterdayTotal > 0 ? (difference / yesterdayTotal) * 100 : 0;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getComparisonIcon = () => {
    if (difference > 0) return <TrendingUp className="h-5 w-5 text-red-500" />;
    if (difference < 0) return <TrendingDown className="h-5 w-5 text-green-500" />;
    return <Minus className="h-5 w-5 text-slate-500" />;
  };

  const getComparisonColor = () => {
    if (difference > 0) return 'text-red-600';
    if (difference < 0) return 'text-green-600';
    return 'text-slate-600';
  };

  const getComparisonText = () => {
    if (difference === 0) {
      return 'Same as previous day';
    }
    
    const isMore = difference > 0;
    const verb = isMore ? 'more' : 'less';
    const absPercentage = Math.abs(percentageChange);
    
    return `${absPercentage.toFixed(1)}% ${verb} than previous day`;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-slate-800">Daily Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">{formatDate(selectedDate)}</p>
            <p className="text-lg font-bold text-blue-600">₹{todayTotal.toFixed(2)}</p>
          </div>
          
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-600 mb-1">{formatDate(previousDate)}</p>
            <p className="text-lg font-bold text-slate-600">₹{yesterdayTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border">
          {getComparisonIcon()}
          <div className="text-center">
            <p className={`font-bold ${getComparisonColor()}`}>
              ₹{Math.abs(difference).toFixed(2)}
            </p>
            <p className="text-sm text-slate-600">{getComparisonText()}</p>
          </div>
        </div>

        {yesterdayTotal === 0 && todayTotal > 0 && (
          <div className="text-center text-sm text-slate-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            No expenses recorded for the previous day
          </div>
        )}
      </CardContent>
    </Card>
  );
};

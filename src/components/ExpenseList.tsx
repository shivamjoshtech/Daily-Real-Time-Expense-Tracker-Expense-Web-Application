
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Expense } from '@/types/expense';
import { EditExpenseModal } from '@/components/EditExpenseModal';
import { Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  onEditExpense: (id: string, updatedData: Partial<Expense>) => void;
}

export const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }: ExpenseListProps) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const { toast } = useToast();

  const handleDelete = (id: string, itemName: string) => {
    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
      onDeleteExpense(id);
      toast({
        title: "Deleted",
        description: "Expense deleted successfully.",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Travel':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Other':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food':
        return '🍔';
      case 'Travel':
        return '🚗';
      case 'Other':
        return '📦';
      default:
        return '📝';
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-slate-500 text-lg">No expenses recorded for this date</p>
        <p className="text-slate-400 text-sm mt-2">Add your first expense above</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <Card key={expense.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{getCategoryIcon(expense.category)}</span>
                  <h3 className="font-semibold text-slate-800">{expense.itemName}</h3>
                  <Badge className={getCategoryColor(expense.category)}>
                    {expense.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">₹{expense.amount}</span>
                  <span className="text-sm text-slate-500">
                    {new Date(expense.createdAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingExpense(expense)}
                  className="hover:bg-blue-50 hover:border-blue-300"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(expense.id, expense.itemName)}
                  className="hover:bg-red-50 hover:border-red-300 text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          isOpen={!!editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={(updatedData) => {
            onEditExpense(editingExpense.id, updatedData);
            setEditingExpense(null);
            toast({
              title: "Updated",
              description: "Expense updated successfully.",
            });
          }}
        />
      )}
    </div>
  );
};

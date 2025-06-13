
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Expense, Category } from '@/types/expense';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName.trim() || !amount.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      await onAddExpense({
        itemName: itemName.trim(),
        amount: amountNum,
        category,
        date: dateString,
      });

      // Reset form
      setItemName('');
      setAmount('');
      setCategory('Food');
      
      toast({
        title: "Success",
        description: "Expense added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="itemName" className="text-slate-700 font-medium">
            Item Name
          </Label>
          <Input
            id="itemName"
            type="text"
            placeholder="e.g., Frooty, Travel to XYZ"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border-slate-300 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="text-slate-700 font-medium">
            Amount (₹)
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="e.g., 40, 400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-slate-300 focus:border-blue-500"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-slate-700 font-medium">
          Category
        </Label>
        <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
          <SelectTrigger className="border-slate-300 focus:border-blue-500">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">🍔 Food</SelectItem>
            <SelectItem value="Travel">🚗 Travel</SelectItem>
            <SelectItem value="Other">📦 Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Adding...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </div>
        )}
      </Button>
    </form>
  );
};

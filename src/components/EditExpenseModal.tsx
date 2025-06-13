
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Expense, Category } from '@/types/expense';
import { useToast } from '@/hooks/use-toast';

interface EditExpenseModalProps {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<Expense>) => void;
}

export const EditExpenseModal = ({ expense, isOpen, onClose, onSave }: EditExpenseModalProps) => {
  const [itemName, setItemName] = useState(expense.itemName);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState<Category>(expense.category);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setItemName(expense.itemName);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
  }, [expense]);

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
      await onSave({
        itemName: itemName.trim(),
        amount: amountNum,
        category,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Edit Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-itemName" className="text-slate-700">
                Item Name
              </Label>
              <Input
                id="edit-itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border-slate-300 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-amount" className="text-slate-700">
                Amount (₹)
              </Label>
              <Input
                id="edit-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-slate-300 focus:border-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-slate-700">
                Category
              </Label>
              <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
                <SelectTrigger className="border-slate-300 focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">🍔 Food</SelectItem>
                  <SelectItem value="Travel">🚗 Travel</SelectItem>
                  <SelectItem value="Other">📦 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-slate-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

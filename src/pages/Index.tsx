
import { useState, useEffect } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { DailySummary } from '@/components/DailySummary';
import { ExpenseChart } from '@/components/ExpenseChart';
import { MonthlyReport } from '@/components/MonthlyReport';
import { DateSelector } from '@/components/DateSelector';
import { DailyComparison } from '@/components/DailyComparison';
import { Expense, Category } from '@/types/expense';
import { expenseService } from '@/services/expenseService';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const allExpenses = await expenseService.getAllExpenses();
      setExpenses(allExpenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    try {
      const newExpense = await expenseService.addExpense(expenseData);
      setExpenses(prev => [...prev, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = async (id: string, updatedData: Partial<Expense>) => {
    try {
      const updatedExpense = await expenseService.updateExpense(id, updatedData);
      setExpenses(prev => prev.map(expense => 
        expense.id === id ? updatedExpense : expense
      ));
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const selectedDateExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.createdAt);
    return expenseDate.toDateString() === selectedDate.toDateString();
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Expense Tracker
          </h1>
          <p className="text-slate-600">
            Track your daily expenses with ease and insight
          </p>
        </div>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 mx-auto mb-8">
            <TabsTrigger value="daily" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Daily View
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Monthly Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Add New Expense
                    </h2>
                    <ExpenseForm onAddExpense={handleAddExpense} />
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h2 className="text-xl font-semibold text-slate-800 mb-2 sm:mb-0">
                        Daily Expenses
                      </h2>
                      <DateSelector 
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                      />
                    </div>
                    <ExpenseList 
                      expenses={selectedDateExpenses}
                      onDeleteExpense={handleDeleteExpense}
                      onEditExpense={handleEditExpense}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <DailySummary expenses={selectedDateExpenses} selectedDate={selectedDate} />
                <DailyComparison expenses={expenses} selectedDate={selectedDate} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-slate-800">
                      Daily Distribution
                    </h2>
                    <DateSelector 
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                    />
                  </div>
                  <ExpenseChart expenses={selectedDateExpenses} />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Summary
                  </h2>
                  <DailySummary expenses={selectedDateExpenses} selectedDate={selectedDate} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <MonthlyReport expenses={expenses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

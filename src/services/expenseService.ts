
import { Expense, Category } from '@/types/expense';

class ExpenseService {
  private storageKey = 'expense-tracker-data';

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getStoredExpenses(): Expense[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveExpenses(expenses: Expense[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
  }

  async getAllExpenses(): Promise<Expense[]> {
    return this.getStoredExpenses();
  }

  async addExpense(expenseData: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> {
    const expenses = this.getStoredExpenses();
    const newExpense: Expense = {
      id: this.generateId(),
      ...expenseData,
      createdAt: new Date().toISOString(),
    };
    
    expenses.push(newExpense);
    this.saveExpenses(expenses);
    return newExpense;
  }

  async updateExpense(id: string, updatedData: Partial<Expense>): Promise<Expense> {
    const expenses = this.getStoredExpenses();
    const index = expenses.findIndex(expense => expense.id === id);
    
    if (index === -1) {
      throw new Error('Expense not found');
    }

    expenses[index] = { ...expenses[index], ...updatedData };
    this.saveExpenses(expenses);
    return expenses[index];
  }

  async deleteExpense(id: string): Promise<void> {
    const expenses = this.getStoredExpenses();
    const filteredExpenses = expenses.filter(expense => expense.id !== id);
    this.saveExpenses(filteredExpenses);
  }

  getExpensesByDate(date: string): Expense[] {
    const expenses = this.getStoredExpenses();
    return expenses.filter(expense => expense.date === date);
  }

  getExpensesByMonth(year: number, month: number): Expense[] {
    const expenses = this.getStoredExpenses();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
    });
  }
}

export const expenseService = new ExpenseService();

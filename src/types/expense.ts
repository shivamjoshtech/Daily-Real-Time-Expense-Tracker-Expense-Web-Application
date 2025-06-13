
export type Category = 'Food' | 'Travel' | 'Other';

export interface Expense {
  id: string;
  itemName: string;
  amount: number;
  category: Category;
  createdAt: string;
  date: string; // YYYY-MM-DD format
}

export interface DaySummary {
  date: string;
  total: number;
  categoryTotals: {
    Food: number;
    Travel: number;
    Other: number;
  };
  expenses: Expense[];
}

export interface MonthlyStats {
  totalExpense: number;
  categoryTotals: {
    Food: number;
    Travel: number;
    Other: number;
  };
  dailyTotals: { [date: string]: number };
}

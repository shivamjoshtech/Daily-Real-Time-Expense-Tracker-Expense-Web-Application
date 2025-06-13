
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExpenseChart } from '@/components/ExpenseChart';
import { Expense, Category } from '@/types/expense';
import { Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface MonthlyReportProps {
  expenses: Expense[];
}

export const MonthlyReport = ({ expenses }: MonthlyReportProps) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [year, month] = selectedMonth.split('-').map(Number);
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.createdAt);
    return expenseDate.getFullYear() === year && expenseDate.getMonth() === month - 1;
  });

  // Group expenses by date
  const expensesByDate = monthlyExpenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  // Calculate daily totals
  const dailyTotals = Object.entries(expensesByDate).map(([date, dayExpenses]) => {
    const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categoryTotals = dayExpenses.reduce(
      (totals, expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
        return totals;
      },
      {} as Record<Category, number>
    );

    return {
      date,
      total,
      categoryTotals,
      count: dayExpenses.length,
    };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const monthlyTotal = dailyTotals.reduce((sum, day) => sum + day.total, 0);

  const generatePDF = async () => {
    if (!reportRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const monthName = new Date(year, month - 1).toLocaleDateString('en-IN', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      pdf.save(`expense-report-${monthName.replace(' ', '-').toLowerCase()}.pdf`);
      
      toast({
        title: "PDF Generated",
        description: "Monthly report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const printReport = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const monthName = new Date(year, month - 1).toLocaleDateString('en-IN', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Monthly Report</h2>
          <p className="text-slate-400">Detailed expense analysis for {monthName}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 input-enhanced"
          />
          
          <div className="flex gap-2">
            <Button
              onClick={generatePDF}
              disabled={isGeneratingPDF || dailyTotals.length === 0}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 btn-primary-enhanced"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </>
              )}
            </Button>
            
            <Button
              onClick={printReport}
              variant="outline"
              disabled={dailyTotals.length === 0}
              className="border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {dailyTotals.length === 0 ? (
        <Card className="bg-slate-900 border-slate-700 shadow-lg card-enhanced">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-slate-400 text-lg">No expenses recorded for {monthName}</p>
            <p className="text-slate-500 text-sm mt-2">Start adding expenses to see your monthly report</p>
          </CardContent>
        </Card>
      ) : (
        <div ref={reportRef} className="space-y-6 bg-slate-900 p-6 rounded-lg print:shadow-none border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700 shadow-lg card-enhanced">
              <CardHeader>
                <CardTitle className="text-lg text-slate-200 gradient-text">Monthly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg border border-slate-600 mb-4">
                  <p className="text-sm text-slate-400 mb-1">Total Monthly Expense</p>
                  <p className="text-3xl font-bold text-blue-400">₹{monthlyTotal.toFixed(2)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-slate-400">Days with Expenses</p>
                    <p className="font-bold text-slate-200">{dailyTotals.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400">Total Transactions</p>
                    <p className="font-bold text-slate-200">{monthlyExpenses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 shadow-lg card-enhanced">
              <CardHeader>
                <CardTitle className="text-lg text-slate-200 gradient-text">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpenseChart expenses={monthlyExpenses} />
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700 shadow-lg card-enhanced">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200 gradient-text">Daily Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="table-enhanced">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-blue-400">Date</TableHead>
                      <TableHead className="text-center text-blue-400">Transactions</TableHead>
                      <TableHead className="text-right text-blue-400">Food</TableHead>
                      <TableHead className="text-right text-blue-400">Travel</TableHead>
                      <TableHead className="text-right text-blue-400">Other</TableHead>
                      <TableHead className="text-right font-bold text-blue-400">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyTotals.map((day) => (
                      <TableRow key={day.date} className="hover:bg-slate-700 border-slate-600">
                        <TableCell className="font-medium text-slate-300">
                          {formatDate(day.date)}
                        </TableCell>
                        <TableCell className="text-center text-slate-300">{day.count}</TableCell>
                        <TableCell className="text-right text-slate-300">
                          ₹{(day.categoryTotals.Food || 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-slate-300">
                          ₹{(day.categoryTotals.Travel || 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-slate-300">
                          ₹{(day.categoryTotals.Other || 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-blue-400">
                          ₹{day.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-700 font-bold border-slate-600">
                      <TableCell className="text-slate-200">Monthly Total</TableCell>
                      <TableCell className="text-center text-slate-200">{monthlyExpenses.length}</TableCell>
                      <TableCell className="text-right text-slate-200">
                        ₹{monthlyExpenses
                          .filter(e => e.category === 'Food')
                          .reduce((sum, e) => sum + e.amount, 0)
                          .toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-slate-200">
                        ₹{monthlyExpenses
                          .filter(e => e.category === 'Travel')
                          .reduce((sum, e) => sum + e.amount, 0)
                          .toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-slate-200">
                        ₹{monthlyExpenses
                          .filter(e => e.category === 'Other')
                          .reduce((sum, e) => sum + e.amount, 0)
                          .toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-blue-400">
                        ₹{monthlyTotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

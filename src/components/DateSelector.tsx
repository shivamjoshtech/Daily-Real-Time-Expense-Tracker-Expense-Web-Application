
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateSelector = ({ selectedDate, onDateChange }: DateSelectorProps) => {
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onDateChange(newDate);
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const isFuture = selectedDate > new Date();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={goToPreviousDay}
        className="hover:bg-blue-50"
      >
        ←
      </Button>
      
      <div className="relative">
        <Input
          type="date"
          value={formatDateForInput(selectedDate)}
          onChange={handleDateChange}
          className="w-auto border-slate-300 focus:border-blue-500"
        />
        <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={goToNextDay}
        disabled={isFuture}
        className="hover:bg-blue-50 disabled:opacity-50"
      >
        →
      </Button>

      {!isToday && (
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          Today
        </Button>
      )}
    </div>
  );
};

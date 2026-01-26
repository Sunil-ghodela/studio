import { format, parseISO, differenceInCalendarDays } from 'date-fns';

export function getTodayDateString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}


export function calculateStreak(completions: string[]): number {
  if (completions.length === 0) return 0;

  const dates = [...new Set(completions)].map(d => parseISO(d)).sort((a, b) => b.getTime() - a.getTime());
  
  let streak = 0;
  const today = new Date();
  
  if (differenceInCalendarDays(today, dates[0]) > 1) {
    return 0; // No activity yesterday or today.
  }

  // If latest completion wasn't today, check from yesterday.
  let expectedDate = dates.includes(format(today, 'yyyy-MM-dd')) ? dates[0] : new Date(new Date().setDate(new Date().getDate() - 1));

  for (const date of dates) {
    if (differenceInCalendarDays(expectedDate, date) === 0) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break; // Streak is broken
    }
  }
  return streak;
}

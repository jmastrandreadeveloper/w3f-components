import type { DateValue, DateRangeValue, DayCell, CalendarMonth } from './DatePicker.types';
import { DP_MONTHS_LONG, DP_WEEKDAYS_LONG, DP_MONTHS_SHORT } from './DatePicker.constants';

// ── Date → DateValue ──────────────────────────────────────────
export function toDateValue(date: Date): DateValue {
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    date,
    formatted: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    display:   `${date.getDate()} ${DP_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`,
    day:       date.getDate(),
    month:     date.getMonth() + 1,
    year:      date.getFullYear(),
    weekday:   DP_WEEKDAYS_LONG[date.getDay()],
    timestamp: date.getTime(),
  };
}

// ── Date Comparison ───────────────────────────────────────────
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function isBetween(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}

export function isDateDisabled(
  date: Date,
  disabledDates?: Date[],
  minDate?: Date,
  maxDate?: Date,
): boolean {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates?.some(d => isSameDay(d, date))) return true;
  return false;
}

// ── Calendar Grid Builder ─────────────────────────────────────
export function buildCalendarDays(year: number, month: number): DayCell[] {
  const today     = new Date();
  const firstDay  = new Date(year, month, 1);
  const lastDay   = new Date(year, month + 1, 0);
  const cells: DayCell[] = [];

  // Leading days from previous month
  const leadingDays = firstDay.getDay(); // 0=Sunday
  for (let i = leadingDays - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    cells.push({
      date: d, dayNum: d.getDate(),
      isCurrentMonth: false, isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0, isDisabled: false,
    });
  }

  // Days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const d = new Date(year, month, day);
    cells.push({
      date: d, dayNum: day,
      isCurrentMonth: true, isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0, isDisabled: false,
    });
  }

  // Trailing days
  const remaining = 42 - cells.length; // always 6 rows × 7 cols
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    cells.push({
      date: d, dayNum: d.getDate(),
      isCurrentMonth: false, isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0, isDisabled: false,
    });
  }

  return cells;
}

// ── Month Navigation ──────────────────────────────────────────
export function prevMonth(cal: CalendarMonth): CalendarMonth {
  if (cal.month === 0) return { year: cal.year - 1, month: 11 };
  return { year: cal.year, month: cal.month - 1 };
}

export function nextMonth(cal: CalendarMonth): CalendarMonth {
  if (cal.month === 11) return { year: cal.year + 1, month: 0 };
  return { year: cal.year, month: cal.month + 1 };
}

export function formatMonthTitle(year: number, month: number): string {
  return `${DP_MONTHS_LONG[month]} ${year}`;
}

// ── Range Value Builder ───────────────────────────────────────
export function buildRangeValue(
  startDate: Date | null,
  endDate: Date | null,
): DateRangeValue {
  const sv = startDate ? toDateValue(startDate) : null;
  const ev = endDate   ? toDateValue(endDate)   : null;

  let days = 0;
  if (startDate && endDate) {
    days = Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / 86400000
    ) + 1;
  }

  return {
    startDate: sv,
    endDate:   ev,
    formattedRange: sv && ev
      ? `${sv.formatted} → ${ev.formatted}`
      : sv?.formatted ?? '',
    days,
  };
}

// ── Initial CalendarMonth from prop ──────────────────────────
export function parseInitialMonth(initialMonth?: Date | string): CalendarMonth {
  if (!initialMonth) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  if (typeof initialMonth === 'string') {
    const [y, m] = initialMonth.split('-').map(Number);
    return { year: y, month: (m || 1) - 1 };
  }
  return { year: initialMonth.getFullYear(), month: initialMonth.getMonth() };
}

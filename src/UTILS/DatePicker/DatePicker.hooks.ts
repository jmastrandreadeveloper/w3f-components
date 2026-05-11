import { useState, useCallback, useRef, useEffect } from 'react';
import type { DateValue, DateRangeValue, CalendarMonth } from './DatePicker.types';
import {
  buildCalendarDays, prevMonth, nextMonth, toDateValue,
  isSameDay, isBetween, isDateDisabled, buildRangeValue, parseInitialMonth,
} from './DatePicker.utils';

// ── useMonthNavigation ────────────────────────────────────────
export function useMonthNavigation(initialMonth?: Date | string) {
  const [current, setCurrent] = useState<CalendarMonth>(() =>
    parseInitialMonth(initialMonth)
  );

  const goPrev = useCallback(() => setCurrent(prevMonth), []);
  const goNext = useCallback(() => setCurrent(nextMonth), []);
  const setMonth = useCallback((cal: CalendarMonth) => setCurrent(cal), []);

  const days = buildCalendarDays(current.year, current.month);

  return { current, days, goPrev, goNext, setMonth };
}

// ── useDropdown (open/close + click-outside) ──────────────────
export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const open  = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(p => !p), []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [close]);

  return { isOpen, open, close, toggle, rootRef };
}

// ── useSingleDate ─────────────────────────────────────────────
export function useSingleDate(
  defaultValue?: Date | null,
  onChange?: (v: DateValue | null) => void,
  disabledDates?: Date[],
  minDate?: Date,
  maxDate?: Date,
) {
  const [selected, setSelected] = useState<Date | null>(defaultValue ?? null);

  const select = useCallback((date: Date) => {
    if (isDateDisabled(date, disabledDates, minDate, maxDate)) return;
    setSelected(date);
    onChange?.(toDateValue(date));
  }, [onChange, disabledDates, minDate, maxDate]);

  const clear = useCallback(() => {
    setSelected(null);
    onChange?.(null);
  }, [onChange]);

  return { selected, select, clear };
}

// ── useDateRange ──────────────────────────────────────────────
export function useDateRange(
  defaultValue?: DateRangeValue | null,
  onChange?: (v: DateRangeValue) => void,
  disabledDates?: Date[],
  minDate?: Date,
  maxDate?: Date,
) {
  const [startDate, setStartDate] = useState<Date | null>(
    defaultValue?.startDate?.date ?? null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    defaultValue?.endDate?.date ?? null
  );
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');

  const selectDate = useCallback((date: Date) => {
    if (isDateDisabled(date, disabledDates, minDate, maxDate)) return;

    if (selecting === 'start' || !startDate) {
      setStartDate(date);
      setEndDate(null);
      setSelecting('end');
      onChange?.(buildRangeValue(date, null));
    } else {
      // Ensure start ≤ end
      const [s, e] = date < startDate ? [date, startDate] : [startDate, date];
      setStartDate(s);
      setEndDate(e);
      setSelecting('start');
      onChange?.(buildRangeValue(s, e));
    }
  }, [selecting, startDate, onChange, disabledDates, minDate, maxDate]);

  const clear = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelecting('start');
    onChange?.(buildRangeValue(null, null));
  }, [onChange]);

  const isDayInRange = useCallback((date: Date) =>
    isBetween(date, startDate, endDate), [startDate, endDate]);

  const isDayStart = useCallback((date: Date) =>
    startDate ? isSameDay(date, startDate) : false, [startDate]);

  const isDayEnd = useCallback((date: Date) =>
    endDate ? isSameDay(date, endDate) : false, [endDate]);

  return {
    startDate, endDate, selecting,
    selectDate, clear,
    isDayInRange, isDayStart, isDayEnd,
  };
}

// ── useMultipleDatePicker ────────────────────────────────────
interface PickerEntry {
  id: number;
  value: DateValue | null;
  initialMonth: Date;
}

export function useMultipleDatePicker(
  onChange?: (values: DateValue[]) => void,
  onAccept?: (values: DateValue[]) => void,
) {
  const [pickers, setPickers] = useState<PickerEntry[]>([
    { id: 1, value: null, initialMonth: new Date() },
  ]);
  const nextId = useRef(2);

  const addPicker = useCallback(() => {
    setPickers(prev => [
      ...prev,
      { id: nextId.current++, value: null, initialMonth: new Date() },
    ]);
  }, []);

  const removePicker = useCallback((id: number) => {
    setPickers(prev => prev.length > 1 ? prev.filter(p => p.id !== id) : prev);
  }, []);

  const updateValue = useCallback((id: number, value: DateValue | null) => {
    setPickers(prev => prev.map(p => p.id === id ? { ...p, value } : p));
    const current = pickers.map(p => p.id === id ? value : p.value).filter(Boolean) as DateValue[];
    onChange?.(current);
  }, [pickers, onChange]);

  const accept = useCallback(() => {
    const values = pickers.map(p => p.value).filter(Boolean) as DateValue[];
    onAccept?.(values);
  }, [pickers, onAccept]);

  return { pickers, addPicker, removePicker, updateValue, accept };
}

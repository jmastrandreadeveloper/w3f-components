import { useState, useCallback, useRef, useEffect } from "react";
import {
  buildCalendarDays,
  prevMonth,
  nextMonth,
  toDateValue,
  isSameDay,
  isBetween,
  isDateDisabled,
  buildRangeValue,
  parseInitialMonth
} from "./DatePicker.utils";
function useMonthNavigation(initialMonth) {
  const [current, setCurrent] = useState(
    () => parseInitialMonth(initialMonth)
  );
  const goPrev = useCallback(() => setCurrent(prevMonth), []);
  const goNext = useCallback(() => setCurrent(nextMonth), []);
  const setMonth = useCallback((cal) => setCurrent(cal), []);
  const days = buildCalendarDays(current.year, current.month);
  return { current, days, goPrev, goNext, setMonth };
}
function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);
  useEffect(() => {
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [close]);
  return { isOpen, open, close, toggle, rootRef };
}
function useSingleDate(defaultValue, onChange, disabledDates, minDate, maxDate) {
  const [selected, setSelected] = useState(defaultValue ?? null);
  const select = useCallback((date) => {
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
function useDateRange(defaultValue, onChange, disabledDates, minDate, maxDate) {
  const [startDate, setStartDate] = useState(
    defaultValue?.startDate?.date ?? null
  );
  const [endDate, setEndDate] = useState(
    defaultValue?.endDate?.date ?? null
  );
  const [selecting, setSelecting] = useState("start");
  const selectDate = useCallback((date) => {
    if (isDateDisabled(date, disabledDates, minDate, maxDate)) return;
    if (selecting === "start" || !startDate) {
      setStartDate(date);
      setEndDate(null);
      setSelecting("end");
      onChange?.(buildRangeValue(date, null));
    } else {
      const [s, e] = date < startDate ? [date, startDate] : [startDate, date];
      setStartDate(s);
      setEndDate(e);
      setSelecting("start");
      onChange?.(buildRangeValue(s, e));
    }
  }, [selecting, startDate, onChange, disabledDates, minDate, maxDate]);
  const clear = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelecting("start");
    onChange?.(buildRangeValue(null, null));
  }, [onChange]);
  const isDayInRange = useCallback((date) => isBetween(date, startDate, endDate), [startDate, endDate]);
  const isDayStart = useCallback((date) => startDate ? isSameDay(date, startDate) : false, [startDate]);
  const isDayEnd = useCallback((date) => endDate ? isSameDay(date, endDate) : false, [endDate]);
  return {
    startDate,
    endDate,
    selecting,
    selectDate,
    clear,
    isDayInRange,
    isDayStart,
    isDayEnd
  };
}
function useMultipleDatePicker(onChange, onAccept) {
  const [pickers, setPickers] = useState([
    { id: 1, value: null, initialMonth: /* @__PURE__ */ new Date() }
  ]);
  const nextId = useRef(2);
  const addPicker = useCallback(() => {
    setPickers((prev) => [
      ...prev,
      { id: nextId.current++, value: null, initialMonth: /* @__PURE__ */ new Date() }
    ]);
  }, []);
  const removePicker = useCallback((id) => {
    setPickers((prev) => prev.length > 1 ? prev.filter((p) => p.id !== id) : prev);
  }, []);
  const updateValue = useCallback((id, value) => {
    setPickers((prev) => prev.map((p) => p.id === id ? { ...p, value } : p));
    const current = pickers.map((p) => p.id === id ? value : p.value).filter(Boolean);
    onChange?.(current);
  }, [pickers, onChange]);
  const accept = useCallback(() => {
    const values = pickers.map((p) => p.value).filter(Boolean);
    onAccept?.(values);
  }, [pickers, onAccept]);
  return { pickers, addPicker, removePicker, updateValue, accept };
}
export {
  useDateRange,
  useDropdown,
  useMonthNavigation,
  useMultipleDatePicker,
  useSingleDate
};
//# sourceMappingURL=DatePicker.hooks.js.map

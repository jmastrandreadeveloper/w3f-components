import { DP_MONTHS_LONG, DP_WEEKDAYS_LONG, DP_MONTHS_SHORT } from "./DatePicker.constants";
function toDateValue(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return {
    date,
    formatted: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    display: `${date.getDate()} ${DP_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    weekday: DP_WEEKDAYS_LONG[date.getDay()],
    timestamp: date.getTime()
  };
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isToday(date) {
  return isSameDay(date, /* @__PURE__ */ new Date());
}
function isBetween(date, start, end) {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}
function isDateDisabled(date, disabledDates, minDate, maxDate) {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}
function buildCalendarDays(year, month) {
  const today = /* @__PURE__ */ new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const cells = [];
  const leadingDays = firstDay.getDay();
  for (let i = leadingDays - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    cells.push({
      date: d,
      dayNum: d.getDate(),
      isCurrentMonth: false,
      isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0,
      isDisabled: false
    });
  }
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const d = new Date(year, month, day);
    cells.push({
      date: d,
      dayNum: day,
      isCurrentMonth: true,
      isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0,
      isDisabled: false
    });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    cells.push({
      date: d,
      dayNum: d.getDate(),
      isCurrentMonth: false,
      isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0,
      isDisabled: false
    });
  }
  return cells;
}
function prevMonth(cal) {
  if (cal.month === 0) return { year: cal.year - 1, month: 11 };
  return { year: cal.year, month: cal.month - 1 };
}
function nextMonth(cal) {
  if (cal.month === 11) return { year: cal.year + 1, month: 0 };
  return { year: cal.year, month: cal.month + 1 };
}
function formatMonthTitle(year, month) {
  return `${DP_MONTHS_LONG[month]} ${year}`;
}
function buildRangeValue(startDate, endDate) {
  const sv = startDate ? toDateValue(startDate) : null;
  const ev = endDate ? toDateValue(endDate) : null;
  let days = 0;
  if (startDate && endDate) {
    days = Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / 864e5
    ) + 1;
  }
  return {
    startDate: sv,
    endDate: ev,
    formattedRange: sv && ev ? `${sv.formatted} \u2192 ${ev.formatted}` : sv?.formatted ?? "",
    days
  };
}
function parseInitialMonth(initialMonth) {
  if (!initialMonth) {
    const now = /* @__PURE__ */ new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  if (typeof initialMonth === "string") {
    const [y, m] = initialMonth.split("-").map(Number);
    return { year: y, month: (m || 1) - 1 };
  }
  return { year: initialMonth.getFullYear(), month: initialMonth.getMonth() };
}
export {
  buildCalendarDays,
  buildRangeValue,
  formatMonthTitle,
  isBetween,
  isDateDisabled,
  isSameDay,
  isToday,
  nextMonth,
  parseInitialMonth,
  prevMonth,
  toDateValue
};
//# sourceMappingURL=DatePicker.utils.js.map

import { CALENDAR_ROOT_CLASS } from "./CalendarHeatmap.constants";
import { buildChartRootClasses } from "../_base/utils";
function buildCalendarClasses(className, unstyled) {
  return buildChartRootClasses(CALENDAR_ROOT_CLASS, className, unstyled);
}
function toDate(d) {
  return d instanceof Date ? d : new Date(d);
}
function getWeekOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const startDay = start.getDay();
  const diff = (date.getTime() - start.getTime()) / 864e5;
  return Math.floor((diff + startDay) / 7);
}
function buildCalendarCells(data) {
  const dates = data.map((d) => toDate(d.date));
  const year = dates.length > 0 ? dates[0].getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
  const lookup = /* @__PURE__ */ new Map();
  for (const d of data) {
    const dt = toDate(d.date);
    const key = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
    lookup.set(key, d);
  }
  const cells = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const startWeek = getWeekOfYear(startDate);
  let current = new Date(startDate);
  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    const weekIndex = getWeekOfYear(current) - startWeek;
    const key = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
    const datum = lookup.get(key) ?? null;
    cells.push({
      date: new Date(current),
      dayOfWeek,
      weekIndex,
      value: datum?.value ?? 0,
      datum
    });
    current = new Date(current.getTime() + 864e5);
  }
  const weeksCount = cells.length > 0 ? cells[cells.length - 1].weekIndex + 1 : 53;
  return { cells, year, weeksCount };
}
function valueToColor(value, maxValue, emptyColor, colorRamp) {
  if (value <= 0) return emptyColor;
  if (maxValue <= 0) return emptyColor;
  const ratio = Math.min(value / maxValue, 1);
  const idx = Math.min(Math.floor(ratio * colorRamp.length), colorRamp.length - 1);
  return colorRamp[idx];
}
function buildTooltipContent(cell, formatValue) {
  const dateStr = cell.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const valStr = formatValue ? formatValue(cell.value) : cell.value.toLocaleString();
  return `${dateStr}: ${valStr}`;
}
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getMonthBoundaries(cells) {
  const result = [];
  let lastMonth = -1;
  for (const cell of cells) {
    const m = cell.date.getMonth();
    if (m !== lastMonth) {
      result.push({ month: MONTH_LABELS[m], weekIndex: cell.weekIndex });
      lastMonth = m;
    }
  }
  return result;
}
export {
  buildCalendarCells,
  buildCalendarClasses,
  buildTooltipContent,
  getMonthBoundaries,
  toDate,
  valueToColor
};
//# sourceMappingURL=CalendarHeatmap.utils.js.map

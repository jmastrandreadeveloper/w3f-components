import { generateRange } from "./TimePicker.constants";
function buildTimeValue(hours24, minutes, seconds, format) {
  const pad = (n) => String(n).padStart(2, "0");
  const ampm = hours24 < 12 ? "AM" : "PM";
  const h12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
  const formatted24 = `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;
  const formatted12 = `${pad(h12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  return {
    hours: hours24,
    minutes,
    seconds,
    ampm,
    formatted24,
    formatted12,
    display: format === 12 ? formatted12 : formatted24,
    timestamp: hours24 * 3600 + minutes * 60 + seconds
  };
}
function parsePartialTime(partial) {
  return {
    hours24: partial?.hours ?? 0,
    minutes: partial?.minutes ?? 0,
    seconds: partial?.seconds ?? 0
  };
}
function getNowValues() {
  const n = /* @__PURE__ */ new Date();
  return { hours24: n.getHours(), minutes: n.getMinutes(), seconds: n.getSeconds() };
}
function to24Hour(h12, ampm) {
  if (ampm === "AM") return h12 === 12 ? 0 : h12;
  return h12 === 12 ? 12 : h12 + 12;
}
function to12Hour(h24) {
  if (h24 === 0) return 12;
  if (h24 <= 12) return h24;
  return h24 - 12;
}
function getMinuteValues(step) {
  return generateRange(59, step);
}
function getSecondValues(step) {
  return generateRange(59, step);
}
function formatTimeDisplay(hours24, minutes, seconds, format, showSeconds) {
  const pad = (n) => String(n).padStart(2, "0");
  const ampm = hours24 < 12 ? "AM" : "PM";
  const h = format === 12 ? to12Hour(hours24) : hours24;
  const base = `${pad(h)}:${pad(minutes)}`;
  const withSec = showSeconds ? `${base}:${pad(seconds)}` : base;
  return format === 12 ? `${withSec} ${ampm}` : withSec;
}
function findClosestIndex(values, target) {
  let idx = values.indexOf(target);
  if (idx === -1) {
    idx = values.reduce((best, v, i) => Math.abs(v - target) < Math.abs(values[best] - target) ? i : best, 0);
  }
  return idx;
}
export {
  buildTimeValue,
  findClosestIndex,
  formatTimeDisplay,
  getMinuteValues,
  getNowValues,
  getSecondValues,
  parsePartialTime,
  to12Hour,
  to24Hour
};
//# sourceMappingURL=TimePicker.utils.js.map

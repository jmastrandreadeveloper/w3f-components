import { useState, useCallback, useRef, useEffect } from "react";
import { buildTimeValue, parsePartialTime, getNowValues, to24Hour, to12Hour } from "./TimePicker.utils";
import { HOURS_24, HOURS_12, generateRange } from "./TimePicker.constants";
function useTPDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);
  useEffect(() => {
    const onOut = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, [close]);
  return { isOpen, open, close, toggle, rootRef };
}
function useTimePicker(options) {
  const {
    defaultValue,
    format = 24,
    showSeconds = false,
    minuteStep = 1,
    secondStep = 1,
    onChange
  } = options;
  const parsed = parsePartialTime(defaultValue);
  const [hours24, setHours24] = useState(parsed.hours24);
  const [minutes, setMinutes] = useState(parsed.minutes);
  const [seconds, setSeconds] = useState(parsed.seconds);
  const ampm = hours24 < 12 ? "AM" : "PM";
  const hours12 = to12Hour(hours24);
  const hourValues = format === 12 ? HOURS_12 : HOURS_24;
  const minuteValues = generateRange(59, minuteStep);
  const secondValues = generateRange(59, secondStep);
  const emitChange = useCallback((h, m, s) => {
    onChange?.(buildTimeValue(h, m, s, format));
  }, [onChange, format]);
  const setHour = useCallback((raw) => {
    const h = format === 12 ? to24Hour(raw, ampm) : raw;
    setHours24(h);
    emitChange(h, minutes, seconds);
  }, [format, ampm, minutes, seconds, emitChange]);
  const setMinute = useCallback((m) => {
    setMinutes(m);
    emitChange(hours24, m, seconds);
  }, [hours24, seconds, emitChange]);
  const setSecond = useCallback((s) => {
    setSeconds(s);
    emitChange(hours24, minutes, s);
  }, [hours24, minutes, emitChange]);
  const toggleAmPm = useCallback(() => {
    const newAmPm = ampm === "AM" ? "PM" : "AM";
    const newH = to24Hour(hours12, newAmPm);
    setHours24(newH);
    emitChange(newH, minutes, seconds);
  }, [ampm, hours12, minutes, seconds, emitChange]);
  const setNow = useCallback(() => {
    const { hours24: h, minutes: m, seconds: s } = getNowValues();
    setHours24(h);
    setMinutes(m);
    setSeconds(s);
    emitChange(h, m, s);
  }, [emitChange]);
  const clear = useCallback(() => {
    setHours24(0);
    setMinutes(0);
    setSeconds(0);
  }, []);
  const currentValue = buildTimeValue(hours24, minutes, seconds, format);
  return {
    hours24,
    minutes,
    seconds,
    ampm,
    hours12,
    hourValues,
    minuteValues,
    secondValues,
    currentValue,
    setHour,
    setMinute,
    setSecond,
    toggleAmPm,
    setNow,
    clear
  };
}
function useScrollWheel(containerRef, values, selected, onSelect) {
  const ITEM_HEIGHT = 44;
  const isMounted = useRef(false);
  const isProgrammatic = useRef(false);
  const programmaticTimer = useRef(null);
  const snapTimer = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const idx = values.indexOf(selected);
    if (idx < 0) return;
    const target = Math.max(0, idx * ITEM_HEIGHT - (el.clientHeight - ITEM_HEIGHT) / 2);
    if (snapTimer.current) clearTimeout(snapTimer.current);
    isProgrammatic.current = true;
    if (!isMounted.current) {
      el.scrollTop = target;
      isMounted.current = true;
      isProgrammatic.current = false;
    } else {
      el.scrollTo({ top: target, behavior: "smooth" });
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
      programmaticTimer.current = setTimeout(() => {
        isProgrammatic.current = false;
      }, 500);
    }
  }, [selected, values, containerRef]);
  const onScroll = useCallback(() => {
    if (isProgrammatic.current) return;
    const el = containerRef.current;
    if (!el) return;
    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      if (isProgrammatic.current) return;
      const idx = Math.round((el.scrollTop + (el.clientHeight - ITEM_HEIGHT) / 2) / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(values.length - 1, idx));
      const newValue = values[clamped];
      if (newValue !== void 0 && newValue !== selected) onSelect(newValue);
    }, 150);
  }, [containerRef, values, selected, onSelect]);
  return { onScroll };
}
export {
  useScrollWheel,
  useTPDropdown,
  useTimePicker
};
//# sourceMappingURL=TimePicker.hooks.js.map

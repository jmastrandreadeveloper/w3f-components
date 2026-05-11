import { useState, useCallback, useRef, useEffect } from 'react';
import type React from 'react';
import type { TimeValue, AmPm } from './TimePicker.types';
import { buildTimeValue, parsePartialTime, getNowValues, to24Hour, to12Hour } from './TimePicker.utils';
import { HOURS_24, HOURS_12, ALL_MINUTES, ALL_SECONDS, generateRange } from './TimePicker.constants';

// ── useDropdown ───────────────────────────────────────────────
export function useTPDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const open   = useCallback(() => setIsOpen(true), []);
  const close  = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(p => !p), []);

  useEffect(() => {
    const onOut = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, [close]);

  return { isOpen, open, close, toggle, rootRef };
}

// ── useTimePicker (main state hook) ──────────────────────────
export function useTimePicker(options: {
  defaultValue?: Partial<TimeValue> | null;
  format?: 12 | 24;
  showSeconds?: boolean;
  minuteStep?: number;
  secondStep?: number;
  onChange?: (v: TimeValue) => void;
}) {
  const {
    defaultValue,
    format       = 24,
    showSeconds  = false,
    minuteStep   = 1,
    secondStep   = 1,
    onChange,
  } = options;

  const parsed  = parsePartialTime(defaultValue);
  const [hours24,  setHours24]  = useState(parsed.hours24);
  const [minutes,  setMinutes]  = useState(parsed.minutes);
  const [seconds,  setSeconds]  = useState(parsed.seconds);

  // Derived
  const ampm: AmPm = hours24 < 12 ? 'AM' : 'PM';
  const hours12    = to12Hour(hours24);

  // Available values
  const hourValues   = format === 12 ? HOURS_12   : HOURS_24;
  const minuteValues = generateRange(59, minuteStep);
  const secondValues = generateRange(59, secondStep);

  const emitChange = useCallback((h: number, m: number, s: number) => {
    onChange?.(buildTimeValue(h, m, s, format));
  }, [onChange, format]);

  // Setters
  const setHour = useCallback((raw: number) => {
    const h = format === 12 ? to24Hour(raw, ampm) : raw;
    setHours24(h);
    emitChange(h, minutes, seconds);
  }, [format, ampm, minutes, seconds, emitChange]);

  const setMinute = useCallback((m: number) => {
    setMinutes(m);
    emitChange(hours24, m, seconds);
  }, [hours24, seconds, emitChange]);

  const setSecond = useCallback((s: number) => {
    setSeconds(s);
    emitChange(hours24, minutes, s);
  }, [hours24, minutes, emitChange]);

  const toggleAmPm = useCallback(() => {
    const newAmPm: AmPm = ampm === 'AM' ? 'PM' : 'AM';
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
    setHours24(0); setMinutes(0); setSeconds(0);
  }, []);

  const currentValue: TimeValue = buildTimeValue(hours24, minutes, seconds, format);

  return {
    hours24, minutes, seconds, ampm, hours12,
    hourValues, minuteValues, secondValues,
    currentValue,
    setHour, setMinute, setSecond, toggleAmPm, setNow, clear,
  };
}

// ── useScrollWheel (sync scroll position to selected item) ────
export function useScrollWheel(
  containerRef: React.RefObject<HTMLDivElement | null>,
  values: number[],
  selected: number,
  onSelect: (v: number) => void,
) {
  const ITEM_HEIGHT = 44;
  const isMounted = useRef(false);
  // Guards onScroll from firing during programmatic scrolls (click/step buttons)
  const isProgrammatic = useRef(false);
  const programmaticTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to selected on mount / when selected changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const idx = values.indexOf(selected);
    if (idx < 0) return;
    const target = Math.max(0, idx * ITEM_HEIGHT - (el.clientHeight - ITEM_HEIGHT) / 2);

    // Cancel any pending user-scroll snap so it doesn't override this change
    if (snapTimer.current) clearTimeout(snapTimer.current);

    isProgrammatic.current = true;

    if (!isMounted.current) {
      el.scrollTop = target;
      isMounted.current = true;
      isProgrammatic.current = false;
    } else {
      el.scrollTo({ top: target, behavior: 'smooth' });
      // Smooth scroll takes ~300ms; keep flag set until animation is done
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
      programmaticTimer.current = setTimeout(() => {
        isProgrammatic.current = false;
      }, 500);
    }
  }, [selected, values, containerRef]);

  // On scroll → debounce → snap to nearest item (user scrolls only)
  const onScroll = useCallback(() => {
    // Ignore scroll events caused by programmatic scrollTo calls
    if (isProgrammatic.current) return;

    const el = containerRef.current;
    if (!el) return;

    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      if (isProgrammatic.current) return;
      const idx = Math.round((el.scrollTop + (el.clientHeight - ITEM_HEIGHT) / 2) / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(values.length - 1, idx));
      const newValue = values[clamped];
      if (newValue !== undefined && newValue !== selected) onSelect(newValue);
    }, 150);
  }, [containerRef, values, selected, onSelect]);

  return { onScroll };
}


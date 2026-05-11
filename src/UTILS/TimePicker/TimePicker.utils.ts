import type { TimeValue, AmPm } from './TimePicker.types';
import { generateRange } from './TimePicker.constants';

// ── Build TimeValue ───────────────────────────────────────────
export function buildTimeValue(
  hours24: number,
  minutes: number,
  seconds: number,
  format: 12 | 24,
): TimeValue {
  const pad = (n: number) => String(n).padStart(2, '0');
  const ampm: AmPm = hours24 < 12 ? 'AM' : 'PM';
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
    timestamp: hours24 * 3600 + minutes * 60 + seconds,
  };
}

// ── Parse from partial TimeValue ──────────────────────────────
export function parsePartialTime(
  partial: Partial<TimeValue> | null | undefined,
): { hours24: number; minutes: number; seconds: number } {
  return {
    hours24: partial?.hours  ?? 0,
    minutes: partial?.minutes ?? 0,
    seconds: partial?.seconds ?? 0,
  };
}

// ── Now as 24h values ─────────────────────────────────────────
export function getNowValues(): { hours24: number; minutes: number; seconds: number } {
  const n = new Date();
  return { hours24: n.getHours(), minutes: n.getMinutes(), seconds: n.getSeconds() };
}

// ── Convert 12h display hour to 24h ──────────────────────────
export function to24Hour(h12: number, ampm: AmPm): number {
  if (ampm === 'AM') return h12 === 12 ? 0 : h12;
  return h12 === 12 ? 12 : h12 + 12;
}

export function to12Hour(h24: number): number {
  if (h24 === 0)  return 12;
  if (h24 <= 12)  return h24;
  return h24 - 12;
}

// ── Generate values with step ─────────────────────────────────
export function getMinuteValues(step: number): number[] {
  return generateRange(59, step);
}

export function getSecondValues(step: number): number[] {
  return generateRange(59, step);
}

// ── Format for display input ──────────────────────────────────
export function formatTimeDisplay(
  hours24: number,
  minutes: number,
  seconds: number,
  format: 12 | 24,
  showSeconds: boolean,
): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const ampm: AmPm = hours24 < 12 ? 'AM' : 'PM';
  const h = format === 12 ? to12Hour(hours24) : hours24;
  const base = `${pad(h)}:${pad(minutes)}`;
  const withSec = showSeconds ? `${base}:${pad(seconds)}` : base;
  return format === 12 ? `${withSec} ${ampm}` : withSec;
}

// ── Scroll item index finder ──────────────────────────────────
export function findClosestIndex(values: number[], target: number): number {
  let idx = values.indexOf(target);
  if (idx === -1) {
    idx = values.reduce((best, v, i) =>
      Math.abs(v - target) < Math.abs(values[best] - target) ? i : best, 0);
  }
  return idx;
}

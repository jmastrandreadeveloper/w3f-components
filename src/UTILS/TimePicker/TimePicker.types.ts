import type { ReactNode } from 'react';

// ── Value Types ───────────────────────────────────────────────
export type AmPm = 'AM' | 'PM';

export interface TimeValue {
  hours: number;      // 0-23 (always 24h internally)
  minutes: number;    // 0-59
  seconds: number;    // 0-59
  ampm: AmPm;
  formatted24: string; // "14:30:00"
  formatted12: string; // "02:30:00 PM"
  display: string;     // depends on format prop
  timestamp: number;   // seconds since midnight
}

// ── Prop Interfaces ───────────────────────────────────────────
export interface TimePickerProps {
  /** Currently selected time (controlled) */
  value?: Partial<TimeValue> | null;
  /** Default value (uncontrolled) */
  defaultValue?: Partial<TimeValue> | null;
  /** 12 or 24 hour format */
  format?: 12 | 24;
  /** Show seconds wheel */
  showSeconds?: boolean;
  /** Field name for form integration */
  name?: string;
  /** Placeholder when no time selected */
  placeholder?: string;
  /** Minute step (1, 5, 10, 15, 30) */
  minuteStep?: number;
  /** Second step (1, 5, 10, 15, 30) */
  secondStep?: number;
  /** Fired when time changes */
  onChange?: (value: TimeValue) => void;
  /** Fired when user clicks Accept */
  onAccept?: (value: TimeValue) => void;
  /** Show as always-visible (true) or dropdown (false) */
  inline?: boolean;
  /** Show "Clear" button */
  clearable?: boolean;
  /** Show "Now" shortcut button */
  showNow?: boolean;
  children?: ReactNode;
  className?: string;
}

// ── Internal ──────────────────────────────────────────────────
export interface TimeColumn {
  id: 'hours' | 'minutes' | 'seconds';
  label: string;
  values: number[];
  selected: number;
}

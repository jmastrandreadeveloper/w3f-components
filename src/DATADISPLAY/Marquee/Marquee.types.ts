import type React from 'react';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

export interface MarqueeProps {
  /** Items to scroll infinitely */
  children: React.ReactNode;
  /** Scroll direction */
  direction?: MarqueeDirection;
  /** Animation duration in seconds (lower = faster) */
  speed?: number;
  /** Pause scrolling on hover */
  pauseOnHover?: boolean;
  /** Gap between items */
  gap?: number;
  /** Number of times to duplicate children for seamless loop (default: 2) */
  repeat?: number;
  /** Gradient fade on edges (px width of fade, 0 = no fade) */
  fadeEdge?: number;
  /** If true, removes all visual/preset styles — only structural CSS remains. */
  unstyled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Accessible label for the scrolling region */
  'aria-label'?: string;
  [key: string]: unknown;
}

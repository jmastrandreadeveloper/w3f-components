import { useState, useEffect } from 'react';

// ── Breakpoint key ─────────────────────────────────────────────
export type MasonryBp = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

function getBreakpoint(): MasonryBp {
  if (typeof window === 'undefined') return 'xs';
  const w = window.innerWidth;
  if (w >= 1280) return 'xl';
  if (w >= 1024) return 'lg';
  if (w >= 768)  return 'md';
  if (w >= 640)  return 'sm';
  return 'xs';
}

/**
 * Returns the current W3Fussion breakpoint key.
 * Useful when consumers need to conditionally render items
 * or change props based on viewport width.
 */
export function useMasonryBreakpoint(): MasonryBp {
  const [bp, setBp] = useState<MasonryBp>(getBreakpoint);

  useEffect(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  return bp;
}

import React, { forwardRef } from 'react';
import type { MarqueeProps } from './Marquee.types';
import { MARQUEE_DEFAULTS } from './Marquee.constants';
import { buildMarqueeClasses, buildTrackClasses, buildFadeMask } from './Marquee.utils';

/**
 * Marquee — Infinite scrolling component for logos, partners, testimonials, etc.
 * Supports horizontal (left/right) and vertical (up/down) directions.
 * Pure CSS animation — no JS requestAnimationFrame.
 */
const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(({
  children,
  direction = MARQUEE_DEFAULTS.direction,
  speed = MARQUEE_DEFAULTS.speed,
  pauseOnHover = MARQUEE_DEFAULTS.pauseOnHover,
  gap = MARQUEE_DEFAULTS.gap,
  repeat = MARQUEE_DEFAULTS.repeat,
  fadeEdge = MARQUEE_DEFAULTS.fadeEdge,
  unstyled = MARQUEE_DEFAULTS.unstyled,
  className = MARQUEE_DEFAULTS.className,
  style = {},
  'aria-label': ariaLabel,
  ...rest
}, ref) => {
  // Security: clamp numeric props to safe ranges to prevent abuse
  const safeSpeed = Math.max(0.1, Math.min(Number(speed) || 30, 600));
  const safeGap = Math.max(0, Math.min(Number(gap) || 24, 500));
  const safeRepeat = Math.max(1, Math.min(Math.floor(Number(repeat) || 2), 10));
  const safeFadeEdge = Math.max(0, Math.min(Number(fadeEdge) || 40, 500));

  const classes = buildMarqueeClasses(direction, pauseOnHover, unstyled, className);
  const trackClasses = buildTrackClasses(direction);
  const fadeMask = buildFadeMask(direction, safeFadeEdge);

  const wrapperStyle: React.CSSProperties = {
    ...style,
    '--marquee-speed': `${safeSpeed}s`,
    '--marquee-gap': `${safeGap}px`,
    ...(fadeMask ? { WebkitMaskImage: fadeMask, maskImage: fadeMask } : {}),
  } as React.CSSProperties;

  // Duplicate children N times for seamless loop
  const copies = safeRepeat;
  const tracks = Array.from({ length: copies }, (_, i) => (
    <div key={i} className="w3f-marquee__group" aria-hidden={i > 0 ? true : undefined}>
      {children}
    </div>
  ));

  return (
    <div
      ref={ref}
      className={classes}
      style={wrapperStyle}
      role="marquee"
      aria-label={ariaLabel || 'Scrolling content'}
      {...rest}
    >
      <div className={trackClasses}>
        {tracks}
      </div>
    </div>
  );
});

Marquee.displayName = 'Marquee';

export { Marquee };
export default Marquee;

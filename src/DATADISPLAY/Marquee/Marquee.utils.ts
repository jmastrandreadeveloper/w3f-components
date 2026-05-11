import type { MarqueeDirection } from './Marquee.types';

/**
 * Build CSS class string for the Marquee component.
 */
export function buildMarqueeClasses(
  direction: MarqueeDirection,
  pauseOnHover: boolean,
  unstyled?: boolean,
  className?: string,
): string {
  const base = 'w3f-marquee';
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');

  const classes: string[] = [base];

  const isVertical = direction === 'up' || direction === 'down';
  classes.push(isVertical ? 'w3f-marquee--vertical' : 'w3f-marquee--horizontal');

  if (pauseOnHover) classes.push('w3f-marquee--pause-hover');

  if (className) classes.push(className);

  return classes.join(' ');
}

/**
 * Build CSS class string for the inner track.
 */
export function buildTrackClasses(direction: MarqueeDirection): string {
  const classes: string[] = ['w3f-marquee__track'];

  switch (direction) {
    case 'left':  classes.push('w3f-marquee__track--left');  break;
    case 'right': classes.push('w3f-marquee__track--right'); break;
    case 'up':    classes.push('w3f-marquee__track--up');    break;
    case 'down':  classes.push('w3f-marquee__track--down');  break;
  }

  return classes.join(' ');
}

/**
 * Build the fade mask gradient CSS for edge fading.
 */
export function buildFadeMask(
  direction: MarqueeDirection,
  fadeEdge: number,
): string | undefined {
  if (fadeEdge <= 0) return undefined;

  const isVertical = direction === 'up' || direction === 'down';
  const axis = isVertical ? 'to bottom' : 'to right';

  return `linear-gradient(${axis}, transparent, black ${fadeEdge}px, black calc(100% - ${fadeEdge}px), transparent)`;
}

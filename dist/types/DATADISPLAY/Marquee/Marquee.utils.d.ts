import type { MarqueeDirection } from './Marquee.types';
/**
 * Build CSS class string for the Marquee component.
 */
export declare function buildMarqueeClasses(direction: MarqueeDirection, pauseOnHover: boolean, unstyled?: boolean, className?: string): string;
/**
 * Build CSS class string for the inner track.
 */
export declare function buildTrackClasses(direction: MarqueeDirection): string;
/**
 * Build the fade mask gradient CSS for edge fading.
 */
export declare function buildFadeMask(direction: MarqueeDirection, fadeEdge: number): string | undefined;
//# sourceMappingURL=Marquee.utils.d.ts.map
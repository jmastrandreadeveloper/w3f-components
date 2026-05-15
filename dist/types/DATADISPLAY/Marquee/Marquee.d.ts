import React from 'react';
import type { MarqueeProps } from './Marquee.types';
/**
 * Marquee — Infinite scrolling component for logos, partners, testimonials, etc.
 * Supports horizontal (left/right) and vertical (up/down) directions.
 * Pure CSS animation — no JS requestAnimationFrame.
 */
declare const Marquee: React.ForwardRefExoticComponent<Omit<MarqueeProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Marquee };
export default Marquee;
//# sourceMappingURL=Marquee.d.ts.map
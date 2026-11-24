import React from 'react';
import type { ChartTooltipProps } from './ChartTooltip.types';
/**
 * W3F ChartTooltip — absolute-positioned div that floats over the
 * chart. Intended to live inside a `position: relative` wrapper
 * (usually `.w3f-chart__container`).
 *
 * The wrapper clips with `overflow: hidden`, so after layout the tooltip
 * measures itself and moves (flips to the other side of the point, then
 * clamps) to stay entirely inside it; a tooltip wider than the chart wraps
 * (max-content width, at most the chart's width).
 *
 * Unstyled consumers pass `className` to inherit their own styles.
 */
export declare const ChartTooltip: React.FC<ChartTooltipProps>;
export default ChartTooltip;
//# sourceMappingURL=ChartTooltip.d.ts.map
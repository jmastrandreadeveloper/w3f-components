import type { AxisScale } from '@visx/axis';
export type ChartAxisOrientation = 'top' | 'right' | 'bottom' | 'left';
export interface ChartAxisProps {
    /** Scale to drive the axis. Any d3-style scale from `@visx/scale`. */
    scale: AxisScale;
    /** Which side of the plot area the axis sits on. */
    orientation: ChartAxisOrientation;
    /** Pixel offset to position the axis within the SVG group. */
    top?: number;
    left?: number;
    /** Optional tick count hint. */
    numTicks?: number;
    /** Tick formatter. Defaults to `formatTick` from _base/utils. */
    tickFormat?: (value: unknown, index: number) => string;
    /** Optional axis label (rendered outside the plot area). */
    label?: string;
    /** Offset of the axis label from the axis line. */
    labelOffset?: number;
    /** Hide the axis line (keep the ticks). */
    hideAxisLine?: boolean;
    /** Hide the ticks (keep the line). */
    hideTicks?: boolean;
    /** Hide the tick labels. */
    hideTickLabels?: boolean;
    /** Rotate tick labels by N degrees. Useful for dense X axes. -45 or -90 are common values. */
    tickRotate?: number;
    /** Font size for tick labels in px. Defaults to 11. */
    tickFontSize?: number;
    /** Extra className for styling hooks. */
    className?: string;
}
//# sourceMappingURL=ChartAxis.types.d.ts.map
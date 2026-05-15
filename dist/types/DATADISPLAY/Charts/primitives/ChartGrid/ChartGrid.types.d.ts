import type { GridScale } from '@visx/grid/lib/types';
export type ChartGridAxis = 'rows' | 'columns' | 'both';
export interface ChartGridProps {
    /** Horizontal scale (driving the vertical columns lines). */
    xScale?: GridScale;
    /** Vertical scale (driving the horizontal row lines). */
    yScale?: GridScale;
    /** Width of the plot area. */
    width: number;
    /** Height of the plot area. */
    height: number;
    /** Group offset. */
    top?: number;
    left?: number;
    /** Which lines to draw. Defaults to `rows`. */
    axis?: ChartGridAxis;
    /** Number of ticks hint — falls back to the scale default. */
    numTicks?: number;
    /** Extra className. */
    className?: string;
}
//# sourceMappingURL=ChartGrid.types.d.ts.map
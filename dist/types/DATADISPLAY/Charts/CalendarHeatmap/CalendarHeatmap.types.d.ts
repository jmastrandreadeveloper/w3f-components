import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';
/** Calendar heatmap datum — one cell per day. */
export type CalendarDatum = {
    date: Date | string;
    value: number;
};
export type CalendarData = readonly CalendarDatum[];
export interface CalendarHeatmapInnerProps extends BaseChartProps, ChartEventProps<CalendarDatum> {
    width: number;
    height: number;
    data: CalendarData;
    /** Show month labels. */
    showMonthLabels?: boolean;
    /** Show day-of-week labels (M, W, F). */
    showDayLabels?: boolean;
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    /** Color for empty/zero cells. */
    emptyColor?: string;
    /** Color ramp for values (lowest to highest). */
    colorRamp?: readonly string[];
    /** Gap between cells in px. */
    cellGap?: number;
    /** Cell corner radius. */
    cellRadius?: number;
    /** Format value in tooltip. */
    formatValue?: (v: number) => string;
    margin?: ChartMargin;
    /** Externally highlight a specific cell by index. */
    highlightIndex?: number | null;
}
export type CalendarHeatmapProps = Omit<CalendarHeatmapInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=CalendarHeatmap.types.d.ts.map
import type { BaseChartProps, ChartEventProps, ChartMargin, DatumTime } from '../_base/types';

export type LineDatum = DatumTime;
export type LineData = readonly LineDatum[];

export interface LineInnerProps extends BaseChartProps, ChartEventProps<LineDatum> {
    width: number;
    height: number;
    data: LineData;
    getDate?: (d: LineDatum) => Date | number | string;
    getValue?: (d: LineDatum) => number;
    /** Use curved interpolation (monotoneX). Defaults to true. */
    curved?: boolean;
    /** Show dots at each data point. Defaults to false. */
    showDots?: boolean;
    /** Line stroke width in px. Defaults to 2. */
    strokeWidth?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
}

export type LineProps = Omit<LineInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

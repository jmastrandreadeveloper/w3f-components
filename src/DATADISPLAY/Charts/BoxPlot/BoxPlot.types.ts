import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';

export type BoxPlotGroup = { group: string; values: number[] };
export type BoxPlotData = readonly BoxPlotGroup[];

/** Computed stats for one group. */
export type BoxPlotStats = {
    group: string;
    min: number;
    firstQuartile: number;
    median: number;
    thirdQuartile: number;
    max: number;
    outliers: number[];
};

export interface BoxPlotInnerProps extends BaseChartProps, ChartEventProps<BoxPlotStats> {
    width: number;
    height: number;
    data: BoxPlotData;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showOutliers?: boolean;
    boxWidth?: number;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
}

export type BoxPlotProps = Omit<BoxPlotInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

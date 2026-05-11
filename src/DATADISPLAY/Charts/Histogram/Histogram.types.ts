import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';

export type HistogramBin = { x0: number; x1: number; count: number };

export interface HistogramInnerProps extends BaseChartProps, ChartEventProps<HistogramBin> {
    width: number;
    height: number;
    data: readonly number[];
    /** Number of bins. Default: 20 */
    binCount?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    barRadius?: number;
    xDomain?: [number, number];
    formatX?: (n: number) => string;
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
}

export type HistogramProps = Omit<HistogramInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

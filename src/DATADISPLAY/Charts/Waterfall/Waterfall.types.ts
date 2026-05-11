import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';

export type WaterfallDatum = {
    label: string;
    value: number;
    /** If true, this bar represents a running total (drawn from zero). */
    isTotal?: boolean;
};

export type WaterfallData = readonly WaterfallDatum[];

export interface WaterfallInnerProps extends BaseChartProps, ChartEventProps<WaterfallDatum> {
    width: number;
    height: number;
    data: WaterfallData;
    /** Show X axis labels. */
    showXAxis?: boolean;
    /** Show Y axis. */
    showYAxis?: boolean;
    /** Show grid lines. */
    showGrid?: boolean;
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    /** Show value labels on bars. */
    showLabels?: boolean;
    /** Show connector lines between bars. */
    showConnectors?: boolean;
    /** Color for positive increments. */
    positiveColor?: string;
    /** Color for negative decrements. */
    negativeColor?: string;
    /** Color for total bars. */
    totalColor?: string;
    /** Format Y axis ticks. */
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
}

export type WaterfallProps = Omit<WaterfallInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

import type { BaseChartProps, ChartEventProps, ChartMargin, Datum1D } from '../_base/types';

export type FunnelDatum = Datum1D;
export type FunnelData = readonly FunnelDatum[];

export interface FunnelInnerProps extends BaseChartProps, ChartEventProps<FunnelDatum> {
    width: number;
    height: number;
    data: FunnelData;
    /** Show value labels inside funnel segments. */
    showLabels?: boolean;
    /** Show percentage relative to first stage. */
    showPercentage?: boolean;
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    /** Gap between funnel stages in px. */
    gap?: number;
    /** Format value for display. */
    formatValue?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
}

export type FunnelProps = Omit<FunnelInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

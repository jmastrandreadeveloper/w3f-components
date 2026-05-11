import type { BaseChartProps, ChartEventProps, ChartMargin, Datum1D } from '../_base/types';

export type BarHorizontalDatum = Datum1D;
export type BarHorizontalData = readonly BarHorizontalDatum[];

export interface BarHorizontalInnerProps extends BaseChartProps, ChartEventProps<BarHorizontalDatum> {
    width: number;
    height: number;
    data: BarHorizontalData;
    getLabel?: (d: BarHorizontalDatum) => string | number;
    getValue?: (d: BarHorizontalDatum) => number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    padding?: number;
    barRadius?: number;
    xDomain?: [number, number];
    formatX?: (n: number) => string;
    /** Index of the datum to highlight externally (e.g. selected table row). */
    highlightIndex?: number | null;
    margin?: ChartMargin;
}

export type BarHorizontalProps = Omit<BarHorizontalInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

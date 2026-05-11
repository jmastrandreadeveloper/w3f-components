import type { BaseChartProps, ChartEventProps, Datum1D } from '../_base/types';

export type PolarBarDatum = Datum1D;
export type PolarBarData = readonly PolarBarDatum[];

export interface PolarBarInnerProps extends BaseChartProps, ChartEventProps<PolarBarDatum> {
    width: number;
    height: number;
    data: PolarBarData;
    showLabels?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    /** Gap between bars in radians. Default: 0.02 */
    padAngle?: number;
    /** Corner radius on bars. Default: 2 */
    cornerRadius?: number;
    /** Inner radius ratio (0-1). Default: 0.2 */
    innerRadius?: number;
}

export type PolarBarProps = Omit<PolarBarInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

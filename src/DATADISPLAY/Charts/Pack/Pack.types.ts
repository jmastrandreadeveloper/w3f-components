import type { BaseChartProps, ChartEventProps, DatumHierarchy } from '../_base/types';

export type PackDatum = DatumHierarchy;
export type PackData = DatumHierarchy;

export interface PackInnerProps extends BaseChartProps, ChartEventProps<DatumHierarchy> {
    width: number;
    height: number;
    data: PackData;
    showLabels?: boolean;
    showTooltip?: boolean;
    /** Padding between circles. Default: 4 */
    circlePadding?: number;
}

export type PackProps = Omit<PackInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

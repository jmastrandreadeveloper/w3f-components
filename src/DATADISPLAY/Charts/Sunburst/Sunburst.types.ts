import type { BaseChartProps, ChartEventProps, DatumHierarchy } from '../_base/types';

export type SunburstDatum = DatumHierarchy;
export type SunburstData = DatumHierarchy;

export interface SunburstInnerProps extends BaseChartProps, ChartEventProps<DatumHierarchy> {
    width: number;
    height: number;
    data: SunburstData;
    showLabels?: boolean;
    showTooltip?: boolean;
    /** Pad angle between arcs in radians. Default: 0.01 */
    padAngle?: number;
    /** Corner radius on arcs. Default: 2 */
    cornerRadius?: number;
}

export type SunburstProps = Omit<SunburstInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

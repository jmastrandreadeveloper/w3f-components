import type { BaseChartProps, ChartEventProps, DatumHierarchy } from '../_base/types';

export type TreemapDatum = DatumHierarchy;
export type TreemapData = DatumHierarchy;

export interface TreemapInnerProps extends BaseChartProps, ChartEventProps<DatumHierarchy> {
    width: number;
    height: number;
    data: TreemapData;
    showLabels?: boolean;
    showTooltip?: boolean;
    /** Padding between tiles in px. Default: 2 */
    tilePadding?: number;
    /** Corner radius on tiles. Default: 2 */
    tileRadius?: number;
}

export type TreemapProps = Omit<TreemapInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

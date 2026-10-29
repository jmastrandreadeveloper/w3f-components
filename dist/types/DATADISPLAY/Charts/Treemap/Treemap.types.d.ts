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
    /** 0022 B53.4: tamaño de los nombres de los rectángulos (px). Default 11. */
    tileLabelSize?: number;
    /** 0022 B53.4: el valor debajo del nombre. Default false. */
    showTileValues?: boolean;
}
export type TreemapProps = Omit<TreemapInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Treemap.types.d.ts.map
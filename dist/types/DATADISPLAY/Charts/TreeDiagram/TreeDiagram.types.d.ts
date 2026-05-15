import type { BaseChartProps, ChartEventProps, DatumHierarchy } from '../_base/types';
export type TreeDiagramDatum = DatumHierarchy;
export type TreeDiagramData = DatumHierarchy;
export type TreeDiagramLayout = 'top-down' | 'left-right' | 'radial';
export interface TreeDiagramInnerProps extends BaseChartProps, ChartEventProps<DatumHierarchy> {
    width: number;
    height: number;
    data: TreeDiagramData;
    layout?: TreeDiagramLayout;
    showLabels?: boolean;
    showTooltip?: boolean;
    nodeRadius?: number;
    linkStroke?: string;
}
export type TreeDiagramProps = Omit<TreeDiagramInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=TreeDiagram.types.d.ts.map
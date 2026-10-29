import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGraph } from '../_base/types';
export type SankeyNode = {
    id: string;
    label?: string;
    group?: string;
    /** Computed by layout */
    x0?: number;
    x1?: number;
    y0?: number;
    y1?: number;
    value?: number;
};
export type SankeyLink = {
    source: string;
    target: string;
    value: number;
    /** Computed by layout */
    sy0?: number;
    sy1?: number;
    ty0?: number;
    ty1?: number;
};
export type SankeyDatum = DatumGraph;
export type SankeyData = DatumGraph;
export interface SankeyInnerProps extends BaseChartProps, ChartEventProps<SankeyNode> {
    width: number;
    height: number;
    data: SankeyData;
    /** Width of each node column in px. */
    nodeWidth?: number;
    /** Vertical padding between nodes in px. */
    nodePadding?: number;
    /** Show node labels. */
    showLabels?: boolean;
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    margin?: ChartMargin;
    /** 0022 B53.5: opacidad de los flujos (0 a 1). Default 0.3. */
    linkOpacity?: number;
    /** 0022 B53.5: color de cada flujo: el de su origen, el de su destino o gris. Default 'source'. */
    linkColor?: 'source' | 'target' | 'gray';
    /** 0022 B53.5: tamaño de los nombres de los nodos (px). */
    labelSize?: number;
}
export type SankeyProps = Omit<SankeyInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Sankey.types.d.ts.map
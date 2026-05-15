import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGraph } from '../_base/types';
export type NetworkNode = DatumGraph['nodes'][number] & {
    x?: number;
    y?: number;
};
export type NetworkLink = DatumGraph['links'][number];
export type NetworkDatum = DatumGraph;
export type NetworkData = DatumGraph;
export interface NetworkInnerProps extends BaseChartProps, ChartEventProps<NetworkNode> {
    width: number;
    height: number;
    data: NetworkData;
    /** Node radius in px. */
    nodeRadius?: number;
    /** Show node labels. */
    showLabels?: boolean;
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    /** Link stroke width. */
    linkWidth?: number;
    /** Simulation iterations (higher = more stable but slower initial render). */
    iterations?: number;
    margin?: ChartMargin;
}
export type NetworkProps = Omit<NetworkInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Network.types.d.ts.map
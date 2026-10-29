import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';
export type ViolinGroup = {
    group: string;
    values: number[];
};
export type ViolinData = readonly ViolinGroup[];
export interface ViolinInnerProps extends BaseChartProps, ChartEventProps<ViolinGroup> {
    width: number;
    height: number;
    data: ViolinData;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    /** Number of bins for the KDE approximation. Default: 20 */
    resolution?: number;
    /** Bandwidth multiplier for KDE smoothing. Default: 1 */
    bandwidth?: number;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
    /** VX6 (lo que trae matplotlib en violinplot): orientación, un solo lado, ancho, promedio, mediana, extremos,
     *  cuantiles y color del contorno. */
    violinOrientation?: 'vertical' | 'horizontal';
    violinSide?: 'both' | 'low' | 'high';
    violinWidth?: number;
    violinShowMeans?: boolean;
    violinShowMedians?: boolean;
    violinShowExtrema?: boolean;
    violinQuantiles?: 'none' | 'quartiles' | 'deciles';
    violinLineColor?: string;
}
export type ViolinProps = Omit<ViolinInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Violin.types.d.ts.map
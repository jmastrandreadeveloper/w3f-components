import type { BaseChartProps, ChartEventProps, ChartMargin, DatumXY } from '../_base/types';
export type DotPlotDatum = DatumXY;
export type DotPlotData = readonly DotPlotDatum[];
export interface DotPlotInnerProps extends BaseChartProps, ChartEventProps<DotPlotDatum> {
    width: number;
    height: number;
    data: DotPlotData;
    categories: readonly string[];
    getX?: (d: DotPlotDatum) => number;
    getCategory?: (d: DotPlotDatum) => number;
    showXAxis?: boolean;
    showCategoryLabels?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    pointRadius?: number;
    xDomain?: [number, number];
    formatX?: (n: number) => string;
    margin?: ChartMargin;
    /** Externally highlight a specific dot by index. */
    highlightIndex?: number | null;
}
export type DotPlotProps = Omit<DotPlotInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=DotPlot.types.d.ts.map
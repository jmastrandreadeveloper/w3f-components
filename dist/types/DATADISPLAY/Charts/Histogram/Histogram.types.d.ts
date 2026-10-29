import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';
export type HistogramBin = {
    x0: number;
    x1: number;
    count: number;
};
export interface HistogramInnerProps extends BaseChartProps, ChartEventProps<HistogramBin> {
    width: number;
    height: number;
    data: readonly number[];
    /** Bins already computed (e.g. on the server for large data): when given, `data` / `binCount` / `xDomain`
     *  are not used for binning. */
    bins?: readonly HistogramBin[];
    /** Number of bins. Default: 20 */
    binCount?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    barRadius?: number;
    xDomain?: [number, number];
    formatX?: (n: number) => string;
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
    /** VX6 (lo que trae matplotlib en hist): acumulado, densidad, el rango que se cuenta, tipo y orientación. */
    histCumulative?: boolean;
    histDensity?: boolean;
    histRangeMin?: number;
    histRangeMax?: number;
    histType?: 'bar' | 'step' | 'stepfilled';
    histOrientation?: 'vertical' | 'horizontal';
}
export type HistogramProps = Omit<HistogramInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Histogram.types.d.ts.map
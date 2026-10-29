import type { BaseChartProps, ChartEventProps, ChartMargin } from '../_base/types';
export type BoxPlotGroup = {
    group: string;
    values: number[];
};
export type BoxPlotData = readonly BoxPlotGroup[];
/** Computed stats for one group. */
export type BoxPlotStats = {
    group: string;
    min: number;
    firstQuartile: number;
    median: number;
    thirdQuartile: number;
    max: number;
    outliers: number[];
    /** VX6: el promedio y la muesca de la mediana. */
    mean?: number;
    notchLow?: number;
    notchHigh?: number;
};
export interface BoxPlotInnerProps extends BaseChartProps, ChartEventProps<BoxPlotStats> {
    width: number;
    height: number;
    data: BoxPlotData;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showOutliers?: boolean;
    boxWidth?: number;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
    /** VX6 (lo que trae matplotlib en boxplot): orientación, bigotes, promedio, muesca, topes, mediana, atípicos. */
    boxOrientation?: 'vertical' | 'horizontal';
    boxWhisker?: 'iqr15' | 'iqr3' | 'minmax' | 'p5_95' | 'p1_99' | 'p10_90';
    boxShowMeans?: 'none' | 'point' | 'line';
    boxMeanColor?: string;
    boxNotch?: boolean;
    boxShowCaps?: boolean;
    boxCapWidth?: number;
    boxMedianColor?: string;
    boxMedianWidth?: number;
    boxFlierShape?: 'circle' | 'x' | 'diamond' | 'square';
    boxFlierColor?: string;
    boxWhiskerStyle?: 'solid' | 'dashed' | 'dotted';
}
export type BoxPlotProps = Omit<BoxPlotInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BoxPlot.types.d.ts.map
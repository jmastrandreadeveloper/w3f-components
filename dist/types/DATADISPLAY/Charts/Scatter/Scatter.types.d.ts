import type { BaseChartProps, ChartEventProps, ChartMargin, DatumXY } from '../_base/types';
export type ScatterDatum = DatumXY;
export type ScatterData = readonly ScatterDatum[];
export interface ScatterInnerProps extends BaseChartProps, ChartEventProps<ScatterDatum> {
    width: number;
    height: number;
    data: ScatterData;
    getX?: (d: ScatterDatum) => number;
    getY?: (d: ScatterDatum) => number;
    getR?: (d: ScatterDatum) => number;
    getLabel?: (d: ScatterDatum) => string;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    pointRadius?: number;
    xDomain?: [number, number];
    yDomain?: [number, number];
    formatX?: (n: number) => string;
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
}
export type ScatterProps = Omit<ScatterInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Scatter.types.d.ts.map
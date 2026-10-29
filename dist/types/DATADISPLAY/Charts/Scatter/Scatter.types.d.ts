import type { ChartPointShapeName } from '../primitives/ChartPointShape';
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
    /** 0022 B53.3: forma de los puntos. Default 'circle'. */
    pointShape?: ChartPointShapeName;
    /** 0022 B53.3: opacidad de los puntos (0 a 1). Default 0.8. */
    pointOpacity?: number;
    /** 0022 B53.3: borde de los puntos (un color CSS; vacío = sin borde). */
    pointStroke?: string;
    /** 0022 B53.3: recta de tendencia (mínimos cuadrados) con su ecuación y R². Default false. */
    trendLine?: boolean;
    /** VX9 (matplotlib hexbin): group the points in hexagons, colored by how many fall in each. Default false. */
    hexbin?: boolean;
    /** VX9: radius of the hexagons, px. Default 14. */
    hexSize?: number;
}
export type ScatterProps = Omit<ScatterInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Scatter.types.d.ts.map
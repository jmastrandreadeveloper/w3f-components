import type { BaseChartProps, ChartEventProps, ChartMargin, DatumTime } from '../_base/types';
export type AreaDatum = DatumTime;
export type AreaData = readonly AreaDatum[];
export interface AreaInnerProps extends BaseChartProps, ChartEventProps<AreaDatum> {
    width: number;
    height: number;
    data: AreaData;
    getDate?: (d: AreaDatum) => Date | number | string;
    getValue?: (d: AreaDatum) => number;
    curved?: boolean;
    /** Fill opacity 0..1. Defaults to 0.3. */
    fillOpacity?: number;
    /** Show line stroke on top of area. Defaults to true. */
    showLine?: boolean;
    strokeWidth?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    /** Rotate X axis tick labels by N degrees. Use -45 or -90 for dense axes. */
    tickRotateX?: number;
    /** Índice del dato a resaltar externamente (ej. fila seleccionada en una tabla). */
    highlightIndex?: number | null;
    margin?: ChartMargin;
}
export type AreaProps = Omit<AreaInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Area.types.d.ts.map
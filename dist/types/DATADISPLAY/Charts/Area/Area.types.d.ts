import type { BaseChartProps, ChartEventProps, ChartMargin, DatumTime } from '../_base/types';
import type { ChartDateFormat, ChartLineStyle, ChartValueLabels } from '../primitives/ChartLineMarks';
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
    /** VX9 (matplotlib fill_between where): 'above' / 'below' = fill only between the line and `areaWhereValue`, on that side. */
    areaWhere?: 'all' | 'above' | 'below';
    /** VX9: the value the fill is measured from (a goal, a threshold). */
    areaWhereValue?: number;
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
    /** 0022 B53.1: cómo se dibuja la línea: continua, a rayas o de puntos. Default 'solid'. */
    lineStyle?: ChartLineStyle;
    /** 0022 B53.1: rótulos con el valor encima de los puntos: ninguno, todos, el último o el mínimo y el máximo. Default 'none'. */
    valueLabels?: ChartValueLabels;
    /** 0022 B53.1: tamaño de la letra de esos rótulos (px). Default 11. */
    valueLabelSize?: number;
    /** 0022 B53.1: cómo se escriben las fechas del eje X ('auto' = las de siempre). */
    xDateFormat?: ChartDateFormat;
}
export type AreaProps = Omit<AreaInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Area.types.d.ts.map
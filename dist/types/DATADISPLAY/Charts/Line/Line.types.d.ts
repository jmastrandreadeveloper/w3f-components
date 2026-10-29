import type { ChartPointShapeName } from '../primitives/ChartPointShape';
import type { BaseChartProps, ChartEventProps, ChartMargin, DatumTime } from '../_base/types';
import type { ChartDateFormat, ChartLineStyle, ChartValueLabels } from '../primitives/ChartLineMarks';
export type LineDatum = DatumTime;
export type LineData = readonly LineDatum[];
export interface LineInnerProps extends BaseChartProps, ChartEventProps<LineDatum> {
    width: number;
    height: number;
    data: LineData;
    getDate?: (d: LineDatum) => Date | number | string;
    getValue?: (d: LineDatum) => number;
    /** Use curved interpolation (monotoneX). Defaults to true. */
    curved?: boolean;
    /** Show dots at each data point. Defaults to false. */
    showDots?: boolean;
    /** Line stroke width in px. Defaults to 2. */
    strokeWidth?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightIndex?: number | null;
    /** 0022 B53.1: cómo se dibuja la línea: continua, a rayas o de puntos. Default 'solid'. */
    lineStyle?: ChartLineStyle;
    /** 0022 B53.1: tamaño (radio, px) de los puntos de showDots. Default 3. */
    dotRadius?: number;
    /** 0022 B53.1: rótulos con el valor encima de los puntos: ninguno, todos, el último o el mínimo y el máximo. Default 'none'. */
    valueLabels?: ChartValueLabels;
    /** 0022 B53.1: tamaño de la letra de esos rótulos (px). Default 11. */
    valueLabelSize?: number;
    /** 0022 B53.1: cómo se escriben las fechas del eje X ('auto' = las de siempre). */
    xDateFormat?: ChartDateFormat;
    /** 0026 X8: forma de los puntos. Default 'circle'. */
    pointShape?: ChartPointShapeName;
}
export type LineProps = Omit<LineInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Line.types.d.ts.map
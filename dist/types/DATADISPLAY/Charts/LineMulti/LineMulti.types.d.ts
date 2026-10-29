import type { ChartPointShapeName } from '../primitives/ChartPointShape';
import type { BaseChartProps, ChartMargin, MultiSeriesTime } from '../_base/types';
import type { ChartDateFormat, ChartLineStyle, ChartValueLabels } from '../primitives/ChartLineMarks';
import type { SeriesSelect } from '../_base/seriesClick';
export type LineMultiDatum = MultiSeriesTime;
export type LineMultiData = readonly LineMultiDatum[];
export interface LineMultiInnerProps extends BaseChartProps {
    width: number;
    height: number;
    data: LineMultiData;
    curved?: boolean;
    /** VX9 (matplotlib twinx): the id of a series drawn with its own Y scale, on an axis at the right. */
    twinSeries?: string;
    showDots?: boolean;
    strokeWidth?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    highlightSeriesId?: string | null;
    onHover?: (seriesId: string | null, index: number | null) => void;
    /** Click on a series (drill-down): the series and the nearest point (0022 M4-drill2). */
    onSelect?: (datum: SeriesSelect, index: number) => void;
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
export type LineMultiProps = Omit<LineMultiInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=LineMulti.types.d.ts.map
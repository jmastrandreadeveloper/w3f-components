import type { BaseChartProps, ChartMargin } from '../_base/types';
import type { ChartDateFormat, ChartLineStyle } from '../primitives/ChartLineMarks';
/** Each datum has a date and two values to compare. */
export type ThresholdDatum = {
    date: Date | number | string;
    value0: number;
    value1: number;
};
export type ThresholdData = readonly ThresholdDatum[];
export interface ThresholdInnerProps extends BaseChartProps {
    width: number;
    height: number;
    data: ThresholdData;
    getDate?: (d: ThresholdDatum) => Date | number | string;
    getValue0?: (d: ThresholdDatum) => number;
    getValue1?: (d: ThresholdDatum) => number;
    /** Label for the first series (value0). Used in legend. */
    label0?: string;
    /** Label for the second series (value1). Used in legend. */
    label1?: string;
    /** Color for areas where value0 > value1. Defaults to chart scheme[0]. */
    aboveColor?: string;
    /** Color for areas where value1 > value0. Defaults to chart scheme[1]. */
    belowColor?: string;
    /** Area fill opacity. Defaults to 0.4. */
    fillOpacity?: number;
    curved?: boolean;
    strokeWidth?: number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    margin?: ChartMargin;
    onHover?: (datum: ThresholdDatum | null, index: number | null) => void;
    /** Click on a point (drill-down, 0022 M4-drill2). */
    onSelect?: (datum: ThresholdDatum, index: number) => void;
    highlightIndex?: number | null;
    /** 0022 B53.1: cómo se dibuja la línea: continua, a rayas o de puntos. Default 'solid'. */
    lineStyle?: ChartLineStyle;
    /** 0022 B53.1: cómo se escriben las fechas del eje X ('auto' = las de siempre). */
    xDateFormat?: ChartDateFormat;
}
export type ThresholdProps = Omit<ThresholdInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Threshold.types.d.ts.map
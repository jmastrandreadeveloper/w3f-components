import type { BaseChartProps, ChartEventProps } from '../_base/types';
import type { ChartLineStyle } from '../primitives/ChartLineMarks';
/** Sparkline supports simple numeric arrays. */
export type SparklineDatum = number;
export type SparklineData = readonly SparklineDatum[];
export interface SparklineInnerProps extends BaseChartProps, ChartEventProps<SparklineDatum> {
    width: number;
    height: number;
    data: SparklineData;
    /** Line/area color. */
    color?: string;
    /** Show filled area under the line. */
    showArea?: boolean;
    /** Show a dot on the last data point. */
    showEndDot?: boolean;
    /** Show min/max reference dots. */
    showMinMax?: boolean;
    /** Stroke width of the line. */
    strokeWidth?: number;
    /** Curve type. */
    curve?: 'linear' | 'monotone' | 'natural';
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    highlightIndex?: number | null;
    /** 0022 B53.1: cómo se dibuja la línea: continua, a rayas o de puntos. Default 'solid'. */
    lineStyle?: ChartLineStyle;
}
export type SparklineProps = Omit<SparklineInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Sparkline.types.d.ts.map
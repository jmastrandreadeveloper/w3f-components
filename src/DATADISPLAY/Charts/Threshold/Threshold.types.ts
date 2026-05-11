import type { BaseChartProps, ChartMargin } from '../_base/types';

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
    highlightIndex?: number | null;
}

export type ThresholdProps = Omit<ThresholdInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

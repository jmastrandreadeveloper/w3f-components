import type { BaseChartProps, ChartEventProps } from '../_base/types';

/** Bullet chart datum — Stephen Few metric with qualitative ranges and target marker. */
export type BulletDatum = {
    label: string;
    /** The actual measured value. */
    value: number;
    /** Target/goal marker. */
    target?: number;
    /** Qualitative range thresholds (e.g. [poor, satisfactory, good]). Ascending order. */
    ranges: readonly number[];
};

export type BulletData = readonly BulletDatum[];

export interface BulletInnerProps extends BaseChartProps, ChartEventProps<BulletDatum> {
    width: number;
    height: number;
    data: BulletData;
    /** Show labels on the left. */
    showLabels?: boolean;
    /** Show value labels on the bar. */
    showValues?: boolean;
    /** Show tooltip on hover. */
    showTooltip?: boolean;
    /** Range colors (from darkest to lightest). */
    rangeColors?: readonly string[];
    /** Actual value bar color. */
    valueColor?: string;
    /** Target marker color. */
    targetColor?: string;
    /** Bar height for each bullet row in px. */
    barHeight?: number;
    /** Gap between rows in px. */
    rowGap?: number;
    /** Externally highlight a specific bullet row by index. */
    highlightIndex?: number | null;
}

export type BulletProps = Omit<BulletInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

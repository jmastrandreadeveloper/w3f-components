import type { BaseChartProps } from '../_base/types';

export type GaugeThreshold = { value: number; color: string; label?: string };

export interface GaugeInnerProps extends BaseChartProps {
    width: number;
    height: number;
    /** Current value. */
    value: number;
    /** Min domain value. Default: 0 */
    min?: number;
    /** Max domain value. Default: 100 */
    max?: number;
    /** Color for the filled arc. Default: primary from palette. */
    color?: string;
    /** Color thresholds — value → color. */
    thresholds?: GaugeThreshold[];
    /** Show value label. Default: true */
    showValue?: boolean;
    /** Show min/max labels. Default: true */
    showMinMax?: boolean;
    /** Format the displayed value. Default: `(v) => v.toFixed(0)` */
    formatValue?: (v: number) => string;
    /** External highlight index — when set with thresholds, the matching segment gets full opacity + white stroke, others dim to 0.3. */
    highlightIndex?: number | null;
}

export type GaugeProps = Omit<GaugeInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};

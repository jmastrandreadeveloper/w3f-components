import type { BaseChartProps, ChartEventProps } from '../_base/types';
export type GaugeThreshold = {
    value: number;
    color: string;
    label?: string;
};
/** Lo que avisa el clic (0022 P104: drill-down del velocímetro): el número que muestra. */
export type GaugeSelection = {
    value: number;
    target?: number;
};
export interface GaugeInnerProps extends BaseChartProps, ChartEventProps<GaugeSelection> {
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
    /** Value already formatted for the label (e.g. «17.910»); wins over `formatValue`. */
    valueText?: string;
    /** Target: a mark across the arc at this value. */
    target?: number;
    /** Line under the value about the target (e.g. «93,3 % del objetivo (19.190)»). */
    targetText?: string;
    /** External highlight index — when set with thresholds, the matching segment gets full opacity + white stroke, others dim to 0.3. */
    highlightIndex?: number | null;
}
export type GaugeProps = Omit<GaugeInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Gauge.types.d.ts.map
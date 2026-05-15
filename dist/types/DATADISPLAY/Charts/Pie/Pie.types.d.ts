import type { BaseChartProps, ChartEventProps, DatumSlice } from '../_base/types';
export type PieDatum = DatumSlice;
export type PieData = readonly PieDatum[];
export interface PieInnerProps extends BaseChartProps, ChartEventProps<PieDatum> {
    width: number;
    height: number;
    data: PieData;
    getValue?: (d: PieDatum) => number;
    getLabel?: (d: PieDatum) => string;
    /** Inner radius ratio (0 = full pie, 0.5 = donut). Default: 0 */
    innerRadius?: number;
    /** Gap between slices in radians. Default: 0.02 */
    padAngle?: number;
    /** Corner radius for slices. Default: 0 */
    cornerRadius?: number;
    showLabels?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    /** External highlight index — when set, the matching slice gets full opacity + white stroke, others dim to 0.3. */
    highlightIndex?: number | null;
}
export type PieProps = Omit<PieInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Pie.types.d.ts.map
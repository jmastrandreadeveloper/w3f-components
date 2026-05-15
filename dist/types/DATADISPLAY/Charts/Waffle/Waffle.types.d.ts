import type { BaseChartProps, ChartEventProps, DatumSlice } from '../_base/types';
export type WaffleDatum = DatumSlice;
export type WaffleData = readonly WaffleDatum[];
export interface WaffleInnerProps extends BaseChartProps, ChartEventProps<WaffleDatum> {
    width: number;
    height: number;
    data: WaffleData;
    showTooltip?: boolean;
    showLegend?: boolean;
    /** Total number of cells in the grid. Default: 100 */
    totalCells?: number;
    /** Number of columns. Default: 10 */
    columns?: number;
    /** Gap between cells in px. Default: 2 */
    cellGap?: number;
    /** Corner radius on cells. Default: 2 */
    cellRadius?: number;
}
export type WaffleProps = Omit<WaffleInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Waffle.types.d.ts.map
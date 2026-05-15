import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGroup } from '../_base/types';
export type BarGroupedDatum = DatumGroup;
export type BarGroupedData = readonly BarGroupedDatum[];
export interface BarGroupedInnerProps extends BaseChartProps, ChartEventProps<BarGroupedDatum> {
    width: number;
    height: number;
    data: BarGroupedData;
    /** Which numeric keys of each datum to plot as bars. */
    keys: readonly string[];
    getLabel?: (d: BarGroupedDatum) => string | number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    padding?: number;
    barRadius?: number;
    yDomain?: [number, number];
    formatY?: (n: number) => string;
    /** Index of the group to highlight externally (e.g. selected table row). */
    highlightIndex?: number | null;
    /** Key of the specific sub-bar to highlight within the group. If null, highlights entire group. */
    highlightKey?: string | null;
    margin?: ChartMargin;
}
export type BarGroupedProps = Omit<BarGroupedInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BarGrouped.types.d.ts.map
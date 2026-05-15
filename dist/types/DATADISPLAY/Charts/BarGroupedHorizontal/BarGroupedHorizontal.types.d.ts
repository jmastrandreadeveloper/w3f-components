import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGroup } from '../_base/types';
export type BarGroupedHDatum = DatumGroup;
export type BarGroupedHData = readonly BarGroupedHDatum[];
export interface BarGroupedHInnerProps extends BaseChartProps, ChartEventProps<BarGroupedHDatum> {
    width: number;
    height: number;
    data: BarGroupedHData;
    keys: readonly string[];
    getLabel?: (d: BarGroupedHDatum) => string | number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    padding?: number;
    barRadius?: number;
    xDomain?: [number, number];
    formatX?: (n: number) => string;
    /** Index of the group to highlight externally. */
    highlightIndex?: number | null;
    /** Key of the specific sub-bar to highlight within the group. */
    highlightKey?: string | null;
    margin?: ChartMargin;
}
export type BarGroupedHProps = Omit<BarGroupedHInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BarGroupedHorizontal.types.d.ts.map
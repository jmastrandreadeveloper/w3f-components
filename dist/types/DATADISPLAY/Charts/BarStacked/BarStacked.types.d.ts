import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGroup } from '../_base/types';
export type BarStackedDatum = DatumGroup;
export type BarStackedData = readonly BarStackedDatum[];
export interface BarStackedInnerProps extends BaseChartProps, ChartEventProps<BarStackedDatum> {
    width: number;
    height: number;
    data: BarStackedData;
    keys: readonly string[];
    getLabel?: (d: BarStackedDatum) => string | number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    padding?: number;
    barRadius?: number;
    formatY?: (n: number) => string;
    /** Index of the group to highlight externally. */
    highlightIndex?: number | null;
    /** Key of the specific stacked segment to highlight. If null, highlights entire group. */
    highlightKey?: string | null;
    margin?: ChartMargin;
    /** Font size for axis tick labels in px. Defaults to 11. */
    axisFontSize?: number;
}
export type BarStackedProps = Omit<BarStackedInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BarStacked.types.d.ts.map
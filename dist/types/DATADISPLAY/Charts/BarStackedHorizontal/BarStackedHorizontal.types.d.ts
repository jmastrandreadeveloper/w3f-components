import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGroup } from '../_base/types';
export type BarStackedHDatum = DatumGroup;
export type BarStackedHData = readonly BarStackedHDatum[];
export interface BarStackedHInnerProps extends BaseChartProps, ChartEventProps<BarStackedHDatum> {
    width: number;
    height: number;
    data: BarStackedHData;
    keys: readonly string[];
    getLabel?: (d: BarStackedHDatum) => string | number;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    padding?: number;
    barRadius?: number;
    formatX?: (n: number) => string;
    /** Index of the group to highlight externally. */
    highlightIndex?: number | null;
    /** Key of the specific stacked segment to highlight. If null, highlights entire group. */
    highlightKey?: string | null;
    margin?: ChartMargin;
}
export type BarStackedHProps = Omit<BarStackedHInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BarStackedHorizontal.types.d.ts.map
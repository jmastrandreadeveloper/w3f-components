import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGroup } from '../_base/types';
export type BarGroupedDatum = DatumGroup;
export type BarGroupedData = readonly BarGroupedDatum[];
export interface BarGroupedInnerProps extends BaseChartProps, Omit<ChartEventProps<BarGroupedDatum>, 'onSelect'> {
    /** Clic en un segmento: el grupo, su índice y la serie (key) clickeada (0022 M4: drill-down). */
    onSelect?: (datum: BarGroupedDatum, index: number, key?: string) => void;
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
    /** Font size for axis tick labels in px. Defaults to 11. */
    axisFontSize?: number;
}
export type BarGroupedProps = Omit<BarGroupedInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BarGrouped.types.d.ts.map
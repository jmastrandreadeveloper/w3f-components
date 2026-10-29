import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGroup } from '../_base/types';
export type BarGroupedHDatum = DatumGroup;
export type BarGroupedHData = readonly BarGroupedHDatum[];
export interface BarGroupedHInnerProps extends BaseChartProps, Omit<ChartEventProps<BarGroupedHDatum>, 'onSelect'> {
    /** Clic en un segmento: el grupo, su índice y la serie (key) clickeada (0022 M4: drill-down). */
    onSelect?: (datum: BarGroupedHDatum, index: number, key?: string) => void;
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
    /** Font size for axis tick labels in px. Defaults to 11. */
    axisFontSize?: number;
}
export type BarGroupedHProps = Omit<BarGroupedHInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BarGroupedHorizontal.types.d.ts.map
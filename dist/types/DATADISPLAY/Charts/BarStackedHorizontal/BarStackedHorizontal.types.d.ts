import type { ChartBarExtrasProps } from '../primitives/ChartSegmentLabel';
import type { BaseChartProps, ChartEventProps, ChartMargin, DatumGroup } from '../_base/types';
export type BarStackedHDatum = DatumGroup;
export type BarStackedHData = readonly BarStackedHDatum[];
export interface BarStackedHInnerProps extends BaseChartProps, ChartBarExtrasProps, Omit<ChartEventProps<BarStackedHDatum>, 'onSelect'> {
    /** Clic en un segmento: el grupo, su índice y la serie (key) clickeada (0022 M4: drill-down). */
    onSelect?: (datum: BarStackedHDatum, index: number, key?: string) => void;
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
    /** Font size for axis tick labels in px. Defaults to 11. */
    axisFontSize?: number;
}
export type BarStackedHProps = Omit<BarStackedHInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=BarStackedHorizontal.types.d.ts.map
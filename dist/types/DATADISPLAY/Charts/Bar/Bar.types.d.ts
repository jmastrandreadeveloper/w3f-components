import type { BaseChartProps, ChartEventProps, ChartMargin, Datum1D } from '../_base/types';
export type BarDatum = Datum1D;
export type BarData = readonly BarDatum[];
/**
 * Props for `BarInner` — requires explicit width/height.
 * This is the low-level component rendered inside the SVG.
 */
export interface BarInnerProps extends BaseChartProps, ChartEventProps<BarDatum> {
    /** Fixed width in px (required — no responsive wrapper). */
    width: number;
    /** Fixed height in px (required). */
    height: number;
    /** Bar data. Each datum has a `label` and `value`. */
    data: BarData;
    /** Custom accessor for the label. Defaults to `d => d.label`. */
    getLabel?: (d: BarDatum) => string | number;
    /** Custom accessor for the value. Defaults to `d => d.value`. */
    getValue?: (d: BarDatum) => number;
    /** Show bottom axis. Defaults to `true`. */
    showXAxis?: boolean;
    /** Show left axis. Defaults to `true`. */
    showYAxis?: boolean;
    /** Show horizontal grid lines. Defaults to `true`. */
    showGrid?: boolean;
    /** Show tooltip on hover. Defaults to `true`. */
    showTooltip?: boolean;
    /** Band scale inner padding (0..1). Defaults to 0.2. */
    padding?: number;
    /** Rounded corners for bars in px. Defaults to 2. */
    barRadius?: number;
    /** Override the Y domain [min, max]. */
    yDomain?: [number, number];
    /** Custom Y-axis tick formatter. */
    formatY?: (n: number) => string;
    /** Índice del dato a resaltar externamente (ej. fila seleccionada en tabla). */
    highlightIndex?: number | null;
    /** Chart internal margins. */
    margin?: ChartMargin;
    /** Show color legend below the chart. Defaults to `false`. */
    showLegend?: boolean;
    /** Show value labels on bars. 'number' = raw value, 'percent' = % of total. Defaults to 'none'. */
    barLabels?: 'none' | 'number' | 'percent';
    /** Font size for bar category labels (below bars) in px. Defaults to 10. */
    categoryLabelSize?: number;
    /** Font size for bar value labels (on bars) in px. Defaults to 10. */
    valueLabelSize?: number;
    /** Font size for axis tick labels in px. Defaults to 11. */
    axisFontSize?: number;
}
/**
 * Props for `Bar` — the responsive wrapper.
 * Width/height become optional; if omitted the chart fills its parent.
 */
export type BarProps = Omit<BarInnerProps, 'width' | 'height'> & {
    /** Explicit width in px. If omitted, uses container width. */
    width?: number;
    /** Explicit height in px. If omitted, defaults to 300. */
    height?: number;
};
//# sourceMappingURL=Bar.types.d.ts.map
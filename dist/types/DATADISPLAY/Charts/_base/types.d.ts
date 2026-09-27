/**
 * W3F Charts — Base types (Oleada 0)
 *
 * This file defines the canonical data shapes and the `BaseChartProps`
 * contract that every chart component in `DATADISPLAY/Charts/` extends.
 *
 * Contract: all 38 explicit charts + 7 XY recipes accept strict, typed
 * `data`. No `any`, no `unknown` leaking into props. Accessors are
 * optional and default to reading the canonical key of each shape.
 */
import type React from 'react';
export type ChartMargin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export type ColorSchemeName = 'categorical-10' | 'sequential-blue' | 'sequential-green' | 'diverging-rdbu' | 'mono-primary' | 'w3f-brand';
/**
 * Props shared by every chart. Concrete charts extend this with their
 * own `data` shape and chart-specific visual props.
 */
export interface BaseChartProps {
    /** Explicit width in px. If omitted, the responsive wrapper fills the parent. */
    width?: number;
    /** Explicit height in px. Defaults to `DEFAULT_CHART_HEIGHT` (300). */
    height?: number;
    /** Internal margins of the SVG plot area. */
    margin?: ChartMargin;
    /** Extra class applied to the root wrapper. */
    className?: string;
    /** Strip all W3F visual styles for trait composition / unstyled mode. */
    unstyled?: boolean;
    /** Bridge / Data-Binding id (see `@w3f/bridge`). */
    bindId?: string;
    /** Accessible label for the SVG root (`aria-label`). */
    ariaLabel?: string;
    /** Accessible description (`<desc>` element). */
    description?: string;
    /** Color scheme name or explicit palette. */
    colorScheme?: ColorSchemeName | readonly string[];
    /** Chart title rendered above the chart. */
    title?: string;
    /** Subtitle rendered below the title. */
    subtitle?: string;
    /** Title font size in px. */
    titleSize?: number;
    /** Title text color. */
    titleColor?: string;
    /** Subtitle font size in px. */
    subtitleSize?: number;
    /** Subtitle text color. */
    subtitleColor?: string;
    /** Title text alignment. */
    titleAlign?: 'left' | 'center' | 'right';
    /** Subtitle text alignment. */
    subtitleAlign?: 'left' | 'center' | 'right';
    /** Title bold. */
    titleBold?: boolean;
    /** Title italic. */
    titleItalic?: boolean;
    /** Title underline. */
    titleUnderline?: boolean;
    /** Subtitle bold. */
    subtitleBold?: boolean;
    /** Subtitle italic. */
    subtitleItalic?: boolean;
    /** Subtitle underline. */
    subtitleUnderline?: boolean;
}
/**
 * Event callbacks that most charts support. Concrete charts narrow the
 * generic `T` to their own datum type.
 */
export interface ChartEventProps<T> {
    onHover?: (datum: T | null, index: number | null) => void;
    onSelect?: (datum: T, index: number) => void;
}
/** 1D categorical — Bar, Line (simple), Radial */
export type Datum1D = {
    label: string | number;
    value: number;
};
/** Time series — Line, Area, Threshold */
export type DatumTime = {
    date: Date | number | string;
    value: number;
};
/** Multi-series time — LineMulti, AreaStacked, Streamgraph */
export type MultiSeriesTime = {
    id: string;
    label?: string;
    data: readonly DatumTime[];
};
/** 2D — Scatter, Bubble, DotPlot, Voronoi */
export type DatumXY = {
    x: number;
    y: number;
    /** Optional radius for bubble charts. */
    r?: number;
    /** Optional label for tooltips / glyph text. */
    label?: string;
};
/**
 * Grouped bars / radar.
 * Each row has a canonical `label` and N numeric fields (the series).
 * Concrete charts also require a `keys: string[]` prop listing which
 * fields to plot.
 */
export type DatumGroup = {
    label: string | number;
    [series: string]: string | number;
};
/** Part-of-whole — Pie, Donut */
export type DatumSlice = {
    id: string;
    label: string;
    value: number;
    color?: string;
};
/** Matrix — Heatmap */
export type DatumMatrix = {
    row: string | number;
    col: string | number;
    value: number;
};
/** Hierarchy — Treemap, Pack, Tree, Dendrogram */
export interface DatumHierarchy {
    id: string;
    label?: string;
    value?: number;
    children?: readonly DatumHierarchy[];
}
/** Graph — Network, Sankey */
export type DatumGraph = {
    nodes: readonly {
        id: string;
        label?: string;
        group?: string;
    }[];
    links: readonly {
        source: string;
        target: string;
        value?: number;
    }[];
};
/** Geo feature — Geo* */
export interface DatumGeoFeature {
    id: string;
    properties: Record<string, unknown>;
    geometry: unknown;
    value?: number;
}
export type InnerDims = {
    width: number;
    height: number;
    innerWidth: number;
    innerHeight: number;
    margin: ChartMargin;
};
/**
 * Root wrapper props — the DOM node that wraps the SVG. Kept narrow to
 * avoid leaking every HTML attribute into chart APIs.
 */
export type ChartRootProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'id' | 'role' | 'style' | 'tabIndex'>;
//# sourceMappingURL=types.d.ts.map
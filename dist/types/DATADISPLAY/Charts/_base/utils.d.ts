import type { ChartMargin, ColorSchemeName, InnerDims } from './types';
/**
 * Build the class string for the root wrapper of any chart.
 * Supports a chart-specific BEM root (e.g. `w3f-chart-bar`) plus the
 * global `w3f-chart` base class and the `--unstyled` modifier.
 */
export declare function buildChartRootClasses(chartRoot: string, className: string | undefined, unstyled: boolean | undefined): string;
/**
 * Compute `InnerDims` from outer width/height and a margin.
 * Clamps to 0 to avoid negative inner areas on very small containers.
 */
export declare function computeInnerDims(width: number, height: number, margin?: ChartMargin): InnerDims;
/**
 * Resolve a color scheme prop (name or explicit palette) to a concrete
 * ordered list of colors. Falls back to `categorical-10`.
 */
export declare function resolveColorScheme(scheme: ColorSchemeName | readonly string[] | undefined): readonly string[];
/**
 * Build a `scaleBand` for categorical axes.
 */
export declare function buildBandScale<T extends string | number>(domain: readonly T[], range: [number, number], padding?: number): import("d3-scale").ScaleBand<T>;
/**
 * Build a linear scale with optional padding applied to the domain
 * (so bars/dots do not touch the top edge).
 */
export declare function buildLinearScale(domainMin: number, domainMax: number, range: [number, number], opts?: {
    nice?: boolean;
    padding?: number;
}): import("d3-scale").ScaleLinear<number, number, never>;
/**
 * Build an ordinal color scale from a resolved palette.
 */
export declare function buildColorScale<T extends string>(domain: readonly T[], palette: readonly string[]): import("d3-scale").ScaleOrdinal<T, string, never>;
/**
 * Format a tick value. Handles Dates (short locale), numbers (k/M), strings.
 */
export declare function formatTick(value: unknown): string;
/**
 * Returns a safe `[min, max]` range from a numeric series. If the array
 * is empty or all zero, returns `[0, 1]` to avoid divide-by-zero.
 */
export declare function safeExtent(values: readonly number[]): [number, number];
/**
 * Clamp a number to `[min, max]`.
 */
export declare function clamp(n: number, min: number, max: number): number;
//# sourceMappingURL=utils.d.ts.map
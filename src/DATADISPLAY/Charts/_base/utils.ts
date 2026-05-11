import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import type { ChartMargin, ColorSchemeName, InnerDims } from './types';
import {
    BASE_CHART_CLASSES,
    DEFAULT_BAND_PADDING,
    DEFAULT_CHART_MARGIN,
    DOMAIN_PADDING_RATIO,
} from './constants';
import { getColorScheme } from '../_theme/colorSchemes';

/**
 * Build the class string for the root wrapper of any chart.
 * Supports a chart-specific BEM root (e.g. `w3f-chart-bar`) plus the
 * global `w3f-chart` base class and the `--unstyled` modifier.
 */
export function buildChartRootClasses(
    chartRoot: string,
    className: string | undefined,
    unstyled: boolean | undefined,
): string {
    const parts: string[] = [BASE_CHART_CLASSES.root, chartRoot];
    if (unstyled) {
        parts.push(`${BASE_CHART_CLASSES.root}--unstyled`);
        parts.push(`${chartRoot}--unstyled`);
    }
    if (className) parts.push(className);
    return parts.join(' ');
}

/**
 * Compute `InnerDims` from outer width/height and a margin.
 * Clamps to 0 to avoid negative inner areas on very small containers.
 */
export function computeInnerDims(
    width: number,
    height: number,
    margin: ChartMargin = DEFAULT_CHART_MARGIN,
): InnerDims {
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    return { width, height, innerWidth, innerHeight, margin };
}

/**
 * Resolve a color scheme prop (name or explicit palette) to a concrete
 * ordered list of colors. Falls back to `categorical-10`.
 */
export function resolveColorScheme(
    scheme: ColorSchemeName | readonly string[] | undefined,
): readonly string[] {
    if (!scheme) return getColorScheme('categorical-10');
    if (Array.isArray(scheme)) return scheme;
    return getColorScheme(scheme as ColorSchemeName);
}

/**
 * Build a `scaleBand` for categorical axes.
 */
export function buildBandScale<T extends string | number>(
    domain: readonly T[],
    range: [number, number],
    padding = DEFAULT_BAND_PADDING,
) {
    return scaleBand<T>({
        domain: [...domain],
        range,
        padding,
    });
}

/**
 * Build a linear scale with optional padding applied to the domain
 * (so bars/dots do not touch the top edge).
 */
export function buildLinearScale(
    domainMin: number,
    domainMax: number,
    range: [number, number],
    opts: { nice?: boolean; padding?: number } = {},
) {
    const { nice = true, padding = DOMAIN_PADDING_RATIO } = opts;
    const span = domainMax - domainMin;
    const paddedMax = domainMax + span * padding;
    const paddedMin = domainMin < 0 ? domainMin - span * padding : domainMin;
    return scaleLinear<number>({
        domain: [paddedMin, paddedMax],
        range,
        nice,
    });
}

/**
 * Build an ordinal color scale from a resolved palette.
 */
export function buildColorScale<T extends string>(
    domain: readonly T[],
    palette: readonly string[],
) {
    return scaleOrdinal<T, string>({
        domain: [...domain],
        range: [...palette],
    });
}

/**
 * Format a tick value. Handles Dates (short locale), numbers (k/M), strings.
 */
export function formatTick(value: unknown): string {
    if (value instanceof Date) {
        return value.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
    }
    if (typeof value === 'number') {
        // Heuristic: unix-ms timestamps are > 1e11 (~year 1973+)
        if (value > 1e11) {
            return new Date(value).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
        }
        const abs = Math.abs(value);
        if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
        if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
        return Number.isInteger(value) ? String(value) : value.toFixed(2);
    }
    return String(value ?? '');
}

/**
 * Returns a safe `[min, max]` range from a numeric series. If the array
 * is empty or all zero, returns `[0, 1]` to avoid divide-by-zero.
 */
export function safeExtent(values: readonly number[]): [number, number] {
    if (values.length === 0) return [0, 1];
    let min = values[0];
    let max = values[0];
    for (let i = 1; i < values.length; i++) {
        const v = values[i];
        if (v < min) min = v;
        if (v > max) max = v;
    }
    if (min === max) {
        if (min === 0) return [0, 1];
        return [Math.min(0, min), max * 1.1];
    }
    return [Math.min(0, min), max];
}

/**
 * Clamp a number to `[min, max]`.
 */
export function clamp(n: number, min: number, max: number): number {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

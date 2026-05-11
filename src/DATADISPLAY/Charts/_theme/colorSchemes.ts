import type { ColorSchemeName } from '../_base/types';

/**
 * W3F chart color schemes.
 *
 * These are the canonical ordered palettes that every chart falls back
 * to when no explicit `colorScheme` or palette is passed. The scheme
 * names are referenced via the `ColorSchemeName` union.
 *
 * Design intent:
 * - `categorical-10` is the workhorse palette for multi-series (bars,
 *   lines, pies). Distinct hues with similar perceived lightness.
 * - `sequential-*` are single-hue ramps for heatmaps and choropleths.
 * - `diverging-rdbu` is for charts that need to show deviation from a
 *   midpoint (positive vs negative).
 * - `mono-primary` uses only `--w3f-primary` with alpha variants.
 * - `w3f-brand` is the signature 6-color brand palette for marketing
 *   demos.
 */
export const COLOR_SCHEMES: Record<ColorSchemeName, readonly string[]> = {
    'categorical-10': [
        '#6366f1', // indigo
        '#f59e0b', // amber
        '#10b981', // emerald
        '#ef4444', // red
        '#8b5cf6', // violet
        '#06b6d4', // cyan
        '#f97316', // orange
        '#ec4899', // pink
        '#14b8a6', // teal
        '#a855f7', // purple
    ],
    'sequential-blue': [
        '#eff6ff',
        '#dbeafe',
        '#bfdbfe',
        '#93c5fd',
        '#60a5fa',
        '#3b82f6',
        '#2563eb',
        '#1d4ed8',
        '#1e40af',
        '#1e3a8a',
    ],
    'sequential-green': [
        '#f0fdf4',
        '#dcfce7',
        '#bbf7d0',
        '#86efac',
        '#4ade80',
        '#22c55e',
        '#16a34a',
        '#15803d',
        '#166534',
        '#14532d',
    ],
    'diverging-rdbu': [
        '#b2182b',
        '#d6604d',
        '#f4a582',
        '#fddbc7',
        '#f7f7f7',
        '#d1e5f0',
        '#92c5de',
        '#4393c3',
        '#2166ac',
    ],
    'mono-primary': [
        'rgba(99, 102, 241, 1.00)',
        'rgba(99, 102, 241, 0.85)',
        'rgba(99, 102, 241, 0.70)',
        'rgba(99, 102, 241, 0.55)',
        'rgba(99, 102, 241, 0.40)',
        'rgba(99, 102, 241, 0.25)',
    ],
    'w3f-brand': [
        '#6366f1',
        '#10b981',
        '#f59e0b',
        '#ec4899',
        '#06b6d4',
        '#8b5cf6',
    ],
};

export function getColorScheme(name: ColorSchemeName): readonly string[] {
    return COLOR_SCHEMES[name] ?? COLOR_SCHEMES['categorical-10'];
}

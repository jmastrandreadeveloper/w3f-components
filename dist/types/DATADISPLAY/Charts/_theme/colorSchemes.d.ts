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
export declare const COLOR_SCHEMES: Record<ColorSchemeName, readonly string[]>;
export declare function getColorScheme(name: ColorSchemeName): readonly string[];
//# sourceMappingURL=colorSchemes.d.ts.map
import type { GeoFeatureDatum } from './Geo.types';
import { GEO_ROOT_CLASS } from './Geo.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';
import type { ColorSchemeName } from '../_base/types';

export function buildGeoClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(GEO_ROOT_CLASS, className, unstyled);
}

/**
 * Build a sequential color scale function that maps a value within [min, max]
 * to a color interpolated between the first and last colors of the resolved palette.
 * Returns a function: (value: number) => string (hex/rgb color).
 */
export function buildGeoColorScale(
    min: number,
    max: number,
    colorScheme: ColorSchemeName | readonly string[] | undefined,
): (value: number) => string {
    const palette = resolveColorScheme(colorScheme);
    const lightColor = palette[0];
    const darkColor = palette[Math.min(palette.length - 1, palette.length > 2 ? palette.length - 2 : palette.length - 1)];

    // Simple linear interpolation between two hex/rgb colors
    const range = max - min || 1;
    return (value: number) => {
        const t = Math.max(0, Math.min(1, (value - min) / range));
        return interpolateColor(lightColor, darkColor, t);
    };
}

/**
 * Linearly interpolate between two CSS colors (hex or rgb).
 * Falls back to `to` if parsing fails.
 */
function interpolateColor(from: string, to: string, t: number): string {
    const c1 = parseColor(from);
    const c2 = parseColor(to);
    if (!c1 || !c2) return to;
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
    return `rgb(${r},${g},${b})`;
}

function parseColor(color: string): [number, number, number] | null {
    // Hex: #rgb or #rrggbb
    const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i);
    if (hexMatch) {
        const hex = hexMatch[1];
        if (hex.length === 3) {
            return [
                parseInt(hex[0] + hex[0], 16),
                parseInt(hex[1] + hex[1], 16),
                parseInt(hex[2] + hex[2], 16),
            ];
        }
        if (hex.length >= 6) {
            return [
                parseInt(hex.slice(0, 2), 16),
                parseInt(hex.slice(2, 4), 16),
                parseInt(hex.slice(4, 6), 16),
            ];
        }
    }
    // rgb(r,g,b)
    const rgbMatch = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgbMatch) {
        return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])];
    }
    return null;
}

export function buildTooltipContent(datum: GeoFeatureDatum): string {
    const name = datum.label ?? datum.id;
    return `${name}: ${datum.value.toLocaleString()}`;
}

import type { GeoFeatureDatum } from './Geo.types';
import type { ColorSchemeName } from '../_base/types';
import type { GeoColorScale } from './Geo.types';
export declare function buildGeoClasses(className: string | undefined, unstyled: boolean | undefined): string;
/**
 * Build a sequential color scale function that maps a value within [min, max]
 * to a color interpolated between the first and last colors of the resolved palette.
 * Returns a function: (value: number) => string (hex/rgb color).
 */
export declare function buildGeoColorScale(min: number, max: number, colorScheme: ColorSchemeName | readonly string[] | undefined, scale?: GeoColorScale, values?: readonly number[]): (value: number) => string;
/** Position 0..1 of `value` on the color scale (0022 M4.5.5: linear, by rank or logarithmic). */
export declare function scalePosition(value: number, min: number, max: number, scale: GeoColorScale, values: readonly number[]): number;
export declare function buildTooltipContent(datum: GeoFeatureDatum): string;
/**
 * 0022 PB11 (w3f-data-analysis): radio y color de cada punto. El área es proporcional al valor (radio ∝ √valor),
 * el mayor mide `maxRadius`; un punto nunca baja de 2 px. Con grupos, el color del grupo en la paleta.
 */
export declare function geoPointStyle(points: readonly {
    value: number;
    group?: string;
}[], groups: readonly string[], palette: readonly string[], maxRadius: number, color?: string): {
    r: number;
    fill: string;
}[];
//# sourceMappingURL=Geo.utils.d.ts.map
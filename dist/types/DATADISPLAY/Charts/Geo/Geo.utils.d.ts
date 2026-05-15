import type { GeoFeatureDatum } from './Geo.types';
import type { ColorSchemeName } from '../_base/types';
export declare function buildGeoClasses(className: string | undefined, unstyled: boolean | undefined): string;
/**
 * Build a sequential color scale function that maps a value within [min, max]
 * to a color interpolated between the first and last colors of the resolved palette.
 * Returns a function: (value: number) => string (hex/rgb color).
 */
export declare function buildGeoColorScale(min: number, max: number, colorScheme: ColorSchemeName | readonly string[] | undefined): (value: number) => string;
export declare function buildTooltipContent(datum: GeoFeatureDatum): string;
//# sourceMappingURL=Geo.utils.d.ts.map
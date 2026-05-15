import type { GeoFeatureDatum } from './Geo.types';
import type { ColorSchemeName } from '../_base/types';
/**
 * Returns a color scale function that maps a numeric value to a color,
 * interpolating sequentially between the first and last palette colors.
 */
export declare function useGeoColorScale(values: readonly number[], colorScheme: ColorSchemeName | readonly string[] | undefined): (value: number) => string;
/**
 * Hover/select interaction for geo features.
 */
export declare function useGeoInteraction(onHover?: (datum: GeoFeatureDatum | null, index: number | null) => void, onSelect?: (datum: GeoFeatureDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: GeoFeatureDatum, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: GeoFeatureDatum, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Geo.hooks.d.ts.map
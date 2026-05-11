import { useMemo, useCallback } from 'react';
import type { GeoFeatureDatum } from './Geo.types';
import type { ColorSchemeName } from '../_base/types';
import { buildGeoColorScale } from './Geo.utils';
import { useHoveredIndex } from '../_base/hooks';

/**
 * Returns a color scale function that maps a numeric value to a color,
 * interpolating sequentially between the first and last palette colors.
 */
export function useGeoColorScale(
    values: readonly number[],
    colorScheme: ColorSchemeName | readonly string[] | undefined,
) {
    return useMemo(() => {
        if (values.length === 0) return (_v: number) => '#ccc';
        const min = Math.min(...values);
        const max = Math.max(...values);
        return buildGeoColorScale(min, max, colorScheme);
    }, [values, colorScheme]);
}

/**
 * Hover/select interaction for geo features.
 */
export function useGeoInteraction(
    onHover?: (datum: GeoFeatureDatum | null, index: number | null) => void,
    onSelect?: (datum: GeoFeatureDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback(
        (d: GeoFeatureDatum, i: number) => { enter(i); onHover?.(d, i); },
        [enter, onHover],
    );
    const handleLeave = useCallback(
        () => { leave(); onHover?.(null, null); },
        [leave, onHover],
    );
    const handleClick = useCallback(
        (d: GeoFeatureDatum, i: number) => { onSelect?.(d, i); },
        [onSelect],
    );
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';

import { useMemo, useCallback } from 'react';
import type { FunnelDatum } from './Funnel.types';
import type { ColorSchemeName } from '../_base/types';
import { computeFunnelSegments } from './Funnel.utils';
import { useHoveredIndex, useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useFunnelSegments(
    data: readonly FunnelDatum[],
    width: number,
    height: number,
    gap: number,
) {
    return useMemo(
        () => computeFunnelSegments(data, width, height, gap),
        [data, width, height, gap],
    );
}

export function useFunnelColors(
    data: readonly FunnelDatum[],
    colorScheme: ColorSchemeName | readonly string[] | undefined,
) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        return data.map((_, i) => palette[i % palette.length]);
    }, [data, colorScheme]);
}

export function useFunnelInteraction(
    onHover?: (datum: FunnelDatum | null, index: number | null) => void,
    onSelect?: (datum: FunnelDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: FunnelDatum, index: number) => {
            enter(index);
            onHover?.(datum, index);
        },
        [enter, onHover],
    );

    const handleLeave = useCallback(() => {
        leave();
        onHover?.(null, null);
    }, [leave, onHover]);

    const handleClick = useCallback(
        (datum: FunnelDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';

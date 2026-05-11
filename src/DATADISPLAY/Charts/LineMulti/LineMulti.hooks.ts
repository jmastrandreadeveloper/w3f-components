import { useMemo, useCallback, useState } from 'react';
import type { MultiSeriesTime } from '../_base/types';
import type { LineMultiInnerProps } from './LineMulti.types';
import { buildMultiTimeScales } from './LineMulti.utils';
import { useInnerDims } from '../_base/hooks';
import { resolveColorScheme } from '../_base/utils';

export function useLineMultiScales(
    data: readonly MultiSeriesTime[], innerWidth: number, innerHeight: number,
) {
    return useMemo(() => buildMultiTimeScales(data, innerWidth, innerHeight), [data, innerWidth, innerHeight]);
}

export function useLineMultiColors(seriesIds: readonly string[], colorScheme: LineMultiInnerProps['colorScheme']) {
    return useMemo(() => {
        const palette = resolveColorScheme(colorScheme);
        const map: Record<string, string> = {};
        seriesIds.forEach((id, i) => { map[id] = palette[i % palette.length]; });
        return map;
    }, [seriesIds, colorScheme]);
}

export function useLineMultiHover(onHover?: (seriesId: string | null, index: number | null) => void) {
    const [hovered, setHovered] = useState<string | null>(null);
    const enter = useCallback((seriesId: string) => { setHovered(seriesId); onHover?.(seriesId, null); }, [onHover]);
    const leave = useCallback(() => { setHovered(null); onHover?.(null, null); }, [onHover]);
    return { hovered, enter, leave };
}

export { useChartDimensions, useInnerDims } from '../_base/hooks';

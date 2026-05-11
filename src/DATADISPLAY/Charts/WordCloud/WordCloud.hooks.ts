import { useMemo, useCallback } from 'react';
import type { WordCloudDatum } from './WordCloud.types';
import { buildWordCloudColors } from './WordCloud.utils';
import { useHoveredIndex } from '../_base/hooks';

export function useWordCloudColors(count: number, colorScheme: unknown) {
    return useMemo(() => buildWordCloudColors(count, colorScheme), [count, colorScheme]);
}

export function useWordCloudInteraction(
    onHover?: (datum: WordCloudDatum | null, index: number | null) => void,
    onSelect?: (datum: WordCloudDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: WordCloudDatum, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: WordCloudDatum, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';

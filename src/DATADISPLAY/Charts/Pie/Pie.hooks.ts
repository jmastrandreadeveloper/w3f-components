import { useMemo, useCallback } from 'react';
import type { PieDatum } from './Pie.types';
import { defaultGetValue, defaultGetLabel, buildPieColors } from './Pie.utils';
import { useHoveredIndex } from '../_base/hooks';

export function usePieAccessors(
    getValue?: (d: PieDatum) => number,
    getLabel?: (d: PieDatum) => string,
) {
    return useMemo(() => ({
        getValue: getValue ?? defaultGetValue,
        getLabel: getLabel ?? defaultGetLabel,
    }), [getValue, getLabel]);
}

export function usePieColors(data: readonly PieDatum[], colorScheme: unknown) {
    return useMemo(() => buildPieColors(data, colorScheme), [data, colorScheme]);
}

export function usePieInteraction(
    onHover?: (datum: PieDatum | null, index: number | null) => void,
    onSelect?: (datum: PieDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();
    const handleEnter = useCallback((d: PieDatum, i: number) => { enter(i); onHover?.(d, i); }, [enter, onHover]);
    const handleLeave = useCallback(() => { leave(); onHover?.(null, null); }, [leave, onHover]);
    const handleClick = useCallback((d: PieDatum, i: number) => { onSelect?.(d, i); }, [onSelect]);
    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';

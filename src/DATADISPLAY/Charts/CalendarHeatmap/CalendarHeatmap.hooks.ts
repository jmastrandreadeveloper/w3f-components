import { useMemo, useCallback, useState } from 'react';
import type { CalendarDatum, CalendarData } from './CalendarHeatmap.types';
import { buildCalendarCells } from './CalendarHeatmap.utils';

export function useCalendarCells(data: CalendarData) {
    return useMemo(() => buildCalendarCells(data), [data]);
}

export function useCalendarInteraction(
    onHover?: (datum: CalendarDatum | null, index: number | null) => void,
    onSelect?: (datum: CalendarDatum, index: number) => void,
) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleEnter = useCallback(
        (datum: CalendarDatum, index: number) => {
            setHoveredIndex(index);
            onHover?.(datum, index);
        },
        [onHover],
    );

    const handleLeave = useCallback(() => {
        setHoveredIndex(null);
        onHover?.(null, null);
    }, [onHover]);

    const handleClick = useCallback(
        (datum: CalendarDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';

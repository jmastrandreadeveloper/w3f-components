import { useMemo, useState, useCallback } from 'react';
import type { SparklineData } from './Sparkline.types';
import { buildSparklineScales } from './Sparkline.utils';

export function useSparklineScales(data: SparklineData, width: number, height: number) {
    return useMemo(
        () => buildSparklineScales(data, width, height),
        [data, width, height],
    );
}

export function useSparklineHover(
    onHover?: (datum: number | null, index: number | null) => void,
) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleMove = useCallback(
        (index: number, datum: number) => {
            setHoveredIndex(index);
            onHover?.(datum, index);
        },
        [onHover],
    );

    const handleLeave = useCallback(() => {
        setHoveredIndex(null);
        onHover?.(null, null);
    }, [onHover]);

    return { hoveredIndex, handleMove, handleLeave };
}

export { useChartDimensions } from '../_base/hooks';

import { useCallback } from 'react';
import type { BulletDatum } from './Bullet.types';
import { useHoveredIndex } from '../_base/hooks';

export function useBulletInteraction(
    onHover?: (datum: BulletDatum | null, index: number | null) => void,
    onSelect?: (datum: BulletDatum, index: number) => void,
) {
    const { hoveredIndex, enter, leave } = useHoveredIndex();

    const handleEnter = useCallback(
        (datum: BulletDatum, index: number) => {
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
        (datum: BulletDatum, index: number) => {
            onSelect?.(datum, index);
        },
        [onSelect],
    );

    return { hoveredIndex, handleEnter, handleLeave, handleClick };
}

export { useChartDimensions } from '../_base/hooks';

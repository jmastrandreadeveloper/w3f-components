import React from 'react';
import type { DividerProps } from './GridWithDividers.types';

/**
 * Divider Component - Divisor genérico redimensionable.
 */
const Divider: React.FC<DividerProps> = ({
    onMouseDown,
    isDragging,
    orientation = 'vertical',
    className,
}) => {
    return (
        <div
            className={className}
            onMouseDown={onMouseDown}
        />
    );
};

Divider.displayName = 'Divider';

export { Divider };
export default Divider;

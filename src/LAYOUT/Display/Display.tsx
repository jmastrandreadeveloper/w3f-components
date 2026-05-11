import React from 'react';
import type { DisplayContainerProps, DisplayItemProps } from './Display.types';
import { W3F_POSITION_CLASSES } from './Display.constants';
import { useDisplayStyles } from './Display.hooks';

export type { DisplayContainerProps, DisplayItemProps, DisplayPosition } from './Display.types';

// Re-exportación de constantes de posición
export const {
    TOPLEFT, TOPRIGHT, BOTTOMLEFT, BOTTOMRIGHT,
    MIDDLE, TOP, BOTTOM, LEFT, RIGHT,
} = W3F_POSITION_CLASSES;

export const DisplayPositions = W3F_POSITION_CLASSES;

/**
 * DisplayContainer Component - W3F Framework
 *
 * Contenedor de visualización con posicionamiento absoluto de hijos.
 *
 * @example
 * <DisplayContainer>
 *   <DisplayItem position={MIDDLE}>Centro</DisplayItem>
 *   <DisplayItem position={TOPLEFT}>Esquina</DisplayItem>
 * </DisplayContainer>
 */
const DisplayContainer: React.FC<DisplayContainerProps> = ({
    children,
    className = '',
    style,
}) => {
    const { containerClass } = useDisplayStyles();
    const finalClassName = `${containerClass} ${className}`.trim();

    return (
        <div className={finalClassName} style={style}>
            {children}
        </div>
    );
};

DisplayContainer.displayName = 'DisplayContainer';

/**
 * DisplayItem - Elemento posicionado dentro de un DisplayContainer.
 */
const DisplayItem: React.FC<DisplayItemProps> = ({
    children,
    position,
    className = '',
    style,
}) => {
    const { itemClass } = useDisplayStyles();
    const positionClass = itemClass(position);
    const finalClassName = `${positionClass} ${className}`.trim();

    return (
        <div className={finalClassName} style={style}>
            {children}
        </div>
    );
};

DisplayItem.displayName = 'DisplayItem';

export { DisplayContainer, DisplayItem };
export default DisplayContainer;

import React from 'react';
import type { ButtonGridProps } from './ButtonGrid.types';
import { BUTTON_GRID_DEFAULTS } from './ButtonGrid.constants';
import { buildButtonGridClasses } from './ButtonGrid.utils';

export type { ButtonGridProps, ButtonGridAlign } from './ButtonGrid.types';

/**
 * ButtonGrid Component - W3F Framework
 *
 * Contenedor flexible para organizar botones en una fila con wrap.
 *
 * @example
 * <ButtonGrid align="center">
 *   <Button>Guardar</Button>
 *   <Button>Cancelar</Button>
 * </ButtonGrid>
 */
const ButtonGrid: React.FC<ButtonGridProps> = ({
    children,
    align = BUTTON_GRID_DEFAULTS.align,
    as: Element = BUTTON_GRID_DEFAULTS.as,
    className,
    style,
    ...rest
}) => {
    const classes = buildButtonGridClasses(align, className);

    return (
        <Element className={classes} style={style} {...rest}>
            {children}
        </Element>
    );
};

ButtonGrid.displayName = 'ButtonGrid';

export { ButtonGrid };
export default ButtonGrid;

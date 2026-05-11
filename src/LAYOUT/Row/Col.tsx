import React from 'react';
import type { ColProps } from './Row.types';
import { buildColClasses } from './Row.utils';

export type { ColProps } from './Row.types';

/**
 * Col Component - W3F Framework
 *
 * Columna responsive dentro de un Row.
 *
 * @example
 * <Col col={4} md={6} sm={12}>Contenido</Col>
 */
const Col: React.FC<ColProps> = ({
    children,
    className,
    col,
    sm,
    md,
    lg,
    style,
    ...rest
}) => {
    const classes = buildColClasses({ col, sm, md, lg, className });

    return (
        <div className={classes} style={style} {...rest}>
            {children}
        </div>
    );
};

Col.displayName = 'Col';

export { Col };
export default Col;

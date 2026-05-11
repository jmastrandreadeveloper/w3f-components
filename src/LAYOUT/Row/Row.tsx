import React from 'react';
import type { RowProps } from './Row.types';
import { buildRowClasses } from './Row.utils';

export type { RowProps } from './Row.types';

/**
 * Row Component - W3F Framework
 *
 * Contenedor flexible para columnas.
 *
 * @example
 * <Row>
 *   <Col col={6}>Mitad</Col>
 *   <Col col={6}>Mitad</Col>
 * </Row>
 */
const Row: React.FC<RowProps> = ({
    children,
    className,
    style,
    ...rest
}) => {
    const classes = buildRowClasses(className);

    return (
        <div className={classes} style={style} {...rest}>
            {children}
        </div>
    );
};

Row.displayName = 'Row';

export { Row };
export default Row;

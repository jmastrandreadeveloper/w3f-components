import React from 'react';
import type { CellProps, CellRowProps } from './Cell.types';
import { buildCellClassNames } from './Cell.utils';

export type { CellProps, CellRowProps } from './Cell.types';

/**
 * CellRow - Contenedor flexible para células.
 */
const CellRow: React.FC<CellRowProps> = ({ children, className = '', style, ...props }) => {
    return (
        <div className={className} style={style} {...props}>
            {children}
        </div>
    );
};

CellRow.displayName = 'CellRow';

/**
 * Cell Component - W3F Framework
 *
 * Célula individual con soporte para alineación de contenido.
 *
 * @example
 * <CellRow>
 *   <Cell center>Centrado</Cell>
 *   <Cell vCenter>Vertical center</Cell>
 * </CellRow>
 */
const Cell: React.FC<CellProps> = ({
    children,
    content = false,
    center = false,
    vCenter = false,
    className = '',
    style,
    ...props
}) => {
    const classes = buildCellClassNames({ content, center, vCenter, className });

    return (
        <div className={classes} style={style} {...props}>
            {children}
        </div>
    );
};

Cell.displayName = 'Cell';

export { CellRow, Cell };
export default Cell;

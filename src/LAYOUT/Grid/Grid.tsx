import React from 'react';
import type { GridProps, GridAreaItemProps } from './Grid.types';
import { buildGridInlineStyles, buildGridItemClassNames, buildGridItemInlineStyles } from './Grid.utils';

export type {
    GridProps,
    GridAreaItemProps,
    GridAutoFlow,
    GridJustify,
    GridAlignContent,
    GridJustifyItems,
    GridAlignItems,
    GridJustifySelf,
    GridAlignSelf,
} from './Grid.types';

/**
 * Grid Component - W3F Framework
 *
 * Wrapper de CSS Grid totalmente configurable.
 *
 * @example
 * <Grid templateColumns="1fr 1fr" gap="16px">
 *   <GridAreaItem colSpan={2}>Full width</GridAreaItem>
 *   <div>Col 1</div>
 *   <div>Col 2</div>
 * </Grid>
 */
const Grid: React.FC<GridProps> = ({
    children,
    className,
    style,
    ...props
}) => {
    const gridStyle = buildGridInlineStyles({ ...props, style });

    return (
        <div style={gridStyle} className={className} {...({}  as any)}>
            {children}
        </div>
    );
};

Grid.displayName = 'Grid';

/**
 * GridAreaItem Component - W3F Framework
 *
 * Item de Grid con soporte para posicionamiento y span por clase.
 */
const GridAreaItem: React.FC<GridAreaItemProps> = ({
    children,
    colSpan,
    gridArea,
    gridRow,
    gridColumn,
    justifySelf,
    alignSelf,
    placeSelf,
    style,
    className,
    ...rest
}) => {
    const classNames = buildGridItemClassNames({ colSpan, className });
    const itemStyle = buildGridItemInlineStyles({
        gridArea, gridRow, gridColumn, justifySelf, alignSelf, placeSelf, style,
    });

    return (
        <div style={itemStyle} className={classNames} {...rest}>
            {children}
        </div>
    );
};

GridAreaItem.displayName = 'GridAreaItem';

export { Grid, GridAreaItem };
export default Grid;

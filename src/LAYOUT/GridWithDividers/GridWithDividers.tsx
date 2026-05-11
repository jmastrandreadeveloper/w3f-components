import React from 'react';
import './GridWithDividers.css';
import type { GridWithDividersProps, DividerConfig } from './GridWithDividers.types';
import { GRID_DIVIDER_DEFAULTS } from './GridWithDividers.constants';
import useGridDividers from './GridWithDividers.hooks';
import gridDividerUtils from './GridWithDividers.utils';
import { Grid } from '../Grid/Grid';
import { GridAreaItem } from '../Grid/Grid';
import { Divider } from './Divider';

export type {
    GridWithDividersProps,
    DividerConfig,
    DividerProps,
    SliderControlProps,
    DividerOrientation,
    DividerPosition,
    GridDividerState,
} from './GridWithDividers.types';

/**
 * Strip any surrounding quotes from each row of a templateAreas string
 * so the Grid utility doesn't produce invalid double-quoted CSS.
 *
 * Accepts both  `"sidebar main"` (with quotes) and  `sidebar main` (without).
 */
const normalizeAreas = (areas?: string): string | undefined => {
    if (!areas) return undefined;
    return areas
        .trim()
        .split('\n')
        .map(row => row.trim().replace(/^["']|["']$/g, ''))
        .join('\n');
};

/**
 * GridWithDividers Component - W3F Framework
 *
 * Grid con divisores redimensionables entre áreas.
 *
 * @example
 * <GridWithDividers
 *   templateColumns="250px 1fr"
 *   templateAreas="sidebar main"
 *   dividers={[{ between: ['sidebar', 'main'], orientation: 'vertical', columnIndex: 0, initialSize: 250 }]}
 * >
 *   <GridAreaItem gridArea="sidebar">Sidebar</GridAreaItem>
 *   <GridAreaItem gridArea="main">Main</GridAreaItem>
 * </GridWithDividers>
 */
const GridWithDividers: React.FC<GridWithDividersProps> = ({
    templateColumns,
    templateRows,
    templateAreas,
    gap = GRID_DIVIDER_DEFAULTS.gap,
    dividers = [],
    children,
    style = {},
}) => {
    // Single hook call manages all divider states — no hook-in-loop
    const dividerStates = useGridDividers(dividers);

    let adjustedTemplateColumns = templateColumns;
    let adjustedTemplateRows    = templateRows;

    dividers.forEach((config, index) => {
        const state        = dividerStates[index];
        const targetIndex  = config.orientation === 'vertical' ? config.columnIndex : config.rowIndex;
        const targetTpl    = config.orientation === 'vertical'
            ? adjustedTemplateColumns
            : adjustedTemplateRows;

        if (targetIndex !== undefined && targetTpl) {
            const newTpl = gridDividerUtils.replaceTemplateSize(targetTpl, targetIndex, state.size);
            if (config.orientation === 'vertical') {
                adjustedTemplateColumns = newTpl;
            } else {
                adjustedTemplateRows = newTpl;
            }
        }
    });

    const mapChildrenAndAddDividers = (childNodes: React.ReactNode) => {
        return React.Children.map(childNodes, (child) => {
            if (!child || !React.isValidElement(child)) return child;

            const childProps = child.props as Record<string, any>;
            const gridArea   = childProps.gridArea || childProps.style?.gridArea;
            const childStyle = childProps.style || {};

            const applicableDividers = dividers
                .map((config, index) => ({ config, index }))
                .filter(({ config }) => config.between && config.between[0] === gridArea);

            if (applicableDividers.length === 0) return child;

            const { gridArea: _areaProp, style: childRestyle, ...restProps } = childProps;

            const childWithoutGridArea = React.cloneElement(child as React.ReactElement<any>, {
                ...restProps,
                gridArea: undefined,
                style: {
                    ...childRestyle,
                    gridArea:   undefined,
                    overflow:   undefined,
                    overflowX:  undefined,
                    overflowY:  undefined,
                    position:   undefined,
                    width:  '100%',
                    height: '100%',
                },
            });

            return (
                <GridAreaItem
                    gridArea={gridArea}
                    className="w3f-grid-divider-wrapper"
                    style={{
                        position:  'relative',
                        overflow:  childStyle.overflow  || 'visible',
                        overflowX: childStyle.overflowX,
                        overflowY: childStyle.overflowY,
                    }}
                >
                    {childWithoutGridArea}
                    {applicableDividers.map(({ config, index }) => {
                        const state       = dividerStates[index];
                        const orientation = config.orientation || 'vertical';
                        const position    = config.position || (orientation === 'vertical' ? 'right' : 'bottom');
                        const inverted    = position === 'left' || position === 'top';

                        const dividerClass = [
                            'w3f-divider',
                            `w3f-divider-${orientation}`,
                            `w3f-divider-${position}`,
                            state.isDragging ? 'is-dragging' : '',
                        ].filter(Boolean).join(' ');

                        return (
                            <Divider
                                key={`divider-${index}`}
                                className={dividerClass}
                                onMouseDown={(e) => state.handleMouseDown(e, inverted)}
                                orientation={orientation}
                                isDragging={state.isDragging}
                            />
                        );
                    })}
                </GridAreaItem>
            );
        });
    };

    return (
        <Grid
            templateColumns={adjustedTemplateColumns}
            templateRows={adjustedTemplateRows}
            templateAreas={normalizeAreas(templateAreas)}
            gap={gap}
            style={style}
        >
            {mapChildrenAndAddDividers(children)}
        </Grid>
    );
};

GridWithDividers.displayName = 'GridWithDividers';

export { GridWithDividers };
export default GridWithDividers;

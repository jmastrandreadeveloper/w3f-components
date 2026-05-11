import React, { useState } from 'react';
import type { GridWithDrawerProps } from './GridWithDrawer.types';
import type { DividerConfig } from '../GridWithDividers/GridWithDividers.types';
import { GRID_DRAWER_DEFAULTS } from './GridWithDrawer.constants';
import { buildDrawerWrapperClasses } from './GridWithDrawer.utils';
import useGridDividers from '../GridWithDividers/GridWithDividers.hooks';
import gridDividerUtils from '../GridWithDividers/GridWithDividers.utils';
import { Divider } from '../GridWithDividers/Divider';
import { Grid, GridAreaItem } from '../Grid/Grid';
import { ToggleButton } from './ToggleButton';

export type { GridWithDrawerProps, ToggleButtonProps } from './GridWithDrawer.types';

/**
 * GridWithDrawer Component - W3F Framework
 *
 * Grid con un panel lateral colapsable (drawer) y divisores redimensionables.
 *
 * @example
 * <GridWithDrawer
 *   templateColumns="250px 1fr"
 *   templateAreas="sidebar main"
 *   drawerAreaName="sidebar"
 *   dividers={[{ between: ['sidebar', 'main'], orientation: 'vertical', columnIndex: 0 }]}
 * >
 *   <div style={{ gridArea: 'sidebar' }}>Sidebar</div>
 *   <div style={{ gridArea: 'main' }}>Main</div>
 * </GridWithDrawer>
 */
const GridWithDrawer: React.FC<GridWithDrawerProps> = ({
    templateColumns,
    templateRows,
    templateAreas,
    drawerAreaName,
    gap = GRID_DRAWER_DEFAULTS.gap,
    dividers = [],
    children,
    style = {},
}) => {
    // 1. Estado del Drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    // 2. Hooks de Divisores — single call, no hook-in-loop
    const dividerStates = useGridDividers(dividers);

    // 3. Calcular Templates (Columnas/Filas)
    let adjustedTemplateColumns = templateColumns;
    let adjustedTemplateRows = templateRows;

    dividers.forEach((config, index) => {
        const state = dividerStates[index];
        const targetTemplate = config.orientation === 'vertical' ? adjustedTemplateColumns : adjustedTemplateRows;
        const targetIndex = config.orientation === 'vertical' ? config.columnIndex : config.rowIndex;

        if (targetIndex !== undefined && targetTemplate) {
            let newSize = state.size;

            if (index === GRID_DRAWER_DEFAULTS.drawerIndex) {
                newSize = isDrawerOpen ? state.size : GRID_DRAWER_DEFAULTS.collapsedSize;
            }

            const newTemplate = gridDividerUtils.replaceTemplateSize(targetTemplate, targetIndex, newSize);

            if (config.orientation === 'vertical') {
                adjustedTemplateColumns = newTemplate;
            } else {
                adjustedTemplateRows = newTemplate;
            }
        }
    });

    // 4. Procesar Hijos e Inyectar Componentes
    const mapChildrenAndAddDividers = (childNodes: React.ReactNode) => {
        return React.Children.map(childNodes, (child) => {
            if (!React.isValidElement(child)) return child;

            const childProps = child.props as Record<string, any>;
            const gridArea = childProps.gridArea || childProps.style?.gridArea;
            const isDrawerArea = gridArea === drawerAreaName;

            const childStyle = childProps.style || {};
            const { overflow, overflowX, overflowY } = childStyle;

            // Clonar hijo limpiando props que manejará el wrapper
            const childContent = React.cloneElement(child as React.ReactElement<any>, {
                ...childProps,
                gridArea: undefined,
                style: {
                    ...childStyle,
                    gridArea: undefined,
                    overflow: undefined,
                    overflowX: undefined,
                    overflowY: undefined,
                    position: undefined,
                    width: '100%',
                    height: '100%',
                },
            });

            const wrapperClasses = buildDrawerWrapperClasses(isDrawerArea, isDrawerOpen);

            // Detectar divisores aplicables
            const applicableDividers = dividers
                .map((config, index) => ({ config, index }))
                .filter(({ config }) =>
                    (config.between && config.between[0] === gridArea) || (config as any).area === gridArea
                );

            return (
                <GridAreaItem
                    gridArea={gridArea}
                    className={wrapperClasses}
                    style={{
                        position: 'relative',
                        overflow: (isDrawerArea && !isDrawerOpen) ? 'hidden' : (overflow || 'visible'),
                        overflowX: (isDrawerArea && !isDrawerOpen) ? 'hidden' : overflowX,
                        overflowY: (isDrawerArea && !isDrawerOpen) ? 'hidden' : overflowY,
                    }}
                >
                    {isDrawerArea && (
                        <ToggleButton
                            isDrawerOpen={isDrawerOpen}
                            onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                        />
                    )}

                    {childContent}

                    {applicableDividers.map(({ config, index }) => {
                        if (index === GRID_DRAWER_DEFAULTS.drawerIndex && !isDrawerOpen) return null;

                        const state = dividerStates[index];
                        const orientation = config.orientation || 'vertical';
                        const position = config.position || (orientation === 'vertical' ? 'right' : 'bottom');

                        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
                            const inverted = position === 'left' || position === 'top';
                            state.handleMouseDown(e, inverted);
                        };

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
                                onMouseDown={handleMouseDown}
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
            templateAreas={templateAreas}
            gap={gap}
            style={style}
        >
            {mapChildrenAndAddDividers(children)}
        </Grid>
    );
};

GridWithDrawer.displayName = 'GridWithDrawer';

export { GridWithDrawer };
export default GridWithDrawer;

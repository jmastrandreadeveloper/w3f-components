import React from 'react';
import Paper from '../Paper/Paper';
import type { PaperDesignProps } from './PaperDesign.types';
import { PAPER_DESIGN_DEFAULTS, PAPER_DESIGN_CLASSES } from './PaperDesign.constants';
import { buildGridStyle, buildPaperDesignClasses } from './PaperDesign.utils';

/**
 * PaperDesign — Hoja cuadriculada con grid CSS interno.
 *
 * Extiende Paper con un sistema de layout en grid para ubicar
 * componentes alineados a la cuadrícula. Ideal para prototipar
 * formularios, dashboards o layouts en papel cuadriculado.
 *
 * @example
 * // Grid de 3 columnas dentro del papel
 * <PaperDesign columns={3} gap="md" gridColor="primary">
 *   <Input label="Nombre" />
 *   <Input label="Apellido" />
 *   <Input label="Email" />
 * </PaperDesign>
 *
 * @example
 * // Con template areas
 * <PaperDesign
 *   gridTemplateAreas={`
 *     header header
 *     sidebar content
 *   `}
 *   gridTemplateColumns="200px 1fr"
 * >
 *   <div style={{ gridArea: 'header' }}>Header</div>
 *   <div style={{ gridArea: 'sidebar' }}>Sidebar</div>
 *   <div style={{ gridArea: 'content' }}>Content</div>
 * </PaperDesign>
 */
export const PaperDesign: React.FC<PaperDesignProps> = ({
    children,
    className,
    variant,
    gridColor,
    size,
    fullWidth,
    debug,
    widthUnits,
    heightUnits,
    style,

    // Grid
    columns = PAPER_DESIGN_DEFAULTS.columns,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    gap = PAPER_DESIGN_DEFAULTS.gap,
    rowGap,
    columnGap,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
    gridStyle,
    unstyled = PAPER_DESIGN_DEFAULTS.unstyled,
}) => {
    const computedGridStyle = buildGridStyle(
        columns,
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas,
        gap,
        rowGap,
        columnGap,
        justifyContent,
        alignContent,
        justifyItems,
        alignItems,
        gridStyle,
    );

    return (
        <Paper
            className={className}
            variant={variant}
            gridColor={gridColor}
            size={size}
            fullWidth={fullWidth}
            debug={debug}
            widthUnits={widthUnits}
            heightUnits={heightUnits}
            style={style}
        >
            <div className={buildPaperDesignClasses(undefined, unstyled)} style={computedGridStyle}>
                {children}
            </div>
        </Paper>
    );
};

PaperDesign.displayName = 'PaperDesign';

export default PaperDesign;

import React, { forwardRef } from 'react';
import type { PaperProps } from './Paper.types';
import { PAPER_DEFAULTS } from './Paper.constants';
import { buildPaperClasses, buildPaperStyle } from './Paper.utils';

/**
 * Paper — Simula una hoja cuadriculada de escuela.
 *
 * La cuadrícula de 5 mm (18.9 px) sirve como sistema de referencia espacial.
 * Puedes dimensionar el componente en unidades de cuadrícula con `widthUnits`
 * / `heightUnits` para alineación perfecta a la grilla.
 *
 * @example
 * <Paper variant="bold" gridColor="primary" size="lg">
 *   Contenido con cuadrícula azul
 * </Paper>
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(({
    children,
    className = PAPER_DEFAULTS.className,
    variant = PAPER_DEFAULTS.variant,
    gridColor = PAPER_DEFAULTS.gridColor,
    size = PAPER_DEFAULTS.size,
    fullWidth = PAPER_DEFAULTS.fullWidth,
    debug = PAPER_DEFAULTS.debug,
    unstyled = PAPER_DEFAULTS.unstyled,
    widthUnits,
    heightUnits,
    style = {},
}, ref) => {
    const cls = buildPaperClasses(variant, gridColor, size, fullWidth, debug, className, unstyled);
    const computedStyle = buildPaperStyle(widthUnits, heightUnits, style);

    return (
        <div ref={ref} className={cls} style={computedStyle}>
            {children}
        </div>
    );
});

Paper.displayName = 'Paper';

export default Paper;

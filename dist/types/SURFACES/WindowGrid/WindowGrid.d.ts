import React from 'react';
import type { WindowGridProps } from './WindowGrid.types';
/**
 * WindowGrid — Ventana estilo OS con grid responsivo interno.
 * Combina todas las funcionalidades de Window con un grid CSS
 * que se reorganiza automáticamente según el ancho de la ventana.
 *
 * @example
 * <WindowGrid title="Dashboard" autoResponsive responsiveColumns={{ xs: 1, md: 2, lg: 3 }}>
 *   <Card>...</Card>
 *   <Card>...</Card>
 * </WindowGrid>
 */
export declare const WindowGrid: React.ForwardRefExoticComponent<WindowGridProps & React.RefAttributes<HTMLDivElement>>;
export default WindowGrid;
//# sourceMappingURL=WindowGrid.d.ts.map
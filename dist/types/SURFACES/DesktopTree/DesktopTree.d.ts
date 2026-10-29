import React from 'react';
import type { DesktopTreeDetails } from './DesktopTree.utils';
export interface DesktopTreeProps {
    /** Selector CSS del Desktop que se muestra (default: el primero de la página, `.w3f-desktop`). */
    desktop?: string;
    /** Título arriba del árbol. */
    title?: string;
    /** Texto cuando el escritorio está vacío. */
    emptyText?: string;
    /** Mostrar el buscador. Default: true. */
    searchable?: boolean;
    /** Lo que le pasó a cada cosa (texto y código): {data-group-id: {data-wid: acciones}}; "" = el grupo mismo o
     *  las ventanas sueltas. Cada acción se despliega con su código y «Copiar». */
    details?: DesktopTreeDetails | null;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * DesktopTree Component - W3F Framework
 *
 * Árbol de lo que hay en un Desktop: cada WindowGroup (con su post-it) y sus ventanas, y las ventanas sueltas. Se
 * actualiza solo (observa el DOM del Desktop) y un clic lleva la vista del Desktop a esa ventana.
 *
 * @example
 * <Split><DesktopTree /><Desktop>…</Desktop></Split>
 */
export declare function DesktopTree({ desktop, title, emptyText, searchable, details, className, style, }: DesktopTreeProps): import("react/jsx-runtime").JSX.Element;
export default DesktopTree;
//# sourceMappingURL=DesktopTree.d.ts.map
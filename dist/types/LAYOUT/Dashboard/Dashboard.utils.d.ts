import type { DashboardTileLayout } from './Dashboard.types';
/** Una tarjeta dentro de la grilla: enteros, ancho y alto ≥ 1, sin salirse por los costados ni por arriba. */
export declare function clampTile(t: DashboardTileLayout, columns: number): DashboardTileLayout;
/**
 * Acomoda el layout sin tarjetas encimadas: la tarjeta `pinned` (la que se acaba de mover) queda donde se soltó; las
 * demás, en orden de arriba hacia abajo, bajan lo justo para no pisar a ninguna y después suben todo lo que pueden
 * (gravedad hacia arriba; con `gravity` false se quedan a su altura). Mismo orden que el de entrada. Con `pageRows` (formato PDF), una tarjeta que entra en una
 * página no queda cortada: si cruza el final de una página, empieza en la siguiente.
 */
export declare function resolveLayout(layout: DashboardTileLayout[], columns: number, pinned?: string, pageRows?: number, gravity?: boolean): DashboardTileLayout[];
/** Celdas que corresponden a un desplazamiento en px (ya sin el zoom), con el ancho de celda y la separación. */
export declare function pxToCells(px: number, cell: number, gap: number): number;
/** Filas que ocupa el layout (la tarjeta más baja). */
export declare function layoutRows(layout: DashboardTileLayout[]): number;
export declare function sameLayout(a: DashboardTileLayout[], b: DashboardTileLayout[]): boolean;
//# sourceMappingURL=Dashboard.utils.d.ts.map
import type { LinkGeometry, LinkRect } from './Desktop.links';
/** Camino con esquinas redondeadas por los puntos (ya sin puntos alineados de más). */
export declare function roundedPath(pts: [number, number][], radius?: number): string;
/**
 * Recorrido en ángulo recto de `s` a `t` que no pasa por ninguna de `obstacles` (que pueden incluir a `s` y `t`).
 * `offset` corre las puntas a lo largo del borde (líneas que llegan a la misma ventana). null si no hay camino.
 */
export declare function routeOrthogonal(s: LinkRect, t: LinkRect, obstacles: LinkRect[], offset?: number): LinkGeometry | null;
//# sourceMappingURL=Desktop.route.d.ts.map
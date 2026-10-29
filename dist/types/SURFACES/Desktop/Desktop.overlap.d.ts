import type { LinkRect } from './Desktop.links';
export type WindowLayoutMode = 'free' | 'avoid';
/** Atributo del canvas del Desktop con el modo ('free' | 'avoid'); cada Window lo lee al abrirse / soltarse. */
export declare const WINDOW_LAYOUT_ATTR = "data-window-layout";
/** Evento que el Desktop manda a su canvas al activar 'avoid': cada ventana se acomoda (detail.placed). */
export declare const SETTLE_EVENT = "w3f:settle-windows";
/** Evento que una ventana manda a su canvas cuando creció sola (alto automático: llegaron los datos); las que quedaron
 *  tapadas se corren (w3f-data-analysis FL18: antes solo se acomodaba al abrirse, con el alto de antes). */
export declare const GREW_EVENT = "w3f:window-grew";
/** Separación mínima entre ventanas. */
export declare const GAP = 16;
export declare const overlaps: (a: LinkRect, b: LinkRect, gap: number) => boolean;
/**
 * Cuánto mover `me` (dx, dy) para que no toque ninguna de `others` (con `gap` de separación), lo menos posible.
 * {0, 0} si ya está libre. Prueba quedarse donde está y las posiciones pegadas a cada lado de cada ventana (y sus
 * esquinas); se queda con la libre más cercana. No sale de x, y ≥ 0. Si ninguna sirve, a la derecha de todas.
 */
export declare function freeSpot(me: LinkRect, others: LinkRect[], gap?: number): {
    dx: number;
    dy: number;
};
/** Rectángulos (en el canvas) de las ventanas visibles del canvas, menos `except`. */
export declare function windowRects(canvas: HTMLElement, except?: Element | null): LinkRect[];
/** El canvas del Desktop con la opción activada que contiene a `el`, o null. */
export declare function avoidCanvas(el: Element | null): HTMLElement | null;
//# sourceMappingURL=Desktop.overlap.d.ts.map
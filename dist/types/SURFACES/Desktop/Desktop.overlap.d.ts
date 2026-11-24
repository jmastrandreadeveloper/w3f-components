import type { LinkRect } from './Desktop.links';
export type WindowLayoutMode = 'free' | 'avoid' | 'avoid-open';
/** Por qué se acomoda una ventana: se abrió, se soltó (arrastre o tamaño a mano), otra creció y la tapa, o el
 *  Desktop acomoda todas al activar la opción. */
export type SettleReason = 'open' | 'drop' | 'grow' | 'sweep';
/** Atributo del canvas del Desktop con el modo ('free' | 'avoid' | 'avoid-open'); cada Window lo lee al abrirse / soltarse. */
export declare const WINDOW_LAYOUT_ATTR = "data-window-layout";
/** Evento que el Desktop manda a su canvas al activar 'avoid': cada ventana se acomoda (detail.placed). */
export declare const SETTLE_EVENT = "w3f:settle-windows";
/** Evento que una ventana manda a su canvas cuando creció sola (alto automático: llegaron los datos); las que quedaron
 *  tapadas se corren (w3f-data-analysis FL18: antes solo se acomodaba al abrirse, con el alto de antes). */
export declare const GREW_EVENT = "w3f:window-grew";
/** Separación mínima entre ventanas. */
export declare const GAP = 16;
/** Qué va con una ventana cuando se la arrastra (B60): 'together' (default) lleva a las que salieron de ella
 *  (hijas, nietas…); 'alone' la mueve sola. Alt mientras se arrastra hace lo contrario de lo elegido. */
export type DragChildrenMode = 'together' | 'alone';
/** Atributo del canvas del Desktop con `dragChildren`; cada Window lo lee al empezar a arrastrar. */
export declare const DRAG_CHILDREN_ATTR = "data-drag-children";
/** B61: al maximizar una ventana, su contenido a tamaño real (100 %) o con el zoom del escritorio. */
export declare const MAXIMIZE_SCALE_ATTR = "data-maximize-scale";
export declare const overlaps: (a: LinkRect, b: LinkRect, gap: number) => boolean;
/**
 * Cuánto mover `me` (dx, dy) para que no toque ninguna de `others` (con `gap` de separación), lo menos posible.
 * {0, 0} si ya está libre. Prueba quedarse donde está y las posiciones pegadas a cada lado de cada ventana (y sus
 * esquinas); se queda con la libre más cercana, también a la izquierda o arriba del origen (el escritorio no tiene
 * borde: B60). Si ninguna sirve, a la derecha de todas.
 */
export declare function freeSpot(me: LinkRect, others: LinkRect[], gap?: number): {
    dx: number;
    dy: number;
};
/** Rectángulos (en el canvas) de las ventanas visibles del canvas, menos `except`. */
export declare function windowRects(canvas: HTMLElement, except?: Element | null): LinkRect[];
/** El modo del canvas del Desktop que contiene a `el` ('free' si no está en uno). */
export declare function windowLayoutOf(el: Element | null): WindowLayoutMode;
/**
 * El canvas del Desktop que contiene a `el` si, con su modo, la ventana tiene que acomodarse por `why`; si no, null.
 * 'avoid': siempre. 'avoid-open': al abrirse y al activar la opción; nunca al soltarla, y si otra creció solo la corre
 * cuando el usuario no la puso a mano (`handMoved`).
 */
export declare function avoidCanvas(el: Element | null, why?: SettleReason, handMoved?: boolean): HTMLElement | null;
/** Si `el` se arrastra con sus ventanas hijas, según el Desktop (`dragChildren`) y la tecla Alt (hace lo contrario). */
export declare function dragsChildren(el: Element | null, altKey?: boolean): boolean;
//# sourceMappingURL=Desktop.overlap.d.ts.map
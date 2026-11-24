/**
 * Arrastres con el dedo o el lápiz (0031 MWG5, w3f-data-analysis; guía `drag` de Modern Web Guidance).
 *
 * Los arrastres de los componentes (mover y cambiar el tamaño de una Window, desplazar el Desktop, el separador de
 * Split, las tarjetas del Dashboard, las columnas de la Table…) se hicieron con eventos de mouse, y muchos controles
 * de adentro cortan el `mousedown` para no arrastrar a su ventana. Para no romper ese contrato, el mouse sigue igual
 * y el dedo / lápiz entra por un camino aparte con Pointer Events:
 *
 *     onMouseDown={start}
 *     onPointerDown={(e) => { if (isTouchStart(e)) start(e); }}
 *
 * y, al arrastrar, `listenDrag(touch, onMove, onUp)` escucha `pointermove` / `pointerup` / `pointercancel` (dedo) o
 * `mousemove` / `mouseup` (mouse). El asa lleva `touch-action: none` en su CSS (si no, el navegador desplaza la página
 * y cancela el arrastre).
 */
import type React from 'react';
/** ¿Este `pointerdown` empieza un arrastre con el dedo o el lápiz? (no el mouse, que va por `mousedown`) */
export declare const isTouchStart: (e: React.PointerEvent | PointerEvent) => boolean;
/** ¿Es un evento de puntero que no viene del mouse? (para elegir los oyentes al empezar) */
export declare const isTouchEvent: (e: {
    nativeEvent?: Event;
} | Event) => boolean;
/** Escucha el arrastre en `window` hasta soltar; devuelve la función que deja de escuchar. */
export declare const listenDrag: (touch: boolean, onMove: (e: MouseEvent) => void, onUp: (e: MouseEvent) => void, target?: Window | Document) => (() => void);
//# sourceMappingURL=touchDrag.d.ts.map
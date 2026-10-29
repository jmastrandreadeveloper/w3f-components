/**
 * VirtualCursor — un cursor que se mueve solo por la pantalla y hace las acciones de una lección (0022 U, punto 16
 * del 0023 de w3f-data-analysis): va hasta el botón o el campo, hace clic, escribe o elige, y la app responde como
 * si lo hiciera el usuario. Cada paso llega como `command` ({seq, label, actions}); al terminar (o si algo no está
 * en pantalla) avisa por `onDone(seq, ok, detail)` y Python manda el paso siguiente. Los controles se encuentran
 * igual que en las pruebas en pantalla (e2e_ui): por el título de la ventana, el texto del botón, la marca
 * data-w3f-on (función del servidor) o data-w3f-bind (clave del estado).
 *
 * @example
 * <VirtualCursor command={{ seq: 1, label: 'Paso 2: Limpieza', actions: [{ k: 'click', win: 'Limpieza', text: 'Aplicar paso' }] }}
 *                onDone={(seq, ok, detail) => send(seq, ok, detail)} />
 */
import React from 'react';
import type { CursorAction, VirtualCursorProps } from './VirtualCursor.types';
/** Encontrar cosas en la página (puro sobre el DOM: vitest con jsdom). */
export declare const dom: {
    title(w: Element): string;
    wins(root?: ParentNode | null): HTMLElement[];
    /** La ventana cuyo título empieza con `prefix`: dentro del grupo del dataset `group` si está ahí, si no en todo el escritorio. */
    win(prefix: string, group?: string | null): HTMLElement | null;
    button(w: ParentNode | null, text: string): HTMLElement | null;
    topButton(text: string): HTMLElement | null;
    select(w: ParentNode | null, value: string): HTMLSelectElement | null;
    selectByText(w: ParentNode | null, re: string): HTMLSelectElement | null;
    optionValue(s: HTMLSelectElement, re: string): string | null;
    /** El control visible de una clave del estado (data-w3f-bind, con data-w3f-index en un For). */
    bound(key: string, w: ParentNode | null, index?: number | null): HTMLElement | null;
    /** El botón visible cuyo on_click llama a la función `name` del servidor (data-w3f-on; `cons` = sus argumentos). */
    onButton(name: string, w: ParentNode | null, cons?: string[], index?: number | null): HTMLElement | null;
    /** El primer select / input / textarea que sigue al rótulo (texto exacto). */
    controlAfter(w: ParentNode, text: string): HTMLElement | null;
    input(w: ParentNode | null, placeholder: string): HTMLElement | null;
    checkbox(w: ParentNode | null, text: string): HTMLInputElement | null;
    cell(w: ParentNode, rowLabel: string, colName: string): HTMLElement | null;
    dataset(i: number): HTMLElement | null;
    busy(): boolean;
};
/** Elige en un <select> como el usuario (React escucha `change`). "" = la opción vacía habilitada (el placeholder). */
export declare function setSelect(sel: HTMLSelectElement, value: string | string[]): void;
/** Escribe en un input / textarea controlado por React (el setter nativo + `input`). */
export declare function fillInput(el: HTMLInputElement | HTMLTextAreaElement, text: string): void;
interface Api {
    moveTo(el: Element | null, what: string): Promise<HTMLElement>;
    click(el: Element | null, what: string, dbl?: boolean): Promise<void>;
    say(text: string): void;
    t(ms: number): number;
}
/** Ejecuta una acción (exportada para las pruebas). Lanza Error con el motivo si algo no está en pantalla. */
export declare function runAction(a: CursorAction, api: Api): Promise<void>;
/** 0022 B43 (ventana Tutora): lo que se resalta en el modo «solo resaltar». `target` = es el control del paso;
 *  si no, es lo que hay que abrir antes (el botón del pie que abre la ventana, el menú de la barra…). */
export interface Spot {
    el: HTMLElement | null;
    say: string;
    target: boolean;
}
/** Un menú de la barra por su camino de rótulos (Python lo arma con `ui_bar_menus`): el ítem si está abierto; si no,
 *  lo más hondo del camino que se ve (o el menú de arriba), para que se abra a mano. */
export declare function menuSpot(path: string[], say: string): Spot | null;
/** Cómo se dice qué hacer con el control encontrado. */
export declare function describe(a: CursorAction, el: HTMLElement): string;
/** Encuentra el control de una acción sin tocar nada (o lo que hay que abrir antes). */
export declare function locate(a: CursorAction): Spot;
export declare function VirtualCursor({ command, onDone }: VirtualCursorProps): React.ReactElement;
export default VirtualCursor;
//# sourceMappingURL=VirtualCursor.d.ts.map
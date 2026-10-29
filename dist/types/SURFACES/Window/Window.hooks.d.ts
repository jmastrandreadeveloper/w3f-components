import type { WindowDimensions, WindowLayout, WindowPosition } from './Window.types';
export interface ChildWindowEntry {
    source?: string;
    getPosition: () => WindowPosition;
    moveTo: (pos: WindowPosition, final: boolean) => void;
}
/** Todas las ventanas que salen de `windowId`, a cualquier profundidad (sin repetir, aunque haya ciclos). */
export declare function descendantWindows(reg: Map<string, ChildWindowEntry>, windowId: string): ChildWindowEntry[];
export interface UseWindowStateReturn {
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    isFocused: boolean;
    isDragging: boolean;
    isResizing: boolean;
    zIndex: number;
    position: WindowPosition;
    dimensions: WindowDimensions | null;
    windowRef: React.RefObject<HTMLDivElement>;
    handleDragStart: (e: React.MouseEvent) => void;
    handleResizeStart: (e: React.MouseEvent, direction: string) => void;
    handleClose: () => void;
    handleMinimize: () => void;
    handleMaximize: () => void;
    isFitWidth: boolean;
    handleFitWidth: () => void;
    handleWindowClick: () => void;
    /** autoHeight="content" sigue activo (el usuario no cambió el tamaño a mano). */
    autoContent: boolean;
    /** Tope del alto con autoHeight="content": el alto visible del Desktop desde la ventana hasta abajo (px). */
    maxContentHeight: number | null;
}
/** Alto visible que queda desde el borde de arriba de la ventana hasta el borde de abajo del Desktop (o de la
 *  pantalla), en unidades del lienzo (sin zoom). */
export declare function visibleHeightBelow(el: HTMLElement | null, scale: number): number;
/** Evento al WindowGroup: «correte dx, dy» (teclado sobre una ventana fija del grupo). */
export declare const GROUP_MOVE_EVENT = "w3f-group-move";
/** Flecha → [dx, dy] (handleKeyMove). */
export declare const KEY_DELTAS: Record<string, [number, number]>;
/** Ctrl + Alt + → / ←: el foco a la barra de título de la ventana siguiente / anterior del mismo escritorio (en el
 *  orden de la página) y el escritorio se corre hasta mostrarla. Devuelve si encontró una. */
export declare function focusSiblingWindow(from: Element, dir: 1 | -1): boolean;
export declare function useWindowState(open: boolean, draggable: boolean, resizable: boolean, onClose?: () => void, onMinimize?: (minimized: boolean) => void, onMaximize?: (maximized: boolean) => void, onFocus?: () => void, initialPosition?: WindowPosition | null, initialSize?: WindowDimensions | null, scale?: number, onLayoutChange?: (layout: WindowLayout) => void, initialMaximized?: boolean, initialMinimized?: boolean, windowId?: string, windowSource?: string, autoHeight?: 'content' | 'fill' | null): UseWindowStateReturn;
//# sourceMappingURL=Window.hooks.d.ts.map
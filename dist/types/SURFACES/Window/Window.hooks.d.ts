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
    handleWindowClick: () => void;
}
export declare function useWindowState(open: boolean, draggable: boolean, resizable: boolean, onClose?: () => void, onMinimize?: (minimized: boolean) => void, onMaximize?: (maximized: boolean) => void, onFocus?: () => void, initialPosition?: WindowPosition | null, initialSize?: WindowDimensions | null, scale?: number, onLayoutChange?: (layout: WindowLayout) => void, initialMaximized?: boolean, initialMinimized?: boolean, windowId?: string, windowSource?: string): UseWindowStateReturn;
//# sourceMappingURL=Window.hooks.d.ts.map
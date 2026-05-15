import type { WindowDimensions, WindowPosition } from './Window.types';
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
export declare function useWindowState(open: boolean, draggable: boolean, resizable: boolean, onClose?: () => void, onMinimize?: (minimized: boolean) => void, onMaximize?: (maximized: boolean) => void, onFocus?: () => void, initialPosition?: WindowPosition | null, initialSize?: WindowDimensions | null): UseWindowStateReturn;
//# sourceMappingURL=Window.hooks.d.ts.map
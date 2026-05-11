import { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowDimensions, WindowPosition } from './Window.types';
import { WINDOW_MIN_HEIGHT, WINDOW_MIN_WIDTH } from './Window.constants';

// Global z-index counter — shared across all Window instances
let windowZIndexCounter = 100;

interface ResizeStart {
    x: number;
    y: number;
    width: number;
    height: number;
    startX: number;
    startY: number;
}

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

export function useWindowState(
    open: boolean,
    draggable: boolean,
    resizable: boolean,
    onClose?: () => void,
    onMinimize?: (minimized: boolean) => void,
    onMaximize?: (maximized: boolean) => void,
    onFocus?: () => void,
    initialPosition: WindowPosition | null = null,
    initialSize: WindowDimensions | null = null,
): UseWindowStateReturn {
    const [isOpen, setIsOpen] = useState(open);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [zIndex, setZIndex] = useState(() => ++windowZIndexCounter);
    const [position, setPosition] = useState<WindowPosition>(initialPosition ?? { x: 100, y: 100 });
    const [dimensions, setDimensions] = useState<WindowDimensions | null>(initialSize ?? null);

    const windowRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const resizeStartRef = useRef<ResizeStart>({ x: 0, y: 0, width: 0, height: 0, startX: 0, startY: 0 });
    const resizeDirection = useRef<string | null>(null);
    const previousState = useRef<{ position: WindowPosition | null; dimensions: WindowDimensions | null }>({
        position: null,
        dimensions: null,
    });

    useEffect(() => { setIsOpen(open); }, [open]);

    // Drag — mouse offset within element + parent offset for correct absolute positioning
    const parentOffsetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!isDragging) return;

        const onMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX - dragStartRef.current.x - parentOffsetRef.current.x,
                y: e.clientY - dragStartRef.current.y - parentOffsetRef.current.y,
            });
        };

        const onMouseUp = () => { setIsDragging(false); };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging]);

    const handleDragStart = useCallback((e: React.MouseEvent) => {
        if (!draggable || isMaximized || isMinimized) return;
        const el = windowRef.current;
        if (!el) return;

        // Offset of the positioned ancestor (position:absolute is relative to it)
        const offsetParent = el.offsetParent as HTMLElement | null;
        if (offsetParent) {
            const parentRect = offsetParent.getBoundingClientRect();
            parentOffsetRef.current = { x: parentRect.left, y: parentRect.top };
        } else {
            parentOffsetRef.current = { x: 0, y: 0 };
        }

        // Mouse offset within the window element
        const rect = el.getBoundingClientRect();
        dragStartRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        setIsDragging(true);
        setIsFocused(true);
        setZIndex(++windowZIndexCounter);
        if (onFocus) onFocus();
    }, [draggable, isMaximized, isMinimized, onFocus]);

    // Resize
    useEffect(() => {
        if (!isResizing) return;

        const onMouseMove = (e: MouseEvent) => {
            if (!resizeDirection.current) return;
            const { x, y, width, height, startX, startY } = resizeStartRef.current;
            const deltaX = e.clientX - x;
            const deltaY = e.clientY - y;
            const dir = resizeDirection.current;

            let newWidth = width;
            let newHeight = height;
            let newX = startX;
            let newY = startY;

            if (dir.includes('e')) newWidth += deltaX;
            if (dir.includes('w')) { newWidth -= deltaX; newX += deltaX; }
            if (dir.includes('s')) newHeight += deltaY;
            if (dir.includes('n')) { newHeight -= deltaY; newY += deltaY; }

            if (newWidth < WINDOW_MIN_WIDTH) {
                if (dir.includes('w')) newX = startX + width - WINDOW_MIN_WIDTH;
                newWidth = WINDOW_MIN_WIDTH;
            }
            if (newHeight < WINDOW_MIN_HEIGHT) {
                if (dir.includes('n')) newY = startY + height - WINDOW_MIN_HEIGHT;
                newHeight = WINDOW_MIN_HEIGHT;
            }

            setDimensions({ width: newWidth, height: newHeight });
            if (dir.includes('w') || dir.includes('n')) setPosition({ x: newX, y: newY });
        };

        const onMouseUp = () => {
            setIsResizing(false);
            resizeDirection.current = null;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isResizing]);

    const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
        if (!resizable || isMaximized) return;
        e.stopPropagation();
        resizeDirection.current = direction;

        const el = windowRef.current!;
        // Use the current position state (already in parent-relative coords) instead of viewport coords
        const rect = el.getBoundingClientRect();
        const offsetParent = el.offsetParent as HTMLElement | null;
        const pOff = offsetParent ? offsetParent.getBoundingClientRect() : { left: 0, top: 0 };

        resizeStartRef.current = {
            x: e.clientX, y: e.clientY,
            width: rect.width, height: rect.height,
            startX: rect.left - pOff.left, startY: rect.top - pOff.top,
        };
        setIsResizing(true);
    }, [resizable, isMaximized]);

    // Controls
    const handleClose = useCallback(() => {
        setIsOpen(false);
        if (onClose) onClose();
    }, [onClose]);

    const handleMinimize = useCallback(() => {
        setIsMinimized((prev) => {
            if (onMinimize) onMinimize(!prev);
            return !prev;
        });
    }, [onMinimize]);

    const handleMaximize = useCallback(() => {
        if (!isMaximized) {
            previousState.current = {
                position: { ...position },
                dimensions: dimensions ? { ...dimensions } : null,
            };
        } else {
            if (previousState.current.position) setPosition(previousState.current.position);
            if (previousState.current.dimensions) setDimensions(previousState.current.dimensions);
        }
        setIsMaximized((prev) => {
            if (onMaximize) onMaximize(!prev);
            return !prev;
        });
    }, [isMaximized, position, dimensions, onMaximize]);

    const handleWindowClick = useCallback(() => {
        setIsFocused(true);
        setZIndex(++windowZIndexCounter);
        if (onFocus) onFocus();
    }, [onFocus]);

    return {
        isOpen, isMinimized, isMaximized, isFocused, isDragging, isResizing,
        zIndex, position, dimensions, windowRef,
        handleDragStart, handleResizeStart,
        handleClose, handleMinimize, handleMaximize, handleWindowClick,
    };
}

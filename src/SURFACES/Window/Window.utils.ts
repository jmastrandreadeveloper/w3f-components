import type React from 'react';
import type { WindowDimensions, WindowFooterAlign, WindowOsStyle, WindowPosition, WindowSize } from './Window.types';
import { WINDOW_CLASSES } from './Window.constants';

export function buildWindowClasses(
    osStyle: WindowOsStyle,
    size: WindowSize,
    modal: boolean,
    isMaximized: boolean,
    isMinimized: boolean,
    isFocused: boolean,
    isDragging: boolean,
    isResizing: boolean,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [WINDOW_CLASSES.base, 'w3f-window--unstyled', className].filter(Boolean).join(' ');
    }
    return [
        WINDOW_CLASSES.base,
        `w3f-window--${osStyle}`,
        `w3f-window--${size}`,
        modal ? WINDOW_CLASSES.modal : WINDOW_CLASSES.floating,
        isMaximized && WINDOW_CLASSES.maximized,
        isMinimized && WINDOW_CLASSES.minimized,
        isFocused && WINDOW_CLASSES.focused,
        isDragging && WINDOW_CLASSES.dragging,
        isResizing && WINDOW_CLASSES.resizing,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildWindowBodyClasses(noPadding: boolean, bodyClassName: string): string {
    return [
        WINDOW_CLASSES.body,
        noPadding && WINDOW_CLASSES.bodyNoPadding,
        bodyClassName,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildWindowFooterClasses(align: WindowFooterAlign, footerClassName: string): string {
    return [WINDOW_CLASSES.footer, `w3f-window-footer--${align}`, footerClassName]
        .filter(Boolean)
        .join(' ');
}

export function buildWindowStyle(
    style: React.CSSProperties | undefined,
    position: WindowPosition,
    dimensions: WindowDimensions | null,
    isMaximized: boolean,
    zIndex: number,
): React.CSSProperties {
    return {
        ...style,
        zIndex,
        ...(!isMaximized && position
            ? { left: `${position.x}px`, top: `${position.y}px` }
            : {}),
        ...(!isMaximized && dimensions
            ? { width: `${dimensions.width}px`, height: `${dimensions.height}px`, maxHeight: 'none' }
            : {}),
    };
}

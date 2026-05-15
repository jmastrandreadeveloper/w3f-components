import type React from 'react';
export type WindowOsStyle = 'windows' | 'macos' | 'linux';
export type WindowSize = 'sm' | 'md' | 'lg' | 'xl';
export type WindowFooterAlign = 'start' | 'center' | 'end';
export interface WindowPosition {
    x: number;
    y: number;
}
export interface WindowDimensions {
    width: number;
    height: number;
}
export interface WindowButtonConfig {
    text?: string;
    children?: React.ReactNode;
    key?: string;
    [key: string]: unknown;
}
export interface WindowProps {
    title?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    buttons?: WindowButtonConfig[];
    osStyle?: WindowOsStyle;
    size?: WindowSize;
    modal?: boolean;
    draggable?: boolean;
    resizable?: boolean;
    minimizable?: boolean;
    maximizable?: boolean;
    closable?: boolean;
    onClose?: () => void;
    onMinimize?: (minimized: boolean) => void;
    onMaximize?: (maximized: boolean) => void;
    onFocus?: () => void;
    className?: string;
    bodyClassName?: string;
    footerClassName?: string;
    style?: React.CSSProperties;
    initialPosition?: WindowPosition | null;
    initialSize?: WindowDimensions | null;
    footerAlign?: WindowFooterAlign;
    open?: boolean;
    noPadding?: boolean;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
//# sourceMappingURL=Window.types.d.ts.map
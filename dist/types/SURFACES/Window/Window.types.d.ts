import type React from 'react';
export type WindowOsStyle = 'windows' | 'macos' | 'linux';
export type WindowSize = 'sm' | 'md' | 'lg' | 'xl';
export type WindowFooterAlign = 'start' | 'center' | 'end';
export interface WindowPosition {
    x: number;
    y: number;
}
/** Posición, tamaño y estado de una ventana (onLayoutChange). Coordenadas del contenedor (sin zoom). */
export interface WindowLayout {
    x: number;
    y: number;
    width: number;
    height: number;
    maximized: boolean;
    minimized: boolean;
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
/** Una línea desde otra ventana del Desktop (la que tiene `linkId === id`) hasta esta, con rótulo y color. */
export interface WindowLink {
    id: string;
    label?: string;
    color?: string;
    /** El punto de su origen se arrastra a otra ventana (Desktop onLinkChange). */
    draggable?: boolean;
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
    /** Al soltar un arrastre o un cambio de tamaño, y al maximizar / minimizar (para guardar dónde quedó). */
    onLayoutChange?: (layout: WindowLayout) => void;
    /** La ventana nace maximizada / minimizada (ej. al volver a abrir un proyecto). */
    initialMaximized?: boolean;
    initialMinimized?: boolean;
    className?: string;
    bodyClassName?: string;
    footerClassName?: string;
    style?: React.CSSProperties;
    initialPosition?: WindowPosition | null;
    initialSize?: WindowDimensions | null;
    footerAlign?: WindowFooterAlign;
    open?: boolean;
    noPadding?: boolean;
    /** Botón ↔ en la barra de título: estira la ventana hasta que se vea todo el ancho del contenido (sin
     *  barra horizontal; ej. todas las columnas de una tabla). Otro clic vuelve al ancho anterior. */
    fitWidth?: boolean;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Scale factor of the parent canvas (e.g. Desktop zoom). Used to correct drag/resize coords. Default: 1. */
    scale?: number;
    /** Unique ID for this window inside its WindowGroup. Sets data-wid attribute for Bezier connector lines. */
    windowId?: string;
    /** ID of the window this one was derived from. Sets data-wid-source for automatic Bezier connectors. */
    windowSource?: string;
    /** ID único en todo el Desktop (data-link-id): otras ventanas pueden pedir una línea desde esta con `links`. */
    linkId?: string;
    /** Líneas rotuladas desde otras ventanas del Desktop (por su `linkId`), aunque estén en otro WindowGroup. */
    links?: WindowLink[];
}
//# sourceMappingURL=Window.types.d.ts.map
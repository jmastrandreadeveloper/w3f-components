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
/** Acción larga en curso en esta ventana (línea de progreso debajo de la barra de título). */
export interface WindowBusy {
    /** 0–100; sin número (null / ausente) la línea se anima sin saber cuánto falta. */
    pct?: number | null;
    /** Texto chico a la derecha (ej. «Paso 2 de 5 · Anular dinamización · 0:07»). */
    text?: string;
    /** Muestra «Detener» (con onStop). */
    stoppable?: boolean;
    /** Ya pidió detenerse: el botón queda deshabilitado («Deteniendo…»). */
    stopping?: boolean;
    /** Terminó: la línea queda llena (verde, o roja con `error`) con el texto final. */
    done?: boolean;
    error?: boolean;
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
    /** Botón «?» en la barra de título (junto al título): ayuda de esta ventana. Sin `onHelp` no hay botón. */
    onHelp?: () => void;
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
    /** Acción larga en curso: línea de progreso debajo de la barra de título (null = no hay). */
    busy?: WindowBusy | null;
    /** «Detener» de la línea de progreso (solo con `busy.stoppable`). */
    onStop?: () => void;
    /** Alto al abrir (0022 B29 de Data Analysis): 'content' = el alto lo da el contenido (crece y se achica con él,
     *  hasta el alto visible del Desktop); 'fill' = todo el alto visible, de donde está hasta abajo. En los dos
     *  casos, si el usuario cambia el tamaño a mano, queda el tamaño que eligió. null / ausente: `initialSize`. */
    autoHeight?: 'content' | 'fill' | null;
}
//# sourceMappingURL=Window.types.d.ts.map
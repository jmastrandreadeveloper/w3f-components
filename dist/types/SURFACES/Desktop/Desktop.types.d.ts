import type React from 'react';
import type { LinkChange } from './Desktop.links';
/** Zoom y desplazamiento del Desktop (onViewChange / view). */
export interface DesktopView {
    zoom: number;
    x: number;
    y: number;
    /** Cambiarlo vuelve a aplicar la misma vista. */
    n?: number;
}
export interface DesktopProps {
    children?: React.ReactNode;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** Background of the desktop container. */
    background?: string;
    /** Height of the outer container. Default: '100vh'. */
    height?: string | number;
    /** Enable mouse-wheel zoom and zoom controls. Default: false.
     *  Over a window (.w3f-window) the wheel scrolls its content; Ctrl + wheel zooms there too. */
    zoomable?: boolean;
    /** Initial zoom level (1 = 100%). Default: 1. */
    defaultZoom?: number;
    /** Minimum zoom level. Default: 0.25. */
    minZoom?: number;
    /** Maximum zoom level. Default: 3. */
    maxZoom?: number;
    /** Zoom increment per wheel tick or button click. Default: 0.1. */
    zoomStep?: number;
    /** Show zoom HUD (−/% /+) when zoomable=true. Default: true. */
    showZoomControls?: boolean;
    /** Enable drag-to-pan on the canvas background. Default: false. */
    pannable?: boolean;
    /** Initial pan offset in pixels. Default: { x: 0, y: 0 }. */
    defaultPan?: {
        x: number;
        y: number;
    };
    /** Zoom y desplazamiento cuando el usuario deja de cambiarlos (con una demora corta). */
    onViewChange?: (view: DesktopView) => void;
    /** Se soltó el punto de una línea `draggable` (Window `links`) sobre otra ventana con `linkId`. */
    onLinkChange?: (change: LinkChange) => void;
    /** Vista a aplicar (ej. al volver a abrir un proyecto): se aplica cada vez que cambia su valor. */
    view?: DesktopView | null;
    /** Width of the inner canvas (scrollable/zoomable area). Default: 3000. */
    canvasWidth?: number | string;
    /** Height of the inner canvas. Default: 2000. */
    canvasHeight?: number | string;
}
//# sourceMappingURL=Desktop.types.d.ts.map
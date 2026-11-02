import type React from 'react';
import type { LinkChange, LinkRouting } from './Desktop.links';
import type { DragChildrenMode, WindowLayoutMode } from './Desktop.overlap';
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
    /** Botón «Ver todo» en la barra del zoom: zoom y desplazamiento para que entren todas las ventanas. Default: true. */
    showFitAll?: boolean;
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
    /** Forma de las líneas `links`: 'curve' (curva directa, por debajo de las ventanas; default) u
     *  'orthogonal' (en ángulo recto, rodeando las ventanas; si no hay camino libre, la curva). */
    linkRouting?: LinkRouting;
    /** 'free' (default: las ventanas pueden taparse), 'avoid' (sin taparse: una ventana que se abre, se suelta o
     *  cambia de tamaño encima de otra se corre al lugar libre más cercano; al activarlo se acomodan todas) o
     *  'avoid-open' (sin taparse solo al abrirse y al activarlo: la que el usuario movió a mano queda donde la dejó). */
    windowLayout?: WindowLayoutMode;
    /** Qué va con una ventana al arrastrarla: 'together' (default) lleva a las que salieron de ella (`windowSource`);
     *  'alone' la mueve sola. Alt mientras se arrastra hace lo contrario de lo elegido. */
    dragChildren?: DragChildrenMode;
    /** Vista a aplicar (ej. al volver a abrir un proyecto): se aplica cada vez que cambia su valor. */
    view?: DesktopView | null;
    /** Width of the inner canvas div. Default: 3000. Solo es el tamaño de la capa: las ventanas pueden estar fuera
     *  de ella (también en coordenadas negativas), el desplazamiento no tiene límite y «Ver todo» mira las ventanas (B60). */
    canvasWidth?: number | string;
    /** Height of the inner canvas div. Default: 2000. */
    canvasHeight?: number | string;
}
//# sourceMappingURL=Desktop.types.d.ts.map
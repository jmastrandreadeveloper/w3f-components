import { type MutableRefObject, type RefObject } from 'react';
export interface DesktopLink {
    id: string;
    label?: string;
    color?: string;
    draggable?: boolean;
}
export interface LinkChange {
    target: string;
    index: number;
    label: string;
    from: string;
    to: string;
}
export interface LinkRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface LinkGeometry {
    d: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    sx: number;
    sy: number;
    tx: number;
    ty: number;
}
export declare const LINK_DEFAULT_COLOR = "#f59e0b";
/** Lee data-links; lo que no sea una lista de {id} se ignora. */
export declare function parseLinks(attr: string | null | undefined): DesktopLink[];
/** Posición en píxeles de layout relativa a `ancestor` (sin el zoom del canvas, como en WindowGroup). */
export declare function relPos(el: HTMLElement, ancestor: HTMLElement): LinkRect;
/**
 * Curva de `s` a `t` (bordes enfrentados). `offset` corre las dos puntas a lo largo del borde, para que las
 * líneas que llegan a la misma ventana (o salen dos veces de la misma, A = B) no se encimen.
 */
export declare function linkPath(s: LinkRect, t: LinkRect, offset?: number): LinkGeometry;
/**
 * Redibuja todas las líneas del canvas (una pasada): la curva en `svg` (debajo de las ventanas) y los puntos con
 * rótulo en `top` (encima). Exportada para los tests.
 */
export declare function drawDesktopLinks(canvas: HTMLElement, svg: SVGSVGElement, top?: SVGSVGElement): void;
/** Un solo bucle de animación por Desktop: sigue a las ventanas mientras se arrastran. */
export declare function useDesktopLinks(canvasRef: RefObject<HTMLElement | null>, svgRef: RefObject<SVGSVGElement | null>, topRef?: RefObject<SVGSVGElement | null>): void;
/** La ventana (data-link-id) más de arriba bajo el punto, salvo las de `exclude`; null si no hay. */
export declare function linkTargetAt(x: number, y: number, exclude?: string[]): HTMLElement | null;
/**
 * Arrastre de las líneas `draggable`: se agarra el punto del origen (o su rótulo), una línea punteada sigue al
 * puntero (con el zoom del canvas) y se resalta la ventana de abajo; al soltar sobre otra ventana con data-link-id
 * se llama a onLinkChange. No mueve nada por su cuenta: la app cambia `links` si corresponde.
 */
export declare function useLinkDrag(canvasRef: RefObject<HTMLElement | null>, topRef: RefObject<SVGSVGElement | null>, zoomRef: MutableRefObject<number>, onChangeRef: MutableRefObject<((c: LinkChange) => void) | undefined>): void;
//# sourceMappingURL=Desktop.links.d.ts.map
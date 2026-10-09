import type React from 'react';
/**
 * Gestiona el orden z-index de las ventanas en el Desktop.
 * La ventana con foco más reciente queda al frente (mayor z-index).
 */
export declare function useWindowOrder(children: React.ReactNode): {
    windowOrder: string[];
    handleWindowFocus: (key: string) => void;
};
interface UseCanvasTransformOptions {
    zoomEnabled: boolean;
    panEnabled: boolean;
    defaultZoom: number;
    minZoom: number;
    maxZoom: number;
    zoomStep: number;
    defaultPan: {
        x: number;
        y: number;
    };
    containerRef: React.RefObject<HTMLDivElement | null>;
}
/**
 * Gestiona zoom (hacia el cursor) y pan (drag sobre el fondo) del canvas interno.
 *
 * Zoom: rueda del mouse → zoom hacia el punto del cursor.
 * Pan: mousedown en el fondo del canvas → drag para desplazar.
 *
 * Se usa transform-origin: 0 0 con:
 *   transform: translate(pan.x, pan.y) scale(zoom)
 */
export declare function useCanvasTransform({ zoomEnabled, panEnabled, defaultZoom, minZoom, maxZoom, zoomStep, defaultPan, containerRef, }: UseCanvasTransformOptions): {
    zoom: number;
    pan: {
        x: number;
        y: number;
    };
    isPanning: boolean;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    setZoomLevel: (v: number) => void;
    setView: (v: {
        zoom: number;
        x: number;
        y: number;
    }) => void;
    handlePanStart: (e: React.MouseEvent<HTMLDivElement>) => void;
};
export {};
//# sourceMappingURL=Desktop.hooks.d.ts.map
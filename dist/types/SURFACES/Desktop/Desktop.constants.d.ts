export declare const DESKTOP_CLASSES: {
    readonly root: "w3f-desktop";
    readonly viewport: "w3f-desktop-viewport";
    readonly canvas: "w3f-desktop-canvas";
    readonly toolbar: "w3f-desktop-toolbar";
    readonly toolbarSlider: "w3f-desktop-toolbar-slider";
    readonly toolbarLabel: "w3f-desktop-toolbar-label";
    readonly pannable: "w3f-desktop--pannable";
    readonly panning: "w3f-desktop--panning";
};
export declare const DESKTOP_DEFAULTS: {
    readonly unstyled: false;
    readonly className: "";
    readonly background: "#f0f2f5";
    readonly height: "100vh";
    readonly zoomable: false;
    readonly defaultZoom: 1;
    readonly minZoom: 0.25;
    readonly maxZoom: 3;
    readonly zoomStep: 0.1;
    readonly showZoomControls: false;
    readonly pannable: false;
    readonly defaultPan: {
        x: number;
        y: number;
    };
    readonly canvasWidth: 3000;
    readonly canvasHeight: 2000;
};
export declare const BASE_Z_INDEX = 100;
/** «Ir a esta ventana»: el evento que recibe el contenedor del Desktop con `detail.el` (un elemento del canvas, p. ej.
 *  una Window o un WindowGroup): la vista se centra en él (sin cambiar el zoom) y se resalta un momento. Lo manda
 *  DesktopTree; cualquiera puede mandarlo con `focusDesktopElement`. */
export declare const FOCUS_EVENT = "w3f-desktop-focus";
/** Clase que se le pone un momento al elemento al que se fue. */
export declare const FOCUS_FLASH_CLASS = "w3f-desktop-flash";
/** La vista (zoom, x, y) para que entren todos los rectángulos `rects` (en px del canvas) en un viewport de vw × vh, con
 *  `margin` px alrededor; el zoom entre minZoom y maxZoom (y nunca más de 1: «ver todo» no agranda). Sin nada, null. */
export declare function fitView(rects: {
    left: number;
    top: number;
    width: number;
    height: number;
}[], vw: number, vh: number, minZoom: number, maxZoom: number, margin?: number): {
    zoom: number;
    x: number;
    y: number;
} | null;
/** Centra la vista del Desktop que contiene a `el` en ese elemento. */
export declare function focusDesktopElement(el: HTMLElement): boolean;
/** La rueda sobre estos elementos desplaza su contenido (no hace zoom); con Ctrl hace zoom igual. */
export declare const WHEEL_SCROLL_SELECTOR = ".w3f-window";
//# sourceMappingURL=Desktop.constants.d.ts.map
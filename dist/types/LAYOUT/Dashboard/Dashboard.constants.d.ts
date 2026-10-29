export declare const DASHBOARD_DEFAULTS: {
    readonly columns: 12;
    readonly rowHeight: 60;
    readonly gap: 8;
    readonly tileInset: 0;
    readonly gravity: true;
    readonly rulerMm: 0;
    readonly rulerOffsetMm: 0;
    readonly zoom: number | "fit";
    readonly pageWidth: 0;
    readonly zoomControls: false;
    readonly editable: true;
    readonly fullscreen: false;
    readonly fullscreenTitle: "";
    readonly fullscreenPlaceholder: "En pantalla completa (Esc para volver).";
    readonly emptyText: "Sin tarjetas.";
};
/** Alto de la barra de la pantalla completa y relleno (para repartir el alto entre las filas). */
export declare const FULLSCREEN_BAR = 48;
export declare const FULLSCREEN_PAD = 16;
/** Ancho de las reglas (px) y separación con el tablero. */
export declare const RULER_SIZE = 18;
export declare const RULER_GAP = 4;
/** Zoom mínimo y máximo (también para 'fit') y el paso de los botones − / + y de Ctrl + rueda. */
export declare const ZOOM_MIN = 0.2;
export declare const ZOOM_MAX = 3;
export declare const ZOOM_STEP = 0.1;
export declare const DASHBOARD_CLASSES: {
    readonly root: "w3f-dashboard";
    readonly grid: "w3f-dashboard-grid";
    readonly tile: "w3f-dashboard-tile";
    readonly tileActive: "w3f-dashboard-tile--active";
    readonly tileSelected: "w3f-dashboard-tile--selected";
    readonly tileBorderless: "w3f-dashboard-tile--borderless";
    readonly head: "w3f-dashboard-tile-head";
    readonly title: "w3f-dashboard-tile-title";
    readonly remove: "w3f-dashboard-tile-remove";
    readonly body: "w3f-dashboard-tile-body";
    readonly resize: "w3f-dashboard-tile-resize";
    readonly empty: "w3f-dashboard-empty";
    readonly fullscreen: "w3f-dashboard-fullscreen";
    readonly fullscreenBar: "w3f-dashboard-fullscreen-bar";
    readonly fullscreenExit: "w3f-dashboard-fullscreen-exit";
    readonly placeholder: "w3f-dashboard-placeholder";
    readonly pageBreak: "w3f-dashboard-page-break";
    readonly drop: "w3f-dashboard-drop";
    readonly ruled: "w3f-dashboard-ruled";
    readonly ruler: "w3f-dashboard-ruler";
    readonly rulerTop: "w3f-dashboard-ruler--top";
    readonly rulerLeft: "w3f-dashboard-ruler--left";
    readonly rulerMark: "w3f-dashboard-ruler-mark";
    readonly rulerInfo: "w3f-dashboard-ruler-info";
    readonly rulerWrapTop: "w3f-dashboard-ruler-wrap--top";
    readonly rulerWrapLeft: "w3f-dashboard-ruler-wrap--left";
    readonly rulerCorner: "w3f-dashboard-ruler-corner";
    readonly page: "w3f-dashboard-page";
    readonly pageBg: "w3f-dashboard-page-bg";
    readonly zoomed: "w3f-dashboard-zoomed";
    readonly rootZoomBar: "w3f-dashboard--zoombar";
    readonly zoomBar: "w3f-dashboard-zoombar";
    readonly zoomBtn: "w3f-dashboard-zoombar-btn";
    readonly zoomSlider: "w3f-dashboard-zoombar-slider";
    readonly zoomPct: "w3f-dashboard-zoombar-pct";
};
//# sourceMappingURL=Dashboard.constants.d.ts.map
import type React from 'react';
/** Lugar de una tarjeta en la grilla (en celdas: columna x, fila y, ancho w, alto h). */
export interface DashboardTileLayout {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    /** Lo que se lee en la barra de la tarjeta */
    title?: string;
    /** 0026 X13e (w3f-data-analysis): sin barra de título (editando queda una franja fina para arrastrar). */
    hideTitle?: boolean;
    /** 0022 B46: el estilo del título de esta tarjeta (letra, tamaño, color, alineación…: el del título del gráfico). */
    titleStyle?: React.CSSProperties;
    /** 0022 B47: la tarjeta sin su recuadro (sin borde ni sombra; sale igual en el HTML / PDF). */
    hideBorder?: boolean;
    /** 0022 B48: el fondo de la barra del título de esta tarjeta («transparent» = sin fondo; vacío = el del tablero). */
    headBackground?: string;
    /** 0022 B51: el radio de las esquinas de esta tarjeta, en px (0 = rectas; sin esto, --w3f-dashboard-tile-radius). */
    radius?: number;
}
/** Imagen de fondo de la hoja (0026 X2): una capa por página (con `pageRows`) o una sola (Web), debajo de las
 *  tarjetas; va en la copia exportada (HTML / PDF) porque está dentro de la grilla. */
export interface DashboardPageBackground {
    /** La imagen (una URL o un data:image/…) */
    url: string;
    /** Una imagen por página (0026 X3: otro PDF como fondo): la página k usa urls[k-1] (la última, si faltan) */
    urls?: readonly string[];
    /** cover = cubre la hoja (recorta); contain = entera, centrada; stretch = estirada a la hoja; center = tamaño
     *  real, centrada; tile = mosaico */
    fit?: 'cover' | 'contain' | 'stretch' | 'center' | 'tile';
    /** 0 a 1 */
    opacity?: number;
    /** all = en todas las páginas; first = solo en la primera */
    pages?: 'all' | 'first';
}
export interface DashboardProps {
    /** Las tarjetas que se ven y dónde (una por id; los hijos sin lugar no se muestran) */
    layout?: DashboardTileLayout[];
    /** Columnas de la grilla */
    columns?: number;
    /** Alto de una fila, en px */
    rowHeight?: number;
    /** Separación entre celdas, en px */
    gap?: number;
    /** true: las tarjetas suben solas hasta tocar la de arriba; false: quedan a la altura donde se sueltan (solo
     *  bajan si pisarían a otra) */
    gravity?: boolean;
    /** Margen dentro de cada celda, en px (grillas finas: `gap` 0 y este margen, así una tarjeta de n celdas mide n
     *  pasos justos) */
    tileInset?: number;
    /** px por mm: dibuja reglas en mm arriba y a la izquierda (con `pageRows`, la de la izquierda vuelve a empezar en
     *  cada página); 0 = sin reglas. No salen en la copia exportada */
    rulerMm?: number;
    /** mm donde empieza el tablero en la hoja (el margen): las reglas cuentan desde el borde de la hoja */
    rulerOffsetMm?: number;
    /** Zoom del tablero (1 = 100 %; 'fit' = el ancho que entra en la ventana que lo contiene). Las reglas y el
     *  arrastre lo siguen (0022 B41) */
    zoom?: number | 'fit';
    /** Ancho natural del tablero en px (Formato PDF: el ancho útil de la hoja); 0 = el de su contenedor (Web) */
    pageWidth?: number;
    /** El zoom que resultó de 'fit' (source 'fit'), o el que eligió el usuario en la barra de zoom / Ctrl + rueda
     *  (source 'user'; 'fit' cuando toca «Ajustar») */
    onZoomChange?: (zoom: number | 'fit', source: 'fit' | 'user') => void;
    /** Barra de zoom debajo de la hoja (−, deslizador, +, %, Ajustar); Ctrl + rueda sobre la hoja también hace zoom
     *  (0026 X1) */
    zoomControls?: boolean;
    /** Si false, las tarjetas no se mueven, no cambian de tamaño ni se sacan */
    editable?: boolean;
    /** Se dibuja en toda la pantalla (fuera del escritorio y su zoom) */
    fullscreen?: boolean;
    /** Con `fullscreen`: además, la pantalla completa del navegador (Fullscreen API, como F11). Salir de ella (Esc)
     *  avisa por `onExitFullscreen`; si el navegador no la permite, queda en toda la ventana */
    fullscreenScreen?: boolean;
    /** Título de la barra de la pantalla completa */
    fullscreenTitle?: string;
    /** Texto en el lugar del tablero mientras está en pantalla completa */
    fullscreenPlaceholder?: string;
    /** Texto sin tarjetas */
    emptyText?: string;
    /** Al soltar una tarjeta que se movió o cambió de tamaño: el layout nuevo (ya acomodado) */
    onLayoutChange?: (layout: DashboardTileLayout[]) => void;
    /** ✕ de una tarjeta */
    onRemove?: (id: string) => void;
    /** 0022 B45.1: la tarjeta elegida (borde de selección; no sale en el HTML / PDF). */
    selectedId?: string | null;
    /** Clic en una tarjeta (editable): su id y dónde está en la pantalla (para abrir sus propiedades al lado); clic en el
     *  vacío de la hoja o Esc: null. Solo avisa cuando cambia. */
    onSelect?: (id: string | null, rect?: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }) => void;
    /** Esc o «Salir» en la pantalla completa */
    onExitFullscreen?: () => void;
    /** Formato PDF: filas por página (dibuja una línea de corte cada tantas filas; 0 = sin cortes) */
    pageRows?: number;
    /** Imagen de fondo de la hoja (null = sin fondo) */
    pageBackground?: DashboardPageBackground | null;
    /** Cada valor nuevo (distinto del que había al montar) pide una copia del tablero: llega por `onSnapshot` */
    snapshotRequest?: number | string;
    /** Título del documento copiado */
    snapshotTitle?: string;
    /** Fondo de la página copiada */
    snapshotBackground?: string;
    /** CSS de página para el PDF (p. ej. "@page { size: A4 landscape; margin: 10mm }") */
    snapshotPageCss?: string;
    /** La copia pedida: un documento HTML autocontenido */
    onSnapshot?: (html: string, request: number | string) => void;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export interface DashboardTileProps {
    /** El id de su lugar en `layout` */
    tileId: string;
    children?: React.ReactNode;
}
//# sourceMappingURL=Dashboard.types.d.ts.map
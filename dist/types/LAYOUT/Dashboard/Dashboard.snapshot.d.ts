/**
 * Copia del tablero como HTML autocontenido (0022 M5.5): el dibujo tal como se ve (SVG de los gráficos incluido) con
 * solo las reglas CSS que lo tocan (respetando las capas @layer) y las variables CSS heredadas de afuera.
 */
export interface SnapshotOptions {
    title?: string;
    background?: string;
    /** CSS de página para imprimir (p. ej. "@page { size: A4 landscape; margin: 10mm }") */
    pageCss?: string;
}
/** Lo que solo sirve para editar y no va en la copia: controles de la tarjeta, cortes de página, flechas de
 *  ordenar de las tablas y todo lo marcado con `w3f-dashboard-noprint` (avisos de edición). */
export declare const SNAPSHOT_REMOVE: string;
/** Documento HTML con la copia de `root`, sin los controles de edición (✕, esquina de tamaño). */
export declare function snapshotHtml(root: HTMLElement, opts?: SnapshotOptions): string;
//# sourceMappingURL=Dashboard.snapshot.d.ts.map
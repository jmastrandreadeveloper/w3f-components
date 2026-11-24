export declare function buildTooltipClasses(visible: boolean, className?: string): string;
/** Margen libre entre el cartel y el borde del gráfico (px). */
export declare const TOOLTIP_EDGE = 4;
/**
 * Dónde poner el cartel para que entre entero en la caja del gráfico (que corta con overflow: hidden).
 * Primero el lugar pedido (punto + desplazamiento); si se sale por la derecha, va a la izquierda del punto;
 * si se sale por abajo, arriba del punto; si se sale por arriba, abajo. Al final se encierra en la caja.
 */
export declare function fitTooltip(a: {
    left: number;
    top: number;
    offsetX: number;
    offsetY: number;
}, size: {
    width: number;
    height: number;
}, box: {
    width: number;
    height: number;
}, edge?: number): {
    left: number;
    top: number;
};
//# sourceMappingURL=ChartTooltip.utils.d.ts.map
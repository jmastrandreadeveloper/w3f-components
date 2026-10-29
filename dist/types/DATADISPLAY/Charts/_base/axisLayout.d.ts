import type { InnerDims } from './types';
export type ChartXLabels = 'bottom' | 'top' | 'none';
export type ChartYAxisSide = 'left' | 'right';
export interface ChartAxisLayoutProps {
    /** 0026 X7: rótulos del eje X abajo, arriba o ninguno. Default 'bottom'. */
    xLabels?: ChartXLabels;
    /** 0026 X7: giro de los rótulos del eje X (grados). */
    xLabelRotate?: number;
    /** 0026 X7: el eje Y a la izquierda o a la derecha. Default 'left'. */
    yAxisSide?: ChartYAxisSide;
    /** VX1 (matplotlib xlim / ylim): mínimo y máximo de un eje de números (sin valor = el de los datos). */
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    /** VX1 (xscale / yscale): escala lineal o logarítmica de un eje de números. */
    xScaleType?: 'linear' | 'log';
    yScaleType?: 'linear' | 'log';
    /** VX1 (invert_xaxis / invert_yaxis): el eje al revés. */
    xInvert?: boolean;
    yInvert?: boolean;
    /** VX1 (xmargin / ymargin): margen antes del primer y después del último dato (fracción del rango, 0.1 = 10 %). */
    xMargin?: number;
    yMargin?: number;
    /** VX1 (xticks / yticks): cuántas marcas (aproximado; la grilla sigue a las mismas). */
    xTickCount?: number;
    yTickCount?: number;
    /** VX1 (tick_params): las rayitas de los ejes: se ven, también del otro lado, hacia afuera / adentro, largo, grosor
     *  y espacio hasta el rótulo (px). */
    showTicks?: boolean;
    ticksBothSides?: boolean;
    tickDirection?: 'out' | 'in';
    tickLength?: number;
    tickWidth?: number;
    tickPad?: number;
    /** VX1 (frame_on): un marco alrededor del área del dibujo. */
    plotFrame?: boolean;
    /** VX1 (aspect / box_aspect): alto / ancho del área del dibujo (1 = cuadrada; sin valor = la que deja la tarjeta). */
    plotAspect?: number;
    /** VX5 (Text.wrap): los rótulos largos del eje X en varios renglones (en vez de girarlos). */
    labelWrap?: boolean;
}
/** VX5: las palabras de `text` repartidas en renglones de hasta `maxWidth` px (letra de `fontSize`, ancho aproximado). */
export declare function wrapWords(text: string, maxWidth: number, fontSize: number): string[];
type Dims = Pick<InnerDims, 'margin' | 'innerWidth' | 'innerHeight'>;
/** Dónde empieza el dibujo a lo ancho (en lugar de `dims.margin.left`). */
export declare const plotLeft: (dims: Dims, p: ChartAxisLayoutProps) => number;
/** Dónde empieza el dibujo a lo alto (en lugar de `dims.margin.top`). */
export declare const plotTop: (dims: Dims, p: ChartAxisLayoutProps) => number;
/** Las props de ChartAxis para el eje X. `rotate`: el giro propio del gráfico (si no se eligió otro). */
export declare const xAxisLayout: (dims: Dims, p: ChartAxisLayoutProps, rotate?: number) => {
    mirrorOffset: number | undefined;
    wrapLabels?: boolean | undefined;
    tickPad?: number | undefined;
    tickWidth?: number | undefined;
    tickLength?: number | undefined;
    tickDirection?: "in" | "out" | undefined;
    hideTicks?: boolean | undefined;
    numTicks?: number | undefined;
    orientation: "top" | "bottom";
    top: number;
    hideTickLabels: boolean | undefined;
    tickRotate: number;
};
/** Las props de ChartAxis para el eje Y. */
export declare const yAxisLayout: (dims: Dims, p: ChartAxisLayoutProps) => {
    mirrorOffset: number | undefined;
    frame: {
        width: number;
        height: number;
    } | undefined;
    tickPad?: number | undefined;
    tickWidth?: number | undefined;
    tickLength?: number | undefined;
    tickDirection?: "in" | "out" | undefined;
    hideTicks?: boolean | undefined;
    numTicks?: number | undefined;
    orientation: "right";
    left: number;
} | {
    mirrorOffset: number | undefined;
    frame: {
        width: number;
        height: number;
    } | undefined;
    tickPad?: number | undefined;
    tickWidth?: number | undefined;
    tickLength?: number | undefined;
    tickDirection?: "in" | "out" | undefined;
    hideTicks?: boolean | undefined;
    numTicks?: number | undefined;
    orientation: "left";
};
/**
 * VX1: la escala de un eje con lo elegido en el Estilo: mínimo / máximo, logarítmica, al revés, margen y cantidad de
 * marcas. Una escala de categorías (band) solo se invierte. Sin nada elegido, la misma escala.
 */
export declare function adaptScale<S>(scale: S, p: ChartAxisLayoutProps, axis: 'x' | 'y'): S;
export {};
//# sourceMappingURL=axisLayout.d.ts.map
import React from 'react';
/**
 * 0022 B53.1 (w3f-data-analysis): piezas compartidas de los gráficos de líneas y áreas —el trazo de la línea
 * (continua / rayas / puntos), el formato de las fechas del eje X y los rótulos con el valor de cada punto—.
 */
/** Cómo se dibuja la línea. */
export type ChartLineStyle = 'solid' | 'dashed' | 'dotted';
/** Las props SVG del trazo para el estilo y el grosor dados (las rayas crecen con el grosor). */
export declare const lineDash: (style: ChartLineStyle | undefined, width?: number) => {
    strokeDasharray?: string;
    strokeLinecap?: "round";
};
/** Cómo se escriben las fechas del eje X ('auto' = las de siempre). */
export type ChartDateFormat = 'auto' | 'day_month' | 'month' | 'month_year' | 'quarter' | 'year';
/** La función de las marcas del eje X para ese formato (undefined con 'auto'). */
export declare const dateTickFormat: (format: ChartDateFormat | undefined) => ((v: unknown) => string) | undefined;
/** Qué puntos llevan el rótulo con su valor. */
export type ChartValueLabels = 'none' | 'all' | 'last' | 'minmax';
/** Las posiciones (índices) de los puntos que llevan rótulo, para `n` puntos con esos valores. */
export declare const labelIndices: (mode: ChartValueLabels | undefined, values: number[]) => number[];
export interface ChartPointLabel {
    x: number;
    y: number;
    text: string;
    color?: string;
}
export interface ChartPointLabelsProps {
    labels: ChartPointLabel[];
    /** Tamaño de la letra (px). */
    size?: number;
}
export declare const POINT_LABEL_CLASS = "w3f-chart-point-label";
/** Los rótulos de valores encima de cada punto (color: --w3f-chart-value-label-color, letra: --w3f-chart-label-font). */
export declare const ChartPointLabels: React.FC<ChartPointLabelsProps>;
export declare const formatLabel: (v: number, format?: (n: number) => string) => string;
/**
 * VX4 (w3f-data-analysis): lo que matplotlib le pone a las líneas: escalonada (drawstyle / where / step), color entre
 * los guiones (gapcolor), un punto cada N (markevery), puntos medio llenos (fillstyle) y el modo paletas (stem: un
 * palito desde la base hasta cada punto; linefmt / markerfmt / basefmt / orientation).
 */
export interface ChartLineExtrasProps {
    lineStep?: 'none' | 'pre' | 'mid' | 'post';
    lineGapColor?: string;
    dotEvery?: number;
    dotFill?: 'full' | 'none' | 'left' | 'right' | 'top' | 'bottom';
    lineMode?: 'line' | 'stem';
    stemLineStyle?: ChartLineStyle;
    stemBaseline?: 'solid' | 'dashed' | 'dotted' | 'none';
    stemOrientation?: 'vertical' | 'horizontal';
}
/** La curva de la línea: escalonada si se eligió; si no, la suave o la recta de siempre. */
export declare const pickCurve: <C>(curved: boolean | undefined, step: ChartLineExtrasProps["lineStep"], smooth: C) => C | import("d3-shape").CurveFactory;
/** ¿Lleva punto la posición i? (un punto cada N valores) */
export declare const dotShown: (i: number, every?: number) => boolean;
/** Un punto medio lleno (o hueco): el contorno del color de la serie y la mitad pintada. */
export declare const HalfDot: React.FC<{
    cx: number;
    cy: number;
    r: number;
    color: string;
    fill: NonNullable<ChartLineExtrasProps['dotFill']>;
    opacity?: number;
}>;
export default ChartPointLabels;
//# sourceMappingURL=ChartLineMarks.d.ts.map
import React from 'react';
/**
 * VX3 (w3f-data-analysis): lo que matplotlib le pone a barras, porciones y puntos y que un `fill` no alcanza:
 *
 * - `markHatch`: trama (rayado) ENCIMA del color de la marca (hatch), con su color y grosor (hatchcolor,
 *   hatch_linewidth). TM5: `'series'` = una trama distinta por serie (por color de la marca: para imprimir en blanco
 *   y negro); `markHatchSize` = la separación; `markHatchMode: 'solo'` = solo la trama, con las líneas del color de la
 *   serie sobre `markHatchBg` (papel), en lugar del relleno.
 * - TM6 `markIcon`: pictogramas, un ícono repetido dentro de la marca (persona, casa, moneda…), de `markIconSize`;
 *   `markIconMode: 'sobre'` (encima del color, de `markIconColor`) o `'solo'` (los íconos del color de la serie sobre
 *   `markHatchBg`, como un gráfico de pictogramas).
 * - `markFill: 'hollow'`: la marca hueca, con el contorno del color de su serie (fill=False).
 * - `markGapColor` con `markDash`: un borde punteado de dos colores (edgegapcolor): debajo, el borde entero del color
 *   del hueco; encima, los guiones del color del borde.
 *
 * `ChartMarkDecorLayer` va una vez dentro del <svg> de un gráfico: después de cada dibujo busca sus marcas
 * (`.visx-bar`, `.w3f-chart-slice`, `.w3f-chart-point`) y pone encima de cada una una copia decorada (sin eventos).
 * Los patrones se arman ahí mismo, uno por trama / ícono y color (así cada serie tiene el suyo). Sirve para todos los
 * gráficos sin tocar cómo dibuja cada uno, y queda en el DOM (también en el PDF).
 * El relleno tenue / hueco y el tipo de borde de la marca misma los ponen las variables CSS
 * `--w3f-chart-mark-fill-opacity` / `--w3f-chart-mark-dash` (Charts.structural.css).
 */
export type ChartMarkHatch = 'none' | 'diagonal' | 'diagonal2' | 'vertical' | 'horizontal' | 'cross' | 'xcross' | 'dots' | 'series';
export type ChartMarkIcon = 'none' | 'persona' | 'casa' | 'moneda' | 'auto' | 'arbol' | 'estrella' | 'corazon' | 'gota' | 'caja' | 'tilde';
export interface ChartMarkDecorProps {
    markHatch?: ChartMarkHatch;
    markHatchColor?: string;
    markHatchWidth?: number;
    /** TM5: lado de la baldosa de la trama (px): más chico = más apretada. */
    markHatchSize?: number;
    /** TM5: 'sobre' = encima del color de la marca; 'solo' = solo la trama (líneas del color de la serie). */
    markHatchMode?: 'sobre' | 'solo';
    /** TM5 / TM6: el fondo de las marcas en los modos «solo» (papel). */
    markHatchBg?: string;
    markIcon?: ChartMarkIcon;
    markIconSize?: number;
    markIconMode?: 'sobre' | 'solo';
    markIconColor?: string;
    markFill?: 'solid' | 'faint' | 'hollow';
    markDash?: 'solid' | 'dashed' | 'dotted';
    markGapColor?: string;
    markEdgeWidth?: number;
    /** VX5 (sketch_params): el trazo «dibujado a mano» de las marcas (0 = no; 1, 2, 3 = cada vez más). */
    markSketch?: number;
}
/** TM5: las tramas de «una por serie», en este orden (la serie n toma la n-ésima). */
export declare const SERIES_HATCHES: ChartMarkHatch[];
/** TM6: los íconos (24 × 24). */
export declare const ICON_PATHS: Record<string, string>;
/** Las líneas de la trama en una baldosa de `s` × `s` (DOM). */
export declare function hatchShapes(h: ChartMarkHatch, color: string, w: number, s?: number): Element[];
/** La capa de decoración de las marcas (no dibuja nada si no se eligió trama, ícono, hueco ni borde de dos colores). */
export declare const ChartMarkDecorLayer: React.FC<ChartMarkDecorProps>;
export declare const MARK_DECOR_KEYS: readonly ["markHatch", "markHatchColor", "markHatchWidth", "markHatchSize", "markHatchMode", "markHatchBg", "markIcon", "markIconSize", "markIconMode", "markIconColor", "markFill", "markDash", "markGapColor", "markEdgeWidth"];
//# sourceMappingURL=ChartMarkDecor.d.ts.map
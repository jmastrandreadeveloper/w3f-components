import React from 'react';
/**
 * FL15 (w3f-data-analysis): el número dentro de cada tramo de una barra apilada (el % del total de la barra o el
 * valor) y las barras «atenuadas» (por ejemplo los años anteriores, con el color más apagado).
 */
export type ChartSegmentLabelMode = 'none' | 'percent' | 'value';
export interface ChartBarExtrasProps {
    /** Número dentro de cada tramo: 'percent' = % del total de la barra, 'value' = el valor. Por defecto 'none'. */
    segmentLabels?: ChartSegmentLabelMode;
    /** No se escribe si el tramo es menos que este % del total de la barra (por defecto 4). */
    segmentLabelMin?: number;
    /** Decimales del porcentaje (por defecto 1). */
    segmentLabelDecimals?: number;
    /** Tamaño de letra del número (px, por defecto 11). */
    segmentLabelSize?: number;
    /** Nombres de las barras que van atenuadas (más transparentes). */
    mutedBars?: readonly string[];
    /** Opacidad de las barras atenuadas (0–1, por defecto 0.45). Con `mutedColors`, no se usa. */
    mutedOpacity?: number;
    /** Colores propios de las barras atenuadas, uno por tramo en el orden de las series (en vez de bajar la opacidad;
     *  0027 v3: los años anteriores con sus tonos apagados). */
    mutedColors?: readonly string[];
    /** Formato del número del tramo: 'es' (por defecto: «40,6 %») o 'python' (punto y % pegado: «40.6%»). */
    segmentLabelFormat?: ChartSegmentLabelFormat;
}
export type ChartSegmentLabelFormat = 'es' | 'python';
/** El texto del tramo, o '' si no va (modo 'none', tramo vacío o más chico que `min` % del total). */
export declare function segmentText(value: number, total: number, mode?: ChartSegmentLabelMode, min?: number, decimals?: number, format?: ChartSegmentLabelFormat): string;
/** ¿La barra `label` está entre las atenuadas? */
export declare const isMuted: (label: string, muted?: readonly string[]) => boolean;
/** La opacidad de una barra según `mutedBars` (1 si no está; con su color propio de atenuada, 1). */
export declare const barOpacity: (label: string, muted?: readonly string[], opacity?: number, mutedColors?: readonly string[], keyIdx?: number) => number;
/** El color del tramo `keyIdx` de la barra `label`: el propio de las atenuadas si lo hay (un tramo sin color propio
 *  —más tramos que colores— va con su color y la opacidad de las atenuadas, no repite el de otro tramo). */
export declare const barFill: (label: string, keyIdx: number, fill: string, muted?: readonly string[], mutedColors?: readonly string[]) => string;
export interface ChartSegmentLabelProps {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    size?: number;
    /** El color del tramo: sobre uno claro el número va oscuro (si no, blanco; un CSS var: blanco). */
    fill?: string;
}
/** Oscuro sobre un fondo claro, blanco sobre uno oscuro (#rgb, #rrggbb, rgb(…); lo demás: blanco). */
export declare function labelColor(fill?: string): string;
/** El número centrado en el rectángulo del tramo (si no entra, no se dibuja). */
export declare const ChartSegmentLabel: React.FC<ChartSegmentLabelProps>;
export default ChartSegmentLabel;
//# sourceMappingURL=ChartSegmentLabel.d.ts.map
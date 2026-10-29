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
    /** Opacidad de las barras atenuadas (0–1, por defecto 0.45). */
    mutedOpacity?: number;
}
/** El texto del tramo, o '' si no va (modo 'none', tramo vacío o más chico que `min` % del total). */
export declare function segmentText(value: number, total: number, mode?: ChartSegmentLabelMode, min?: number, decimals?: number): string;
/** La opacidad de una barra según `mutedBars` (1 si no está). */
export declare const barOpacity: (label: string, muted?: readonly string[], opacity?: number) => number;
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
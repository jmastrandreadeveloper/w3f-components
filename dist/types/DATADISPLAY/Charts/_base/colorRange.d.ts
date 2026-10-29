/**
 * VX4 (w3f-data-analysis): la escala de color fija, como vmin / vmax / clim / norm de matplotlib: el valor que da el
 * primer color (`colorMin`), el que da el último (`colorMax`) y si la escala es logarítmica (`colorLog`). Sin valor,
 * los extremos de los datos. Lo usan el mapa de calor, el calendario y el mapa.
 */
export interface ChartColorRangeProps {
    colorMin?: number;
    colorMax?: number;
    colorLog?: boolean;
}
/** ¿Se eligió algo de la escala de color? */
export declare const hasColorRange: (p: ChartColorRangeProps) => boolean;
/** Dónde cae `value` en la escala (0 = primer color, 1 = último), con los extremos y la escala elegidos. */
export declare function colorPosition(value: number, lo: number, hi: number, log?: boolean): number;
//# sourceMappingURL=colorRange.d.ts.map
import React from 'react';
/**
 * 0022 PB12.4 (w3f-data-analysis): un gráfico chico dentro del tooltip («tooltip de página» de Power BI): el detalle de
 * lo que está bajo el mouse (sus meses, sus productos…). `points` en orden; `kind` 'line' (en el tiempo) o 'bars'.
 */
export type ChartTooltipMiniPoint = {
    label: string;
    value: number;
};
export interface ChartTooltipChartProps {
    /** 0022 PB12.4: por categoría (el rótulo de la barra), los puntos del minigráfico del tooltip. */
    tooltipCharts?: Record<string, readonly ChartTooltipMiniPoint[]>;
    /** 0022 PB12.4: cómo se dibuja: 'bars' (default) o 'line'. */
    tooltipChartKind?: 'bars' | 'line';
    /** 0022 PB12.4: qué muestra (p. ej. «por mes»), debajo del minigráfico. */
    tooltipChartTitle?: string;
}
export interface ChartTooltipMiniProps {
    points: readonly ChartTooltipMiniPoint[];
    kind?: 'bars' | 'line';
    title?: string;
    width?: number;
    height?: number;
    color?: string;
}
export declare const ChartTooltipMini: React.FC<ChartTooltipMiniProps>;
export default ChartTooltipMini;
//# sourceMappingURL=ChartTooltipMini.d.ts.map
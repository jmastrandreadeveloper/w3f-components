import type React from 'react';
export interface HeatmapDataPoint {
    row: string;
    col: string;
    value: number;
}
export interface HeatmapChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Data points — each with row, col, and value. */
    data: HeatmapDataPoint[];
    /** Chart width in pixels. Defaults to container width or 400. */
    width?: number;
    /** Chart height in pixels. Defaults to 300. */
    height?: number;
    /** Color range [low, high] for the gradient. */
    colors?: [string, string];
    /** When true, strips visual styles for trait composition. */
    unstyled?: boolean;
    /** Bridge binding ID. */
    bindId?: string;
    /** Additional CSS class. */
    className?: string;
}
//# sourceMappingURL=HeatmapChart.types.d.ts.map
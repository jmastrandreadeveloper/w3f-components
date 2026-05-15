import type React from 'react';
export interface GaugeThreshold {
    value: number;
    color: string;
}
export interface GaugeChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Current gauge value. */
    value: number;
    /** Minimum value. Defaults to 0. */
    min?: number;
    /** Maximum value. Defaults to 100. */
    max?: number;
    /** Gauge arc color (used when no thresholds are set). */
    color?: string;
    /** Color thresholds — the gauge color changes based on value. */
    thresholds?: GaugeThreshold[];
    /** Chart width in pixels. Defaults to container width or 300. */
    width?: number;
    /** Chart height in pixels. Defaults to 200. */
    height?: number;
    /** When true, strips visual styles for trait composition. */
    unstyled?: boolean;
    /** Bridge binding ID. */
    bindId?: string;
    /** Additional CSS class. */
    className?: string;
}
//# sourceMappingURL=GaugeChart.types.d.ts.map
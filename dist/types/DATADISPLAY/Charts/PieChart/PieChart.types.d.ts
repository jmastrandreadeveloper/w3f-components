import type React from 'react';
export interface PieChartDataPoint {
    label: string;
    value: number;
    color?: string;
}
export interface PieChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Data slices for the pie. */
    data: PieChartDataPoint[];
    /** Chart width in pixels. */
    width?: number;
    /** Chart height in pixels. */
    height?: number;
    /** Render as donut chart with center cutout. */
    donut?: boolean;
    /** When true, strips visual styles. */
    unstyled?: boolean;
    /** Bridge binding ID. */
    bindId?: string;
    /** Additional CSS class. */
    className?: string;
}
//# sourceMappingURL=PieChart.types.d.ts.map
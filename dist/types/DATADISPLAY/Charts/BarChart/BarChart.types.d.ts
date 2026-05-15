import type React from 'react';
export interface BarChartDataPoint {
    label: string;
    value: number;
}
export interface BarChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Data points to render as bars. */
    data: BarChartDataPoint[];
    /** Chart width in pixels. Defaults to container width or 400. */
    width?: number;
    /** Chart height in pixels. Defaults to 300. */
    height?: number;
    /** Bar fill color. Defaults to var(--w3f-primary) equivalent. */
    color?: string;
    /** Render bars horizontally instead of vertically. */
    horizontal?: boolean;
    /** When true, strips visual styles for trait composition. */
    unstyled?: boolean;
    /** Bridge binding ID. */
    bindId?: string;
    /** Additional CSS class. */
    className?: string;
}
//# sourceMappingURL=BarChart.types.d.ts.map
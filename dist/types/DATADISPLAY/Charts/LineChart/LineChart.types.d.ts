import type React from 'react';
export interface LineChartDataPoint {
    x: number;
    y: number;
}
export interface LineChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Data points for the line. */
    data: LineChartDataPoint[];
    /** Chart width in pixels. */
    width?: number;
    /** Chart height in pixels. */
    height?: number;
    /** Line stroke color. */
    color?: string;
    /** Use curved interpolation (monotoneX). */
    curved?: boolean;
    /** Show dots at each data point. */
    showDots?: boolean;
    /** When true, strips visual styles. */
    unstyled?: boolean;
    /** Bridge binding ID. */
    bindId?: string;
    /** Additional CSS class. */
    className?: string;
}
//# sourceMappingURL=LineChart.types.d.ts.map
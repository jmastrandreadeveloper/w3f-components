import type React from 'react';

export interface AreaChartDataPoint {
  x: number;
  y: number;
}

export interface AreaChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Data points for the area. */
  data: AreaChartDataPoint[];
  /** Chart width in pixels. */
  width?: number;
  /** Chart height in pixels. */
  height?: number;
  /** Area fill color. */
  color?: string;
  /** Apply gradient fill from color to transparent. */
  gradient?: boolean;
  /** When true, strips visual styles. */
  unstyled?: boolean;
  /** Bridge binding ID. */
  bindId?: string;
  /** Additional CSS class. */
  className?: string;
}

import type React from 'react';

export interface RadarChartDataPoint {
  axis: string;
  value: number;
}

export interface RadarChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Data points — one per axis. */
  data: RadarChartDataPoint[];
  /** Chart width in pixels. Defaults to container width or 400. */
  width?: number;
  /** Chart height in pixels. Defaults to 400. */
  height?: number;
  /** Polygon fill color. */
  color?: string;
  /** When true, strips visual styles for trait composition. */
  unstyled?: boolean;
  /** Bridge binding ID. */
  bindId?: string;
  /** Additional CSS class. */
  className?: string;
}

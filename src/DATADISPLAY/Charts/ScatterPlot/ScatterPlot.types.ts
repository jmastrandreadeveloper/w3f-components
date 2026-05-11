import type React from 'react';

export interface ScatterPlotDataPoint {
  x: number;
  y: number;
  size?: number;
  color?: string;
}

export interface ScatterPlotProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Data points to render as circles. */
  data: ScatterPlotDataPoint[];
  /** Chart width in pixels. */
  width?: number;
  /** Chart height in pixels. */
  height?: number;
  /** Default point color (overridden by per-point color). */
  color?: string;
  /** When true, strips visual styles. */
  unstyled?: boolean;
  /** Bridge binding ID. */
  bindId?: string;
  /** Additional CSS class. */
  className?: string;
}

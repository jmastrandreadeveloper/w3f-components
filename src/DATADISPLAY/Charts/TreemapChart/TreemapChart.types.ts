import type React from 'react';

export interface TreemapNode {
  name: string;
  value?: number;
  children?: TreemapNode[];
}

export interface TreemapChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Hierarchical data for the treemap. */
  data: TreemapNode;
  /** Chart width in pixels. Defaults to container width or 400. */
  width?: number;
  /** Chart height in pixels. Defaults to 300. */
  height?: number;
  /** Color palette for treemap tiles. */
  colors?: string[];
  /** When true, strips visual styles for trait composition. */
  unstyled?: boolean;
  /** Bridge binding ID. */
  bindId?: string;
  /** Additional CSS class. */
  className?: string;
}

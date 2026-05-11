import { TREEMAP_CHART_CLASSES, DEFAULT_TREEMAP_COLORS } from './TreemapChart.constants';

export function buildTreemapChartClasses(
  className: string | undefined,
  unstyled: boolean | undefined,
): string {
  const base = unstyled ? TREEMAP_CHART_CLASSES.unstyled : TREEMAP_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}

/** Pick a color from the palette based on leaf index. */
export function tileColor(index: number, colors: readonly string[]): string {
  return colors[index % colors.length];
}

/** Determine if text fits inside a rectangle. */
export function textFits(
  width: number,
  height: number,
  minWidth: number = 30,
  minHeight: number = 16,
): boolean {
  return width >= minWidth && height >= minHeight;
}

/** Truncate text to fit within a given pixel width (approximate). */
export function truncateLabel(label: string, availableWidth: number, fontSize: number = 11): string {
  const charWidth = fontSize * 0.6;
  const maxChars = Math.floor(availableWidth / charWidth);
  if (maxChars <= 0) return '';
  if (label.length <= maxChars) return label;
  if (maxChars <= 3) return label.slice(0, maxChars);
  return label.slice(0, maxChars - 1) + '\u2026';
}

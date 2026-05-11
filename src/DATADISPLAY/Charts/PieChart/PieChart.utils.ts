import type { PieChartDataPoint } from './PieChart.types';
import { PIE_CHART_CLASSES, PIE_COLOR_PALETTE } from './PieChart.constants';

export function buildPieChartClasses(
  className: string | undefined,
  unstyled: boolean | undefined,
): string {
  const base = unstyled ? PIE_CHART_CLASSES.unstyled : PIE_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}

export function getSliceColor(datum: PieChartDataPoint, index: number): string {
  return datum.color ?? PIE_COLOR_PALETTE[index % PIE_COLOR_PALETTE.length];
}

export function getSliceValue(d: PieChartDataPoint): number {
  return d.value;
}

import { scaleLinear } from '@visx/scale';
import type { GaugeThreshold } from './GaugeChart.types';
import { GAUGE_CHART_CLASSES } from './GaugeChart.constants';

export function buildGaugeChartClasses(
  className: string | undefined,
  unstyled: boolean | undefined,
): string {
  const base = unstyled ? GAUGE_CHART_CLASSES.unstyled : GAUGE_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}

/** Build a linear scale mapping value to angle (in radians). */
export function buildGaugeScale(min: number, max: number) {
  return scaleLinear<number>({
    domain: [min, max],
    range: [-Math.PI / 2, Math.PI / 2],
    clamp: true,
  });
}

/** Determine the fill color for the current value based on thresholds. */
export function getGaugeColor(
  value: number,
  defaultColor: string,
  thresholds?: GaugeThreshold[],
): string {
  if (!thresholds || thresholds.length === 0) return defaultColor;
  // Sort ascending
  const sorted = [...thresholds].sort((a, b) => a.value - b.value);
  let color = defaultColor;
  for (const t of sorted) {
    if (value >= t.value) {
      color = t.color;
    }
  }
  return color;
}

/** Create an arc path for a semicircle segment. */
export function arcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
): string {
  // Convert from -PI/2..PI/2 to canvas coordinates
  // Start from the left (-PI/2) to the right (PI/2) as a semicircle on top
  const startX = cx + innerRadius * Math.cos(startAngle - Math.PI);
  const startY = cy + innerRadius * Math.sin(startAngle - Math.PI);
  const outerStartX = cx + radius * Math.cos(startAngle - Math.PI);
  const outerStartY = cy + radius * Math.sin(startAngle - Math.PI);
  const outerEndX = cx + radius * Math.cos(endAngle - Math.PI);
  const outerEndY = cy + radius * Math.sin(endAngle - Math.PI);
  const innerEndX = cx + innerRadius * Math.cos(endAngle - Math.PI);
  const innerEndY = cy + innerRadius * Math.sin(endAngle - Math.PI);

  const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;

  return [
    `M ${outerStartX} ${outerStartY}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${startX} ${startY}`,
    'Z',
  ].join(' ');
}

/** Build the needle path as a thin triangle. */
export function needlePath(
  cx: number,
  cy: number,
  length: number,
  angle: number,
  baseWidth: number = 4,
): string {
  // Needle points from center outward at the given angle
  // Angle: -PI/2 = left, 0 = top, PI/2 = right
  const tipX = cx + length * Math.cos(angle - Math.PI);
  const tipY = cy + length * Math.sin(angle - Math.PI);
  const perpAngle = angle - Math.PI + Math.PI / 2;
  const baseX1 = cx + baseWidth * Math.cos(perpAngle);
  const baseY1 = cy + baseWidth * Math.sin(perpAngle);
  const baseX2 = cx - baseWidth * Math.cos(perpAngle);
  const baseY2 = cy - baseWidth * Math.sin(perpAngle);

  return `M ${baseX1} ${baseY1} L ${tipX} ${tipY} L ${baseX2} ${baseY2} Z`;
}

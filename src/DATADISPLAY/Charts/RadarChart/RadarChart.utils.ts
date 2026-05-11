import { scaleLinear } from '@visx/scale';
import type { RadarChartDataPoint } from './RadarChart.types';
import { RADAR_CHART_CLASSES } from './RadarChart.constants';

export function buildRadarChartClasses(
  className: string | undefined,
  unstyled: boolean | undefined,
): string {
  const base = unstyled ? RADAR_CHART_CLASSES.unstyled : RADAR_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}

export function buildRadarScale(data: RadarChartDataPoint[], radius: number) {
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  return scaleLinear<number>({
    domain: [0, maxValue],
    range: [0, radius],
  });
}

/** Convert a value on a given axis index to x, y coordinates. */
export function radarPoint(
  index: number,
  total: number,
  value: number,
  radius: number,
  maxValue: number,
): { x: number; y: number } {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / maxValue) * radius;
  return {
    x: r * Math.cos(angle),
    y: r * Math.sin(angle),
  };
}

/** Build the SVG polygon points string for the data shape. */
export function buildRadarPolygon(
  data: RadarChartDataPoint[],
  radius: number,
): string {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  return data
    .map((d, i) => {
      const pt = radarPoint(i, data.length, d.value, radius, maxValue);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');
}

/** Build concentric grid polygon points for a given level. */
export function buildGridPolygon(
  total: number,
  radius: number,
  level: number,
  levels: number,
): string {
  const r = (radius * level) / levels;
  const points: string[] = [];
  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    points.push(`${r * Math.cos(angle)},${r * Math.sin(angle)}`);
  }
  return points.join(' ');
}

/** Get the label position for a given axis. */
export function labelPosition(
  index: number,
  total: number,
  radius: number,
  offset: number = 16,
): { x: number; y: number; anchor: string } {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = radius + offset;
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  // Text anchor based on position
  let anchor = 'middle';
  if (Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI) < 0.1 || Math.abs(angle + Math.PI) < 0.1) {
    anchor = 'middle';
  } else if (Math.cos(angle) > 0.1) {
    anchor = 'start';
  } else if (Math.cos(angle) < -0.1) {
    anchor = 'end';
  }
  return { x, y, anchor };
}

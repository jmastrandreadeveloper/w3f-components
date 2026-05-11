import { scaleBand, scaleLinear } from '@visx/scale';
import type { BarChartDataPoint } from './BarChart.types';
import { BAR_CHART_CLASSES } from './BarChart.constants';

export function buildBarChartClasses(
  className: string | undefined,
  unstyled: boolean | undefined,
): string {
  const base = unstyled ? BAR_CHART_CLASSES.unstyled : BAR_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}

export function buildBarScales(
  data: BarChartDataPoint[],
  innerWidth: number,
  innerHeight: number,
  horizontal: boolean,
) {
  const labels = data.map((d) => d.label);
  const maxValue = Math.max(...data.map((d) => d.value), 0);

  if (horizontal) {
    const yScale = scaleBand<string>({
      domain: labels,
      range: [0, innerHeight],
      padding: 0.2,
    });
    const xScale = scaleLinear<number>({
      domain: [0, maxValue * 1.1],
      range: [0, innerWidth],
      nice: true,
    });
    return { xScale, yScale };
  }

  const xScale = scaleBand<string>({
    domain: labels,
    range: [0, innerWidth],
    padding: 0.2,
  });
  const yScale = scaleLinear<number>({
    domain: [0, maxValue * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });
  return { xScale, yScale };
}

export function formatTick(value: unknown): string {
  if (typeof value === 'number') {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
  }
  return String(value);
}

import { scaleLinear } from '@visx/scale';
import type { ScatterPlotDataPoint } from './ScatterPlot.types';
import { SCATTER_PLOT_CLASSES } from './ScatterPlot.constants';

export function buildScatterPlotClasses(
  className: string | undefined,
  unstyled: boolean | undefined,
): string {
  const base = unstyled ? SCATTER_PLOT_CLASSES.unstyled : SCATTER_PLOT_CLASSES.root;
  return className ? `${base} ${className}` : base;
}

export function buildScatterScales(
  data: ScatterPlotDataPoint[],
  innerWidth: number,
  innerHeight: number,
) {
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);

  const xScale = scaleLinear<number>({
    domain: [Math.min(...xValues) * 0.9, Math.max(...xValues) * 1.1],
    range: [0, innerWidth],
    nice: true,
  });

  const yScale = scaleLinear<number>({
    domain: [Math.min(0, Math.min(...yValues)), Math.max(...yValues) * 1.1],
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

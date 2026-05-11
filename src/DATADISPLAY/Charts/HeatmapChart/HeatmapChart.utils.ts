import { scaleBand, scaleLinear } from '@visx/scale';
import type { HeatmapDataPoint } from './HeatmapChart.types';
import { HEATMAP_CHART_CLASSES } from './HeatmapChart.constants';

export function buildHeatmapChartClasses(
  className: string | undefined,
  unstyled: boolean | undefined,
): string {
  const base = unstyled ? HEATMAP_CHART_CLASSES.unstyled : HEATMAP_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}

/** Extract unique rows and columns from data. */
export function extractAxes(data: HeatmapDataPoint[]) {
  const rows = [...new Set(data.map((d) => d.row))];
  const cols = [...new Set(data.map((d) => d.col))];
  return { rows, cols };
}

/** Build band scales for rows and columns, plus a linear color scale. */
export function buildHeatmapScales(
  data: HeatmapDataPoint[],
  innerWidth: number,
  innerHeight: number,
  colors: [string, string],
) {
  const { rows, cols } = extractAxes(data);
  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const xScale = scaleBand<string>({
    domain: cols,
    range: [0, innerWidth],
    padding: 0.05,
  });

  const yScale = scaleBand<string>({
    domain: rows,
    range: [0, innerHeight],
    padding: 0.05,
  });

  const colorScale = scaleLinear<string>({
    domain: [minVal, maxVal],
    range: colors,
  });

  return { xScale, yScale, colorScale };
}

/** Look up value for a specific row/col in the data array. */
export function getValue(
  data: HeatmapDataPoint[],
  row: string,
  col: string,
): number | undefined {
  const entry = data.find((d) => d.row === row && d.col === col);
  return entry?.value;
}

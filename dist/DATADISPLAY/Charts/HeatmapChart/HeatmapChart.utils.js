import { scaleBand, scaleLinear } from "@visx/scale";
import { HEATMAP_CHART_CLASSES } from "./HeatmapChart.constants";
function buildHeatmapChartClasses(className, unstyled) {
  const base = unstyled ? HEATMAP_CHART_CLASSES.unstyled : HEATMAP_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function extractAxes(data) {
  const rows = [...new Set(data.map((d) => d.row))];
  const cols = [...new Set(data.map((d) => d.col))];
  return { rows, cols };
}
function buildHeatmapScales(data, innerWidth, innerHeight, colors) {
  const { rows, cols } = extractAxes(data);
  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const xScale = scaleBand({
    domain: cols,
    range: [0, innerWidth],
    padding: 0.05
  });
  const yScale = scaleBand({
    domain: rows,
    range: [0, innerHeight],
    padding: 0.05
  });
  const colorScale = scaleLinear({
    domain: [minVal, maxVal],
    range: colors
  });
  return { xScale, yScale, colorScale };
}
function getValue(data, row, col) {
  const entry = data.find((d) => d.row === row && d.col === col);
  return entry?.value;
}
export {
  buildHeatmapChartClasses,
  buildHeatmapScales,
  extractAxes,
  getValue
};
//# sourceMappingURL=HeatmapChart.utils.js.map

import { BOXPLOT_ROOT_CLASS } from "./BoxPlot.constants";
import { buildChartRootClasses, buildBandScale, buildLinearScale, safeExtent, formatTick } from "../_base/utils";
function buildBoxPlotClasses(className, unstyled) {
  return buildChartRootClasses(BOXPLOT_ROOT_CLASS, className, unstyled);
}
function quantile(sorted, q) {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] !== void 0 ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base];
}
function computeStats(group) {
  const sorted = [...group.values].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const median = quantile(sorted, 0.5);
  const q3 = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
  const whiskerMin = Math.min(...sorted.filter((v) => v >= lowerFence));
  const whiskerMax = Math.max(...sorted.filter((v) => v <= upperFence));
  return {
    group: group.group,
    min: whiskerMin,
    firstQuartile: q1,
    median,
    thirdQuartile: q3,
    max: whiskerMax,
    outliers
  };
}
function buildBoxPlotScales(stats, innerWidth, innerHeight, yDomain) {
  const groups = stats.map((s) => s.group);
  const allValues = stats.flatMap((s) => [s.min, s.max, ...s.outliers]);
  const [yMin, yMax] = yDomain ?? safeExtent(allValues);
  const xScale = buildBandScale(groups, [0, innerWidth], 0.3);
  const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);
  return { xScale, yScale };
}
function buildTooltipContent(stats) {
  return `${stats.group}: med=${stats.median.toFixed(1)}, Q1=${stats.firstQuartile.toFixed(1)}, Q3=${stats.thirdQuartile.toFixed(1)}`;
}
export {
  buildBoxPlotClasses,
  buildBoxPlotScales,
  buildTooltipContent,
  computeStats,
  formatTick
};
//# sourceMappingURL=BoxPlot.utils.js.map

import { PIE_CHART_CLASSES, PIE_COLOR_PALETTE } from "./PieChart.constants";
function buildPieChartClasses(className, unstyled) {
  const base = unstyled ? PIE_CHART_CLASSES.unstyled : PIE_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function getSliceColor(datum, index) {
  return datum.color ?? PIE_COLOR_PALETTE[index % PIE_COLOR_PALETTE.length];
}
function getSliceValue(d) {
  return d.value;
}
export {
  buildPieChartClasses,
  getSliceColor,
  getSliceValue
};
//# sourceMappingURL=PieChart.utils.js.map

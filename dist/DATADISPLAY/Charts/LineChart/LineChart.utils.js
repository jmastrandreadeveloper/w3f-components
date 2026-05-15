import { scaleLinear } from "@visx/scale";
import { LINE_CHART_CLASSES } from "./LineChart.constants";
function buildLineChartClasses(className, unstyled) {
  const base = unstyled ? LINE_CHART_CLASSES.unstyled : LINE_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildLineScales(data, innerWidth, innerHeight) {
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const xScale = scaleLinear({
    domain: [Math.min(...xValues), Math.max(...xValues)],
    range: [0, innerWidth],
    nice: true
  });
  const yScale = scaleLinear({
    domain: [Math.min(0, Math.min(...yValues)), Math.max(...yValues) * 1.1],
    range: [innerHeight, 0],
    nice: true
  });
  return { xScale, yScale };
}
function formatTick(value) {
  if (typeof value === "number") {
    return value >= 1e3 ? `${(value / 1e3).toFixed(1)}k` : String(value);
  }
  return String(value);
}
export {
  buildLineChartClasses,
  buildLineScales,
  formatTick
};
//# sourceMappingURL=LineChart.utils.js.map

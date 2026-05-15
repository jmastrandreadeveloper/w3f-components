import { scaleLinear } from "@visx/scale";
import { AREA_CHART_CLASSES } from "./AreaChart.constants";
function buildAreaChartClasses(className, unstyled) {
  const base = unstyled ? AREA_CHART_CLASSES.unstyled : AREA_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildAreaScales(data, innerWidth, innerHeight) {
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const xScale = scaleLinear({
    domain: [Math.min(...xValues), Math.max(...xValues)],
    range: [0, innerWidth],
    nice: true
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...yValues) * 1.1],
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
  buildAreaChartClasses,
  buildAreaScales,
  formatTick
};
//# sourceMappingURL=AreaChart.utils.js.map

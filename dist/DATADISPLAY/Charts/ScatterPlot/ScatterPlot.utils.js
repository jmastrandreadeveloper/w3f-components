import { scaleLinear } from "@visx/scale";
import { SCATTER_PLOT_CLASSES } from "./ScatterPlot.constants";
function buildScatterPlotClasses(className, unstyled) {
  const base = unstyled ? SCATTER_PLOT_CLASSES.unstyled : SCATTER_PLOT_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildScatterScales(data, innerWidth, innerHeight) {
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const xScale = scaleLinear({
    domain: [Math.min(...xValues) * 0.9, Math.max(...xValues) * 1.1],
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
  buildScatterPlotClasses,
  buildScatterScales,
  formatTick
};
//# sourceMappingURL=ScatterPlot.utils.js.map

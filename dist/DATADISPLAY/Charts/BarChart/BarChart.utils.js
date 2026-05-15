import { scaleBand, scaleLinear } from "@visx/scale";
import { BAR_CHART_CLASSES } from "./BarChart.constants";
function buildBarChartClasses(className, unstyled) {
  const base = unstyled ? BAR_CHART_CLASSES.unstyled : BAR_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildBarScales(data, innerWidth, innerHeight, horizontal) {
  const labels = data.map((d) => d.label);
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  if (horizontal) {
    const yScale2 = scaleBand({
      domain: labels,
      range: [0, innerHeight],
      padding: 0.2
    });
    const xScale2 = scaleLinear({
      domain: [0, maxValue * 1.1],
      range: [0, innerWidth],
      nice: true
    });
    return { xScale: xScale2, yScale: yScale2 };
  }
  const xScale = scaleBand({
    domain: labels,
    range: [0, innerWidth],
    padding: 0.2
  });
  const yScale = scaleLinear({
    domain: [0, maxValue * 1.1],
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
  buildBarChartClasses,
  buildBarScales,
  formatTick
};
//# sourceMappingURL=BarChart.utils.js.map

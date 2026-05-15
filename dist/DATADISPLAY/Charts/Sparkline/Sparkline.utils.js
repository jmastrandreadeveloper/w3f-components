import { SPARKLINE_ROOT_CLASS } from "./Sparkline.constants";
import { buildChartRootClasses } from "../_base/utils";
import { scaleLinear } from "@visx/scale";
function buildSparklineClasses(className, unstyled) {
  return buildChartRootClasses(SPARKLINE_ROOT_CLASS, className, unstyled);
}
function buildSparklineScales(data, width, height, padding = 2) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const xScale = scaleLinear({
    domain: [0, data.length - 1],
    range: [padding, width - padding]
  });
  const yScale = scaleLinear({
    domain: [min - span * 0.05, max + span * 0.05],
    range: [height - padding, padding]
  });
  return { xScale, yScale, min, max };
}
function buildSparklinePath(data, xScale, yScale) {
  if (data.length === 0) return "";
  const points = data.map((v, i) => `${xScale(i)},${yScale(v)}`);
  return `M${points.join("L")}`;
}
function buildAreaPath(data, xScale, yScale, height, padding) {
  if (data.length === 0) return "";
  const line = data.map((v, i) => `${xScale(i)},${yScale(v)}`);
  return `M${xScale(0)},${height - padding}L${line.join("L")}L${xScale(data.length - 1)},${height - padding}Z`;
}
export {
  buildAreaPath,
  buildSparklineClasses,
  buildSparklinePath,
  buildSparklineScales
};
//# sourceMappingURL=Sparkline.utils.js.map

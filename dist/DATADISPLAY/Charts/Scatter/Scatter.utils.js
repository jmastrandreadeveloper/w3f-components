import { SCATTER_ROOT_CLASS } from "./Scatter.constants";
import { buildChartRootClasses, buildLinearScale, safeExtent, formatTick } from "../_base/utils";
function buildScatterClasses(className, unstyled) {
  return buildChartRootClasses(SCATTER_ROOT_CLASS, className, unstyled);
}
function buildScatterScales(data, innerWidth, innerHeight, getX, getY, xDomain, yDomain) {
  const xs = data.map(getX);
  const ys = data.map(getY);
  const [xMin, xMax] = xDomain ?? safeExtent(xs);
  const [yMin, yMax] = yDomain ?? safeExtent(ys);
  const xScale = buildLinearScale(xMin, xMax, [0, innerWidth]);
  const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);
  return { xScale, yScale };
}
const defaultGetX = (d) => d.x;
const defaultGetY = (d) => d.y;
const defaultGetR = (d) => d.r ?? 5;
const defaultGetLabel = (d) => d.label ?? "";
function buildTooltipContent(datum, getX, getY) {
  const label = datum.label ? `${datum.label}: ` : "";
  return `${label}(${getX(datum).toLocaleString()}, ${getY(datum).toLocaleString()})`;
}
export {
  buildScatterClasses,
  buildScatterScales,
  buildTooltipContent,
  defaultGetLabel,
  defaultGetR,
  defaultGetX,
  defaultGetY,
  formatTick
};
//# sourceMappingURL=Scatter.utils.js.map

import { BUBBLE_ROOT_CLASS } from "./Bubble.constants";
import { buildChartRootClasses, buildLinearScale, safeExtent, formatTick } from "../_base/utils";
import { scaleLinear } from "@visx/scale";
function buildBubbleClasses(className, unstyled) {
  return buildChartRootClasses(BUBBLE_ROOT_CLASS, className, unstyled);
}
function buildBubbleScales(data, innerWidth, innerHeight, getX, getY, getR, minRadius, maxRadius, xDomain, yDomain) {
  const xs = data.map(getX);
  const ys = data.map(getY);
  const rs = data.map(getR);
  const [xMin, xMax] = xDomain ?? safeExtent(xs);
  const [yMin, yMax] = yDomain ?? safeExtent(ys);
  const [rMin, rMax] = safeExtent(rs);
  const xScale = buildLinearScale(xMin, xMax, [0, innerWidth]);
  const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);
  const rScale = scaleLinear({ domain: [rMin, rMax], range: [minRadius, maxRadius] });
  return { xScale, yScale, rScale };
}
const defaultGetX = (d) => d.x;
const defaultGetY = (d) => d.y;
const defaultGetR = (d) => d.r ?? 10;
const defaultGetLabel = (d) => d.label ?? "";
function buildTooltipContent(datum, getX, getY, getR) {
  const label = datum.label ? `${datum.label}: ` : "";
  return `${label}(${getX(datum)}, ${getY(datum)}) r=${getR(datum)}`;
}
export {
  buildBubbleClasses,
  buildBubbleScales,
  buildTooltipContent,
  defaultGetLabel,
  defaultGetR,
  defaultGetX,
  defaultGetY,
  formatTick
};
//# sourceMappingURL=Bubble.utils.js.map

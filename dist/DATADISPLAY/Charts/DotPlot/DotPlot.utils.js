import { DOTPLOT_ROOT_CLASS } from "./DotPlot.constants";
import { buildChartRootClasses, buildLinearScale, buildBandScale, safeExtent, formatTick } from "../_base/utils";
function buildDotPlotClasses(className, unstyled) {
  return buildChartRootClasses(DOTPLOT_ROOT_CLASS, className, unstyled);
}
function buildDotPlotScales(data, categories, innerWidth, innerHeight, getX, xDomain) {
  const xs = data.map(getX);
  const [xMin, xMax] = xDomain ?? safeExtent(xs);
  const xScale = buildLinearScale(xMin, xMax, [0, innerWidth], { padding: 0.05 });
  const yScale = buildBandScale(categories, [0, innerHeight], 0.3);
  return { xScale, yScale };
}
const defaultGetX = (d) => d.x;
const defaultGetCategory = (d) => d.y;
function buildTooltipContent(datum, getX, category) {
  return `${category}: ${getX(datum).toLocaleString()}`;
}
export {
  buildDotPlotClasses,
  buildDotPlotScales,
  buildTooltipContent,
  defaultGetCategory,
  defaultGetX,
  formatTick
};
//# sourceMappingURL=DotPlot.utils.js.map

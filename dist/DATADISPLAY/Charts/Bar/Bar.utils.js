import { BAR_ROOT_CLASS } from "./Bar.constants";
import {
  buildChartRootClasses,
  buildBandScale,
  buildLinearScale,
  safeExtent,
  formatTick
} from "../_base/utils";
function buildBarClasses(className, unstyled) {
  return buildChartRootClasses(BAR_ROOT_CLASS, className, unstyled);
}
function buildBarScales(data, innerWidth, innerHeight, getLabel, getValue, padding, yDomain) {
  const labels = data.map((d) => String(getLabel(d)));
  const values = data.map(getValue);
  const [minVal, maxVal] = yDomain ?? safeExtent(values);
  const xScale = buildBandScale(labels, [0, innerWidth], padding);
  const yScale = buildLinearScale(minVal, maxVal, [innerHeight, 0]);
  return { xScale, yScale };
}
const defaultGetLabel = (d) => d.label;
const defaultGetValue = (d) => d.value;
function buildTooltipContent(datum, getLabel, getValue) {
  return `${getLabel(datum)}: ${getValue(datum).toLocaleString()}`;
}
export {
  buildBarClasses,
  buildBarScales,
  buildTooltipContent,
  defaultGetLabel,
  defaultGetValue,
  formatTick
};
//# sourceMappingURL=Bar.utils.js.map

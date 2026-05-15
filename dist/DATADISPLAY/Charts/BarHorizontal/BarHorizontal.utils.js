import { BAR_H_ROOT_CLASS } from "./BarHorizontal.constants";
import {
  buildChartRootClasses,
  buildBandScale,
  buildLinearScale,
  safeExtent,
  formatTick
} from "../_base/utils";
function buildBarHClasses(className, unstyled) {
  return buildChartRootClasses(BAR_H_ROOT_CLASS, className, unstyled);
}
function buildBarHScales(data, innerWidth, innerHeight, getLabel, getValue, padding, xDomain) {
  const labels = data.map((d) => String(getLabel(d)));
  const values = data.map(getValue);
  const [minVal, maxVal] = xDomain ?? safeExtent(values);
  const yScale = buildBandScale(labels, [0, innerHeight], padding);
  const xScale = buildLinearScale(minVal, maxVal, [0, innerWidth]);
  return { xScale, yScale };
}
const defaultGetLabel = (d) => d.label;
const defaultGetValue = (d) => d.value;
function buildTooltipContent(datum, getLabel, getValue) {
  return `${getLabel(datum)}: ${getValue(datum).toLocaleString()}`;
}
export {
  buildBarHClasses,
  buildBarHScales,
  buildTooltipContent,
  defaultGetLabel,
  defaultGetValue,
  formatTick
};
//# sourceMappingURL=BarHorizontal.utils.js.map

import { PIE_ROOT_CLASS } from "./Pie.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildPieClasses(className, unstyled) {
  return buildChartRootClasses(PIE_ROOT_CLASS, className, unstyled);
}
const defaultGetValue = (d) => d.value;
const defaultGetLabel = (d) => d.label;
function buildPieColors(data, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return data.map((d, i) => d.color ?? palette[i % palette.length]);
}
function buildTooltipContent(d, getValue) {
  return `${d.label}: ${getValue(d).toLocaleString()}`;
}
function centroidAngle(startAngle, endAngle) {
  return (startAngle + endAngle) / 2;
}
function labelFits(startAngle, endAngle, minAngle = 0.35) {
  return endAngle - startAngle > minAngle;
}
export {
  buildPieClasses,
  buildPieColors,
  buildTooltipContent,
  centroidAngle,
  defaultGetLabel,
  defaultGetValue,
  labelFits
};
//# sourceMappingURL=Pie.utils.js.map

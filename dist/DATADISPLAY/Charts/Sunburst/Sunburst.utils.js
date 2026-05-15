import { SUNBURST_ROOT_CLASS } from "./Sunburst.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildSunburstClasses(className, unstyled) {
  return buildChartRootClasses(SUNBURST_ROOT_CLASS, className, unstyled);
}
function buildSunburstColors(count, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
function buildTooltipContent(node) {
  return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ""}`;
}
function arcLabelFits(startAngle, endAngle, depth) {
  const angle = endAngle - startAngle;
  return angle > 0.3 && depth <= 2;
}
export {
  arcLabelFits,
  buildSunburstClasses,
  buildSunburstColors,
  buildTooltipContent
};
//# sourceMappingURL=Sunburst.utils.js.map

import { POLAR_BAR_ROOT_CLASS } from "./PolarBar.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildPolarBarClasses(className, unstyled) {
  return buildChartRootClasses(POLAR_BAR_ROOT_CLASS, className, unstyled);
}
function buildPolarBarColors(count, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
function buildTooltipContent(d) {
  return `${d.label}: ${d.value.toLocaleString()}`;
}
export {
  buildPolarBarClasses,
  buildPolarBarColors,
  buildTooltipContent
};
//# sourceMappingURL=PolarBar.utils.js.map

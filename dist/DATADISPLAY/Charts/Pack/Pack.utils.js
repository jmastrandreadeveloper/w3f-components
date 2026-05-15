import { PACK_ROOT_CLASS } from "./Pack.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildPackClasses(className, unstyled) {
  return buildChartRootClasses(PACK_ROOT_CLASS, className, unstyled);
}
function buildPackColors(leafCount, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: leafCount }, (_, i) => palette[i % palette.length]);
}
function buildTooltipContent(node) {
  return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ""}`;
}
export {
  buildPackClasses,
  buildPackColors,
  buildTooltipContent
};
//# sourceMappingURL=Pack.utils.js.map

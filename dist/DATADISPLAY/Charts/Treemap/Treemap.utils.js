import { TREEMAP_ROOT_CLASS } from "./Treemap.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildTreemapClasses(className, unstyled) {
  return buildChartRootClasses(TREEMAP_ROOT_CLASS, className, unstyled);
}
function buildTreemapColors(leafCount, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: leafCount }, (_, i) => palette[i % palette.length]);
}
function textFits(w, h, minW = 30, minH = 16) {
  return w > minW && h > minH;
}
function truncateLabel(label, maxWidth, fontSize = 11) {
  const charW = fontSize * 0.6;
  const maxChars = Math.floor(maxWidth / charW);
  if (label.length <= maxChars) return label;
  return maxChars > 2 ? label.slice(0, maxChars - 1) + "\u2026" : "";
}
function buildTooltipContent(node) {
  return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ""}`;
}
export {
  buildTooltipContent,
  buildTreemapClasses,
  buildTreemapColors,
  textFits,
  truncateLabel
};
//# sourceMappingURL=Treemap.utils.js.map

import { TREE_DIAGRAM_ROOT_CLASS } from "./TreeDiagram.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildTreeDiagramClasses(className, unstyled) {
  return buildChartRootClasses(TREE_DIAGRAM_ROOT_CLASS, className, unstyled);
}
function buildTreeDiagramColors(count, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
function buildTooltipContent(node) {
  return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ""}`;
}
export {
  buildTooltipContent,
  buildTreeDiagramClasses,
  buildTreeDiagramColors
};
//# sourceMappingURL=TreeDiagram.utils.js.map

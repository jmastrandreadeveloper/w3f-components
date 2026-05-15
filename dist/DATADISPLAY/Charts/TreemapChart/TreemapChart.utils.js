import { TREEMAP_CHART_CLASSES } from "./TreemapChart.constants";
function buildTreemapChartClasses(className, unstyled) {
  const base = unstyled ? TREEMAP_CHART_CLASSES.unstyled : TREEMAP_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function tileColor(index, colors) {
  return colors[index % colors.length];
}
function textFits(width, height, minWidth = 30, minHeight = 16) {
  return width >= minWidth && height >= minHeight;
}
function truncateLabel(label, availableWidth, fontSize = 11) {
  const charWidth = fontSize * 0.6;
  const maxChars = Math.floor(availableWidth / charWidth);
  if (maxChars <= 0) return "";
  if (label.length <= maxChars) return label;
  if (maxChars <= 3) return label.slice(0, maxChars);
  return label.slice(0, maxChars - 1) + "\u2026";
}
export {
  buildTreemapChartClasses,
  textFits,
  tileColor,
  truncateLabel
};
//# sourceMappingURL=TreemapChart.utils.js.map

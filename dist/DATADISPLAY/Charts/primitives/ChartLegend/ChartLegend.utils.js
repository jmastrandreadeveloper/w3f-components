import { CHART_LEGEND_CLASSES, CHART_LEGEND_DEFAULTS } from "./ChartLegend.constants";
function buildLegendClasses(direction, className) {
  const dir = direction ?? CHART_LEGEND_DEFAULTS.direction;
  const parts = [
    CHART_LEGEND_CLASSES.root,
    dir === "vertical" ? CHART_LEGEND_CLASSES.vertical : CHART_LEGEND_CLASSES.horizontal
  ];
  if (className) parts.push(className);
  return parts.join(" ");
}
function buildItemClasses(disabled, clickable) {
  const parts = [CHART_LEGEND_CLASSES.item];
  if (disabled) parts.push(CHART_LEGEND_CLASSES.itemDisabled);
  if (clickable) parts.push(CHART_LEGEND_CLASSES.itemClickable);
  return parts.join(" ");
}
function getSwatchStyle(color, shape, disabled) {
  return {
    display: "inline-block",
    width: "var(--w3f-chart-legend-swatch-size, 12px)",
    height: shape === "line" ? "2px" : "var(--w3f-chart-legend-swatch-size, 12px)",
    borderRadius: shape === "circle" ? "50%" : shape === "line" ? "0" : "var(--w3f-chart-legend-swatch-radius, 2px)",
    backgroundColor: disabled ? "#94a3b8" : color,
    flexShrink: 0
  };
}
export {
  buildItemClasses,
  buildLegendClasses,
  getSwatchStyle
};
//# sourceMappingURL=ChartLegend.utils.js.map

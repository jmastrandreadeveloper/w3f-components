import { CHART_TOOLTIP_CLASSES } from "./ChartTooltip.constants";
function buildTooltipClasses(visible, className) {
  const parts = [CHART_TOOLTIP_CLASSES.root];
  if (!visible) parts.push(CHART_TOOLTIP_CLASSES.hidden);
  if (className) parts.push(className);
  return parts.join(" ");
}
export {
  buildTooltipClasses
};
//# sourceMappingURL=ChartTooltip.utils.js.map

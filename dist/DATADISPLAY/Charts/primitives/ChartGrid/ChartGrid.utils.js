import { CHART_GRID_CLASSES } from "./ChartGrid.constants";
function buildGridClasses(axis, className) {
  const parts = [CHART_GRID_CLASSES.root];
  if (axis === "rows" || axis === "both") parts.push(CHART_GRID_CLASSES.rows);
  if (axis === "columns" || axis === "both") parts.push(CHART_GRID_CLASSES.columns);
  if (className) parts.push(className);
  return parts.join(" ");
}
export {
  buildGridClasses
};
//# sourceMappingURL=ChartGrid.utils.js.map

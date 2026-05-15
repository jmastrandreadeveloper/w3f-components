import { BUTTON_GRID_CLASSES, BUTTON_GRID_ALIGN_MAP } from "./ButtonGrid.constants";
function buildButtonGridClasses(align = "start", className) {
  return [
    BUTTON_GRID_CLASSES.base,
    BUTTON_GRID_CLASSES.gap,
    BUTTON_GRID_CLASSES.wrap,
    BUTTON_GRID_CLASSES.mt,
    BUTTON_GRID_ALIGN_MAP[align],
    className
  ].filter(Boolean).join(" ");
}
export {
  buildButtonGridClasses
};
//# sourceMappingURL=ButtonGrid.utils.js.map

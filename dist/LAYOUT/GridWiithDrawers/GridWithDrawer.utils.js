import { GRID_DRAWER_CLASSES } from "./GridWithDrawer.constants";
function buildDrawerWrapperClasses(isDrawerArea, isDrawerOpen) {
  return [
    GRID_DRAWER_CLASSES.wrapper,
    isDrawerArea ? GRID_DRAWER_CLASSES.drawerArea : "",
    isDrawerArea && !isDrawerOpen ? GRID_DRAWER_CLASSES.collapsed : ""
  ].filter(Boolean).join(" ");
}
export {
  buildDrawerWrapperClasses
};
//# sourceMappingURL=GridWithDrawer.utils.js.map

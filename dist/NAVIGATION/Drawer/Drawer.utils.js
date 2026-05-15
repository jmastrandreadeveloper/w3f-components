import { DRAWER_CLASSES } from "./Drawer.constants";
function buildDrawerClasses(anchor, variant, color, visible, open, className, unstyled) {
  if (unstyled) {
    return [DRAWER_CLASSES.drawer, "w3f-drawer--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    DRAWER_CLASSES.drawer,
    `w3f-drawer--${anchor}`,
    `w3f-drawer--${variant}`,
    color !== "default" && `w3f-drawer--${color}`,
    visible && open && DRAWER_CLASSES.open,
    className
  ].filter(Boolean).join(" ");
}
function buildDrawerSizeStyle(anchor, width, height) {
  const isHorizontal = anchor === "left" || anchor === "right";
  return isHorizontal ? { width: typeof width === "number" ? `${width}px` : width } : { height: typeof height === "number" ? `${height}px` : height };
}
export {
  buildDrawerClasses,
  buildDrawerSizeStyle
};
//# sourceMappingURL=Drawer.utils.js.map

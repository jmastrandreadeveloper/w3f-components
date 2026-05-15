import { APP_BAR_CLASSES } from "./AppBar.constants";
function buildAppBarClasses(color, position, size, elevated, className, unstyled) {
  if (unstyled) {
    return [
      APP_BAR_CLASSES.root,
      "w3f-app-bar--unstyled",
      position === "fixed" && APP_BAR_CLASSES.fixed,
      position === "sticky" && APP_BAR_CLASSES.sticky,
      className
    ].filter(Boolean).join(" ");
  }
  return [
    APP_BAR_CLASSES.root,
    color !== "primary" && APP_BAR_CLASSES[color],
    color === "primary" && APP_BAR_CLASSES.primary,
    position === "fixed" && APP_BAR_CLASSES.fixed,
    position === "sticky" && APP_BAR_CLASSES.sticky,
    size === "sm" && APP_BAR_CLASSES.sm,
    size === "lg" && APP_BAR_CLASSES.lg,
    elevated && APP_BAR_CLASSES.elevated,
    className
  ].filter(Boolean).join(" ");
}
export {
  buildAppBarClasses
};
//# sourceMappingURL=AppBar.utils.js.map

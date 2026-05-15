import { BOTTOM_NAV_CLASSES } from "./BottomNavigation.constants";
function buildBottomNavClasses(variant, color, fixed, disabled, className, unstyled) {
  const base = BOTTOM_NAV_CLASSES.nav;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    `w3f-bottom-nav--${variant}`,
    `w3f-bottom-nav--${color}`,
    fixed && "w3f-bottom-nav--fixed",
    disabled && "w3f-bottom-nav--disabled",
    className
  ].filter(Boolean).join(" ");
}
function buildActionClasses(isActive, disabled, showLabel, className) {
  return [
    BOTTOM_NAV_CLASSES.action,
    isActive && BOTTOM_NAV_CLASSES.actionActive,
    disabled && BOTTOM_NAV_CLASSES.actionDisabled,
    !showLabel && !isActive && BOTTOM_NAV_CLASSES.actionIconOnly,
    className
  ].filter(Boolean).join(" ");
}
function formatBadge(badge) {
  if (typeof badge === "number" && badge > 99) return "99+";
  return badge;
}
export {
  buildActionClasses,
  buildBottomNavClasses,
  formatBadge
};
//# sourceMappingURL=BottomNavigation.utils.js.map

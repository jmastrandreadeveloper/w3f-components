import { FAB_CLASSES } from "./FloatingActionButton.constants";
function buildFabClasses(size, color, position, extended, hasText, mobileIconOnly, disabled, hasError, className, unstyled) {
  if (unstyled) {
    return [FAB_CLASSES.base, "w3f-fab--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    FAB_CLASSES.base,
    FAB_CLASSES.sizes[size],
    FAB_CLASSES.colors[color],
    position.includes("left") && FAB_CLASSES.positions.left,
    position.includes("center") && FAB_CLASSES.positions.center,
    position.includes("top") && FAB_CLASSES.positions.top,
    (extended || hasText) && FAB_CLASSES.extended,
    mobileIconOnly && extended && FAB_CLASSES.mobileIconOnly,
    disabled && FAB_CLASSES.disabled,
    hasError && FAB_CLASSES.error,
    className
  ].filter(Boolean).join(" ");
}
function buildFabStyle(position, offset) {
  const style = {};
  if (position.includes("bottom")) {
    style.bottom = `${offset}px`;
  } else if (position.includes("top")) {
    style.top = `${offset}px`;
  }
  return style;
}
function buildFabMessageStyle(position, offset) {
  return {
    position: "fixed",
    bottom: position.includes("bottom") ? `${offset + 72}px` : "auto",
    top: position.includes("top") ? `${offset + 72}px` : "auto",
    right: position.includes("right") ? "var(--w3f-space-6)" : "auto",
    transform: position.includes("center") ? "translateX(-50%)" : "none",
    left: position.includes("center") ? "50%" : position.includes("left") ? "var(--w3f-space-6)" : "auto",
    zIndex: 1e3,
    maxWidth: "200px"
  };
}
function buildFabGroupClasses(isOpen, className) {
  return [FAB_CLASSES.group, isOpen && FAB_CLASSES.groupOpen, className].filter(Boolean).join(" ");
}
export {
  buildFabClasses,
  buildFabGroupClasses,
  buildFabMessageStyle,
  buildFabStyle
};
//# sourceMappingURL=FloatingActionButton.utils.js.map

import { SPEED_DIAL_CLASSES } from "./SpeedDial.constants";
function defaultTooltipPlacement(direction) {
  switch (direction) {
    case "up":
    case "down":
      return "left";
    case "left":
    case "right":
      return "top";
    default:
      return "left";
  }
}
function buildSpeedDialClasses(position, isOpen, hidden, className, unstyled) {
  const base = SPEED_DIAL_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    `w3f-speed-dial--${position}`,
    isOpen && SPEED_DIAL_CLASSES.open,
    hidden && SPEED_DIAL_CLASSES.hidden,
    className
  ].filter(Boolean).join(" ");
}
function buildFabClasses(color, size) {
  return [
    SPEED_DIAL_CLASSES.fab,
    `w3f-speed-dial__fab--${color}`,
    size !== "default" && `w3f-speed-dial__fab--${size}`
  ].filter(Boolean).join(" ");
}
function buildActionsClasses(direction) {
  return [SPEED_DIAL_CLASSES.actions, `w3f-speed-dial__actions--${direction}`].filter(Boolean).join(" ");
}
function buildActionFabClasses(color, className) {
  return [
    SPEED_DIAL_CLASSES.actionFab,
    color && `w3f-speed-dial-action__fab--${color}`,
    className
  ].filter(Boolean).join(" ");
}
function buildActionTooltipClasses(placement, tooltipOpen) {
  return [
    SPEED_DIAL_CLASSES.actionTooltip,
    `w3f-speed-dial-action__tooltip--${placement}`,
    tooltipOpen && SPEED_DIAL_CLASSES.actionTooltipOpen
  ].filter(Boolean).join(" ");
}
function buildOffsetStyle(position, offset) {
  if (offset === void 0) return void 0;
  const style = {};
  if (position.includes("bottom")) style.bottom = `${offset}px`;
  if (position.includes("top")) style.top = `${offset}px`;
  if (position.includes("right")) style.right = `${offset}px`;
  if (position.includes("left")) style.left = `${offset}px`;
  return style;
}
export {
  buildActionFabClasses,
  buildActionTooltipClasses,
  buildActionsClasses,
  buildFabClasses,
  buildOffsetStyle,
  buildSpeedDialClasses,
  defaultTooltipPlacement
};
//# sourceMappingURL=SpeedDial.utils.js.map

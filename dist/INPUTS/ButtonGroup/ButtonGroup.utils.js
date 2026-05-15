import { BUTTON_GROUP_CLASSES } from "./ButtonGroup.constants";
function buildButtonGroupClasses(orientation, fullWidth, disabled, responsive, className, unstyled) {
  const base = BUTTON_GROUP_CLASSES.base;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    orientation === "vertical" ? BUTTON_GROUP_CLASSES.vertical : BUTTON_GROUP_CLASSES.horizontal,
    fullWidth && BUTTON_GROUP_CLASSES.fullWidth,
    disabled && BUTTON_GROUP_CLASSES.disabled,
    responsive && BUTTON_GROUP_CLASSES.responsive,
    className
  ].filter(Boolean).join(" ");
}
function getButtonPosition(index, total) {
  if (total === 1) return "first";
  if (index === 0) return "first";
  if (index === total - 1) return "last";
  return "middle";
}
export {
  buildButtonGroupClasses,
  getButtonPosition
};
//# sourceMappingURL=ButtonGroup.utils.js.map

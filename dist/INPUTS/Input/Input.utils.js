import { INPUT_CLASSES, INPUT_SIZE_CLASSES, INPUT_VARIANT_CLASSES } from "./Input.constants";
function buildInputClasses(hasLeading, hasTrailing, className, unstyled, variant) {
  if (unstyled) {
    return [
      INPUT_CLASSES.base,
      "w3f-input--unstyled",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    INPUT_CLASSES.base,
    hasLeading && INPUT_CLASSES.hasLeading,
    hasTrailing && INPUT_CLASSES.hasTrailing,
    variant && INPUT_VARIANT_CLASSES[variant],
    className
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isFloating, showShifted) {
  return [
    INPUT_CLASSES.label,
    isFloating && INPUT_CLASSES.labelFloating,
    showShifted && INPUT_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
function buildIconClasses(position, isClickable) {
  return [
    INPUT_CLASSES.icon,
    position === "leading" ? INPUT_CLASSES.iconLeading : INPUT_CLASSES.iconTrailing,
    isClickable && INPUT_CLASSES.iconClickable
  ].filter(Boolean).join(" ");
}
function buildWrapperClasses(size) {
  return [
    INPUT_CLASSES.wrapper,
    size && INPUT_SIZE_CLASSES[size]
  ].filter(Boolean).join(" ");
}
function buildContainerClasses(className, unstyled) {
  return [
    INPUT_CLASSES.container,
    unstyled && "w3f-input-container--unstyled",
    className
  ].filter(Boolean).join(" ");
}
export {
  buildContainerClasses,
  buildIconClasses,
  buildInputClasses,
  buildLabelClasses,
  buildWrapperClasses
};
//# sourceMappingURL=Input.utils.js.map

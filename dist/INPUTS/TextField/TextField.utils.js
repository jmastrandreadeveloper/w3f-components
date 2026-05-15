import { TEXTFIELD_CLASSES } from "./TextField.constants";
function stripDigits(value) {
  return value.replace(/\d/g, "");
}
function isDigitKey(key) {
  return /^\d$/.test(key);
}
function buildContainerClasses(className, unstyled) {
  const base = TEXTFIELD_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function buildWrapperClasses(size) {
  return [
    TEXTFIELD_CLASSES.wrapper,
    TEXTFIELD_CLASSES.wrapperSizes[size]
  ].filter(Boolean).join(" ");
}
function buildInputClasses(hasLeading, hasTrailing) {
  return [
    TEXTFIELD_CLASSES.input,
    hasLeading && TEXTFIELD_CLASSES.hasLeading,
    hasTrailing && TEXTFIELD_CLASSES.hasTrailing
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isFloating, showShifted) {
  return [
    TEXTFIELD_CLASSES.label,
    isFloating && TEXTFIELD_CLASSES.labelFloating,
    showShifted && TEXTFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
export {
  buildContainerClasses,
  buildInputClasses,
  buildLabelClasses,
  buildWrapperClasses,
  isDigitKey,
  stripDigits
};
//# sourceMappingURL=TextField.utils.js.map

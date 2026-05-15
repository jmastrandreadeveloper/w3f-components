import { EMAILFIELD_CLASSES } from "./EmailField.constants";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(value) {
  return EMAIL_REGEX.test(value);
}
function buildContainerClasses(className, unstyled) {
  const base = EMAILFIELD_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function buildWrapperClasses(size) {
  return [
    EMAILFIELD_CLASSES.wrapper,
    EMAILFIELD_CLASSES.wrapperSizes[size]
  ].filter(Boolean).join(" ");
}
function buildInputClasses() {
  return [
    EMAILFIELD_CLASSES.input,
    EMAILFIELD_CLASSES.hasLeading
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isFloating) {
  return [
    EMAILFIELD_CLASSES.label,
    isFloating && EMAILFIELD_CLASSES.labelFloating,
    !isFloating && EMAILFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
export {
  EMAIL_REGEX,
  buildContainerClasses,
  buildInputClasses,
  buildLabelClasses,
  buildWrapperClasses,
  isValidEmail
};
//# sourceMappingURL=EmailField.utils.js.map

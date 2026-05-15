import { PASSWORDFIELD_CLASSES } from "./PasswordField.constants";
function getPasswordStrength(password) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ];
  const score = checks.filter(Boolean).length;
  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}
function buildContainerClasses(className, unstyled) {
  const base = PASSWORDFIELD_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function buildWrapperClasses(size) {
  return [
    PASSWORDFIELD_CLASSES.wrapper,
    PASSWORDFIELD_CLASSES.wrapperSizes[size]
  ].filter(Boolean).join(" ");
}
function buildInputClasses() {
  return [
    PASSWORDFIELD_CLASSES.input,
    PASSWORDFIELD_CLASSES.hasLeading,
    PASSWORDFIELD_CLASSES.hasTrailing
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isFloating) {
  return [
    PASSWORDFIELD_CLASSES.label,
    isFloating && PASSWORDFIELD_CLASSES.labelFloating,
    !isFloating && PASSWORDFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
function buildStrengthSegmentClasses(segmentIndex, activeSegments, strength) {
  const isActive = segmentIndex < activeSegments;
  return [
    PASSWORDFIELD_CLASSES.strengthSegment,
    isActive && PASSWORDFIELD_CLASSES.strengthSegmentActive,
    isActive && PASSWORDFIELD_CLASSES.strengthModifiers[strength]
  ].filter(Boolean).join(" ");
}
export {
  buildContainerClasses,
  buildInputClasses,
  buildLabelClasses,
  buildStrengthSegmentClasses,
  buildWrapperClasses,
  getPasswordStrength
};
//# sourceMappingURL=PasswordField.utils.js.map

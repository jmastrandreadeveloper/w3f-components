import { NUMBERFIELD_CLASSES, NUMBERFIELD_VARIANT_CLASSES } from "./NumberField.constants";
function roundToPrecision(num, precision) {
  if (precision === void 0) return num;
  return Number(num.toFixed(precision));
}
function clampValue(num, min, max, precision) {
  const clamped = Math.max(min, Math.min(max, num));
  return roundToPrecision(clamped, precision);
}
function isValidNumber(str) {
  if (str === "" || str === "-" || str === ".") return false;
  return !isNaN(Number(str));
}
function formatValue(val, precision) {
  if (val === "" || val === null || val === void 0) return "";
  const num = Number(val);
  if (isNaN(num)) return "";
  return precision !== void 0 ? num.toFixed(precision) : String(num);
}
function buildWrapperClasses(size, unstyled, variant) {
  if (unstyled) {
    return [
      NUMBERFIELD_CLASSES.wrapper,
      "w3f-number-field--unstyled"
    ].filter(Boolean).join(" ");
  }
  return [
    NUMBERFIELD_CLASSES.wrapper,
    size !== "md" ? NUMBERFIELD_CLASSES.wrapperSizes[size] : "",
    variant && NUMBERFIELD_VARIANT_CLASSES[variant]
  ].filter(Boolean).join(" ");
}
function buildInputClasses(hasLeading, className) {
  return [
    NUMBERFIELD_CLASSES.input,
    hasLeading && NUMBERFIELD_CLASSES.inputWithLeading,
    className
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isFloating, showShifted) {
  return [
    NUMBERFIELD_CLASSES.label,
    isFloating && NUMBERFIELD_CLASSES.labelFloating,
    showShifted && NUMBERFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
export {
  buildInputClasses,
  buildLabelClasses,
  buildWrapperClasses,
  clampValue,
  formatValue,
  isValidNumber,
  roundToPrecision
};
//# sourceMappingURL=NumberField.utils.js.map

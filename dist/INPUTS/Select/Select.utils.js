import { SELECT_CLASSES, SELECT_VARIANT_CLASSES } from "./Select.constants";
function isOptionGroup(item) {
  return "options" in item && Array.isArray(item.options);
}
function buildSelectClasses(hasLeading, hasTrailing, unstyled, variant) {
  if (unstyled) {
    return [SELECT_CLASSES.select, "w3f-select--unstyled"].join(" ");
  }
  return [
    SELECT_CLASSES.select,
    hasLeading && SELECT_CLASSES.hasLeading,
    hasTrailing && SELECT_CLASSES.hasTrailing,
    variant && SELECT_VARIANT_CLASSES[variant]
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isFloating, showShifted) {
  return [
    SELECT_CLASSES.label,
    isFloating && SELECT_CLASSES.labelFloating,
    showShifted && SELECT_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
function hasSelectValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  return value !== "" && value !== null && value !== void 0;
}
export {
  buildLabelClasses,
  buildSelectClasses,
  hasSelectValue,
  isOptionGroup
};
//# sourceMappingURL=Select.utils.js.map

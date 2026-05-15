import { BUTTON_TOGGLE_CLASSES } from "./ButtonToggle.constants";
function buildButtonToggleClasses(className, unstyled) {
  const base = BUTTON_TOGGLE_CLASSES.base;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function isOptionActive(optionValue, currentValue, multiple) {
  if (multiple) {
    return Array.isArray(currentValue) && currentValue.includes(optionValue);
  }
  return currentValue === optionValue;
}
function computeNewSelection(optionValue, currentValue, multiple, allowDeselect) {
  if (multiple) {
    const current = Array.isArray(currentValue) ? currentValue : [];
    if (current.includes(optionValue)) {
      return current.filter((item) => item !== optionValue);
    }
    return [...current, optionValue];
  }
  if (currentValue === optionValue) {
    return allowDeselect ? null : optionValue;
  }
  return optionValue;
}
export {
  buildButtonToggleClasses,
  computeNewSelection,
  isOptionActive
};
//# sourceMappingURL=ButtonToggle.utils.js.map

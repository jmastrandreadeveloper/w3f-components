import { TOGGLE_BUTTON_CLASSES, TOGGLE_GROUP_CLASSES } from "./ToggleButton.constants";
function buildToggleButtonClasses(selected, color, size, fullWidth, disabled, className, unstyled) {
  if (unstyled) {
    return [TOGGLE_BUTTON_CLASSES.button, "w3f-toggle-button--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    TOGGLE_BUTTON_CLASSES.button,
    selected && TOGGLE_BUTTON_CLASSES.selected,
    selected && color !== "primary" && TOGGLE_BUTTON_CLASSES.colorModifiers[color],
    TOGGLE_BUTTON_CLASSES.sizeModifiers[size],
    fullWidth && TOGGLE_BUTTON_CLASSES.full,
    disabled && TOGGLE_BUTTON_CLASSES.disabled,
    className
  ].filter(Boolean).join(" ");
}
function buildToggleGroupClasses(orientation, fullWidth, hasError, disabled, className) {
  return [
    TOGGLE_GROUP_CLASSES.group,
    TOGGLE_GROUP_CLASSES.orientationModifiers[orientation],
    fullWidth && TOGGLE_GROUP_CLASSES.full,
    hasError && TOGGLE_GROUP_CLASSES.error,
    disabled && TOGGLE_GROUP_CLASSES.disabled,
    className
  ].filter(Boolean).join(" ");
}
function isSelected(buttonValue, currentValue, exclusive) {
  if (exclusive) {
    return buttonValue === currentValue;
  }
  if (Array.isArray(currentValue)) {
    return currentValue.includes(buttonValue);
  }
  return false;
}
function computeNewValue(buttonValue, currentValue, exclusive) {
  if (exclusive) {
    return currentValue === buttonValue ? null : buttonValue;
  }
  const arr = Array.isArray(currentValue) ? currentValue : [];
  const idx = arr.indexOf(buttonValue);
  if (idx === -1) return [...arr, buttonValue];
  return arr.filter((v) => v !== buttonValue);
}
export {
  buildToggleButtonClasses,
  buildToggleGroupClasses,
  computeNewValue,
  isSelected
};
//# sourceMappingURL=ToggleButton.utils.js.map

import { CHECKBOX_CLASSES } from "./Checkbox.constants";
function buildCheckboxInputClasses(color, unstyled) {
  if (unstyled) {
    return [CHECKBOX_CLASSES.input, "w3f-checkbox--unstyled"].join(" ");
  }
  return [CHECKBOX_CLASSES.input, CHECKBOX_CLASSES.colors[color]].filter(Boolean).join(" ");
}
function buildCheckboxContainerClasses(className, unstyled) {
  if (unstyled) {
    return [CHECKBOX_CLASSES.container, "w3f-checkbox--unstyled", className].filter(Boolean).join(" ");
  }
  return [CHECKBOX_CLASSES.container, className].filter(Boolean).join(" ");
}
function buildCheckboxWrapperClasses(disabled, unstyled) {
  if (unstyled) {
    return [CHECKBOX_CLASSES.wrapper, "w3f-checkbox-wrapper--unstyled"].join(" ");
  }
  return [
    CHECKBOX_CLASSES.wrapper,
    disabled && CHECKBOX_CLASSES.wrapperDisabled
  ].filter(Boolean).join(" ");
}
export {
  buildCheckboxContainerClasses,
  buildCheckboxInputClasses,
  buildCheckboxWrapperClasses
};
//# sourceMappingURL=Checkbox.utils.js.map

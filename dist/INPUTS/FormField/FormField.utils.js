import { FORM_FIELD_CLASSES } from "./FormField.constants";
function buildFormFieldClasses(layout, hasError, disabled, className, unstyled) {
  if (unstyled) {
    return [FORM_FIELD_CLASSES.base, "w3f-form-field--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    FORM_FIELD_CLASSES.base,
    FORM_FIELD_CLASSES.layouts[layout],
    hasError && FORM_FIELD_CLASSES.hasError,
    disabled && FORM_FIELD_CLASSES.isDisabled,
    className
  ].filter(Boolean).join(" ");
}
export {
  buildFormFieldClasses
};
//# sourceMappingURL=FormField.utils.js.map

const FORM_FIELD_DEFAULTS = {
  layout: "stacked",
  required: false,
  disabled: false,
  className: "",
  unstyled: false
};
const FORM_FIELD_CLASSES = {
  base: "w3f-form-field",
  layouts: {
    stacked: "w3f-form-field--stacked",
    inline: "w3f-form-field--inline"
  },
  label: "w3f-form-field__label",
  required: "w3f-input-required",
  content: "w3f-form-field__content",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  hasError: "has-error",
  isDisabled: "is-disabled"
};
export {
  FORM_FIELD_CLASSES,
  FORM_FIELD_DEFAULTS
};
//# sourceMappingURL=FormField.constants.js.map

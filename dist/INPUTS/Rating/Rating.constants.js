const RATING_CLASSES = {
  wrapper: "w3f-rating-wrapper",
  container: "w3f-rating-container",
  sizes: {
    small: "w3f-rating-small",
    medium: "w3f-rating-medium",
    large: "w3f-rating-large"
  },
  error: "w3f-rating-error",
  disabled: "w3f-rating-disabled",
  label: "w3f-rating-label",
  required: "w3f-input-required",
  item: "w3f-rating-item",
  itemInteractive: "w3f-rating-interactive",
  itemActive: "w3f-rating-active",
  itemFocused: "w3f-rating-focused",
  itemDisabled: "w3f-rating-item--disabled",
  itemReadonly: "w3f-rating-item--readonly",
  clearBtn: "w3f-rating-clear",
  value: "w3f-rating-value",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  paddingX: "w3f-px-1"
};
const RATING_DEFAULTS = {
  defaultValue: 0,
  max: 5,
  readOnly: false,
  disabled: false,
  iconType: "star",
  precision: 1,
  size: "medium",
  showValue: false,
  allowClear: true,
  required: false,
  className: "",
  unstyled: false
};
const RATING_VARIANT_CLASSES = {
  solid: "w3f-rating--solid",
  outlined: "w3f-rating--outlined",
  ghost: "w3f-rating--ghost",
  soft: "w3f-rating--soft"
};
const RATING_ICON_SIZES = {
  small: 20,
  medium: 28,
  large: 36
};
export {
  RATING_CLASSES,
  RATING_DEFAULTS,
  RATING_ICON_SIZES,
  RATING_VARIANT_CLASSES
};
//# sourceMappingURL=Rating.constants.js.map

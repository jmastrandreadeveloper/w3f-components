const PASSWORDFIELD_CLASSES = {
  container: "w3f-input-container",
  wrapper: "w3f-input-wrapper",
  wrapperSizes: {
    sm: "w3f-input-wrapper--sm",
    md: "",
    lg: "w3f-input-wrapper--lg"
  },
  input: "w3f-input",
  hasLeading: "w3f-input--has-leading",
  hasTrailing: "w3f-input--has-trailing",
  label: "w3f-input-label",
  labelFloating: "w3f-input-label--floating",
  labelShifted: "w3f-input-label--shifted",
  required: "w3f-input-required",
  iconLeading: "w3f-input-icon w3f-input-icon--leading",
  iconTrailing: "w3f-input-icon w3f-input-icon--trailing w3f-input-icon--clickable",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  paddingX: "w3f-px-1",
  strength: "w3f-password-strength",
  strengthBar: "w3f-password-strength__bar",
  strengthSegment: "w3f-password-strength__segment",
  strengthSegmentActive: "w3f-password-strength__segment--active",
  strengthLabel: "w3f-password-strength__label",
  strengthModifiers: {
    weak: "w3f-password-strength--weak",
    medium: "w3f-password-strength--medium",
    strong: "w3f-password-strength--strong"
  }
};
const PASSWORDFIELD_DEFAULTS = {
  size: "md",
  disabled: false,
  required: false,
  showStrength: false,
  unstyled: false
};
const STRENGTH_LABELS = {
  weak: "D\xE9bil",
  medium: "Media",
  strong: "Fuerte"
};
const STRENGTH_SEGMENTS = {
  weak: 1,
  medium: 2,
  strong: 3
};
export {
  PASSWORDFIELD_CLASSES,
  PASSWORDFIELD_DEFAULTS,
  STRENGTH_LABELS,
  STRENGTH_SEGMENTS
};
//# sourceMappingURL=PasswordField.constants.js.map

const STEPPER_DEFAULTS = {
  activeStep: 0,
  orientation: "horizontal",
  alternativeLabel: false,
  nonLinear: false,
  color: "primary",
  unstyled: false,
  className: ""
};
const STEP_DEFAULTS = {
  active: false,
  completed: false,
  disabled: false,
  index: 0,
  last: false,
  className: "",
  _orientation: "horizontal",
  _alternativeLabel: false,
  _nonLinear: false
};
const STEP_LABEL_DEFAULTS = {
  error: false,
  className: "",
  _active: false,
  _completed: false,
  _disabled: false,
  _index: 0,
  _alternativeLabel: false,
  _nonLinear: false
};
const STEP_CONTENT_DEFAULTS = {
  transitionDuration: 300,
  className: "",
  _active: false,
  _last: false
};
const STEP_CONNECTOR_DEFAULTS = {
  className: "",
  _orientation: "horizontal",
  _active: false,
  _completed: false,
  _alternativeLabel: false
};
const STEPPER_CLASSES = {
  stepper: "w3f-stepper",
  step: "w3f-step",
  connector: "w3f-step-connector",
  connectorActive: "w3f-step-connector--active",
  connectorCompleted: "w3f-step-connector--completed",
  connectorAlternative: "w3f-step-connector--alternative",
  label: "w3f-step-label",
  labelClickable: "w3f-step-label--clickable",
  labelAlternative: "w3f-step-label--alternative",
  labelIconContainer: "w3f-step-label__icon-container",
  labelText: "w3f-step-label__text",
  labelTitle: "w3f-step-label__title",
  labelTitleActive: "w3f-step-label__title--active",
  labelTitleError: "w3f-step-label__title--error",
  labelOptional: "w3f-step-label__optional",
  labelOptionalError: "w3f-step-label__optional--error",
  icon: "w3f-step-label__icon",
  iconActive: "w3f-step-label__icon--active",
  iconCompleted: "w3f-step-label__icon--completed",
  iconPending: "w3f-step-label__icon--pending",
  iconError: "w3f-step-label__icon--error",
  content: "w3f-step-content",
  contentExpanded: "w3f-step-content--expanded",
  contentCollapsed: "w3f-step-content--collapsed",
  contentLast: "w3f-step-content--last"
};
export {
  STEPPER_CLASSES,
  STEPPER_DEFAULTS,
  STEP_CONNECTOR_DEFAULTS,
  STEP_CONTENT_DEFAULTS,
  STEP_DEFAULTS,
  STEP_LABEL_DEFAULTS
};
//# sourceMappingURL=Stepper.constants.js.map

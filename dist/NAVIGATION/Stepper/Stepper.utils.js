import { STEPPER_CLASSES } from "./Stepper.constants";
function buildStepperClasses(orientation, color, alternativeLabel, className, unstyled) {
  if (unstyled) {
    return [STEPPER_CLASSES.stepper, "w3f-stepper--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    STEPPER_CLASSES.stepper,
    `w3f-stepper--${orientation}`,
    `w3f-stepper--${color}`,
    alternativeLabel && "w3f-stepper--alternative-label",
    className
  ].filter(Boolean).join(" ");
}
function buildStepClasses(orientation, active, completed, disabled) {
  return [
    STEPPER_CLASSES.step,
    `w3f-step--${orientation}`,
    active && "w3f-step--active",
    completed && "w3f-step--completed",
    disabled && "w3f-step--disabled"
  ].filter(Boolean).join(" ");
}
function buildConnectorClasses(orientation, active, completed, alternativeLabel, className) {
  return [
    STEPPER_CLASSES.connector,
    `w3f-step-connector--${orientation}`,
    active && STEPPER_CLASSES.connectorActive,
    completed && STEPPER_CLASSES.connectorCompleted,
    alternativeLabel && STEPPER_CLASSES.connectorAlternative,
    className
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isClickable, alternativeLabel, className) {
  return [
    STEPPER_CLASSES.label,
    isClickable && STEPPER_CLASSES.labelClickable,
    alternativeLabel && STEPPER_CLASSES.labelAlternative,
    className
  ].filter(Boolean).join(" ");
}
function buildStepIconClasses(active, completed, error) {
  return [
    STEPPER_CLASSES.icon,
    error ? STEPPER_CLASSES.iconError : completed ? STEPPER_CLASSES.iconCompleted : active ? STEPPER_CLASSES.iconActive : STEPPER_CLASSES.iconPending
  ].filter(Boolean).join(" ");
}
function buildTitleClasses(active, error) {
  return [
    STEPPER_CLASSES.labelTitle,
    active && STEPPER_CLASSES.labelTitleActive,
    error && STEPPER_CLASSES.labelTitleError
  ].filter(Boolean).join(" ");
}
function buildContentClasses(active, isLast, className) {
  return [
    STEPPER_CLASSES.content,
    active ? STEPPER_CLASSES.contentExpanded : STEPPER_CLASSES.contentCollapsed,
    isLast && STEPPER_CLASSES.contentLast,
    className
  ].filter(Boolean).join(" ");
}
export {
  buildConnectorClasses,
  buildContentClasses,
  buildLabelClasses,
  buildStepClasses,
  buildStepIconClasses,
  buildStepperClasses,
  buildTitleClasses
};
//# sourceMappingURL=Stepper.utils.js.map

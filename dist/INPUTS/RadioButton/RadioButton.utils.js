import { RADIO_CLASSES } from "./RadioButton.constants";
function buildRadioButtonClasses(direction, disabled, className, unstyled) {
  if (unstyled) {
    return [RADIO_CLASSES.button, "w3f-radio--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    RADIO_CLASSES.button,
    direction === "horizontal" ? RADIO_CLASSES.spacingH : RADIO_CLASSES.spacingV,
    disabled && RADIO_CLASSES.buttonDisabled,
    className
  ].filter(Boolean).join(" ");
}
function buildRadioGroupContainerClasses(direction, unstyled) {
  if (unstyled) {
    return [RADIO_CLASSES.radioContainer[direction], "w3f-radio--unstyled"].filter(Boolean).join(" ");
  }
  return RADIO_CLASSES.radioContainer[direction];
}
export {
  buildRadioButtonClasses,
  buildRadioGroupContainerClasses
};
//# sourceMappingURL=RadioButton.utils.js.map

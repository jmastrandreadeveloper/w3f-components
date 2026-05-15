const TP_CLASSES = {
  root: "w3f-timepicker",
  inputWrapper: "w3f-timepicker-input-wrapper",
  input: "w3f-timepicker-input",
  inputIcon: "w3f-timepicker-input-icon",
  dropdown: "w3f-timepicker-dropdown",
  panel: "w3f-timepicker-panel",
  display: "w3f-timepicker-display",
  displayTime: "w3f-timepicker-display-time",
  displayAmpm: "w3f-timepicker-display-ampm",
  wheels: "w3f-timepicker-wheels",
  separator: "w3f-timepicker-separator",
  column: "w3f-timepicker-column",
  columnLabel: "w3f-timepicker-column-label",
  scroll: "w3f-timepicker-scroll",
  item: "w3f-timepicker-item",
  itemSelected: "w3f-timepicker-item--selected",
  ampm: "w3f-timepicker-ampm",
  ampmBtn: "w3f-timepicker-ampm-btn",
  ampmBtnActive: "w3f-timepicker-ampm-btn--active",
  stepBtn: "w3f-timepicker-step-btn",
  actions: "w3f-timepicker-actions",
  inline: "w3f-timepicker-inline",
  output: "w3f-timepicker-output"
};
const TP_MINUTE_STEPS = [1, 5, 10, 15, 30];
const TP_SECOND_STEPS = [1, 5, 10, 15, 30];
function generateRange(max, step) {
  const result = [];
  for (let i = 0; i <= max; i += step) result.push(i);
  return result;
}
const HOURS_24 = Array.from({ length: 24 }, (_, i) => i);
const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
const ALL_MINUTES = Array.from({ length: 60 }, (_, i) => i);
const ALL_SECONDS = Array.from({ length: 60 }, (_, i) => i);
export {
  ALL_MINUTES,
  ALL_SECONDS,
  HOURS_12,
  HOURS_24,
  TP_CLASSES,
  TP_MINUTE_STEPS,
  TP_SECOND_STEPS,
  generateRange
};
//# sourceMappingURL=TimePicker.constants.js.map

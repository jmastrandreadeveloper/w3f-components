import { ALERT_POSITIONS } from "./Alert.constants";
function buildAlertContainerClasses(position, className) {
  return [
    "w3f-alert-container",
    ALERT_POSITIONS[position] || ALERT_POSITIONS["top-right"],
    className
  ].filter(Boolean).join(" ");
}
function generateAlertId() {
  return Date.now() + Math.random();
}
export {
  buildAlertContainerClasses,
  generateAlertId
};
//# sourceMappingURL=Alert.utils.js.map

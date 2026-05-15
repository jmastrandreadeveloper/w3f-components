const ALERT_DEFAULTS = {
  duration: 5e3,
  type: "info",
  dismissible: true,
  position: "top-right",
  round: "lg",
  shadow: "md",
  border: false,
  maxAlerts: 5
};
const ALERT_POSITIONS = {
  "top-right": "w3f-alert-container--top-right",
  "top-left": "w3f-alert-container--top-left",
  "bottom-right": "w3f-alert-container--bottom-right",
  "bottom-left": "w3f-alert-container--bottom-left",
  "top-center": "w3f-alert-container--top-center",
  "bottom-center": "w3f-alert-container--bottom-center"
};
const SHOW_ALERT_EVENT = "alert:show";
export {
  ALERT_DEFAULTS,
  ALERT_POSITIONS,
  SHOW_ALERT_EVENT
};
//# sourceMappingURL=Alert.constants.js.map

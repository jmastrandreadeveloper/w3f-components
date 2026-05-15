import { useContext, useCallback } from "react";
import { AlertContext } from "./Alert";
import { SHOW_ALERT_EVENT, ALERT_DEFAULTS } from "./Alert.constants";
const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe ser usado dentro de un AlertProvider");
  }
  return context;
};
const dispatchAlert = (options) => {
  const event = new CustomEvent(SHOW_ALERT_EVENT, {
    detail: {
      message: options.message,
      type: options.type ?? ALERT_DEFAULTS.type,
      duration: options.duration ?? ALERT_DEFAULTS.duration,
      dismissible: options.dismissible ?? ALERT_DEFAULTS.dismissible,
      icon: options.icon,
      round: options.round ?? ALERT_DEFAULTS.round,
      shadow: options.shadow ?? ALERT_DEFAULTS.shadow,
      border: options.border ?? ALERT_DEFAULTS.border
    }
  });
  window.dispatchEvent(event);
};
const useAlertEvent = () => {
  return useCallback((options) => {
    dispatchAlert(options);
  }, []);
};
export {
  dispatchAlert,
  useAlert,
  useAlertEvent
};
//# sourceMappingURL=Alert.hooks.js.map

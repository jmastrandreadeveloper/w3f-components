"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useState, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import Note from "../../DATADISPLAY/Note/Note";
import { ALERT_DEFAULTS, SHOW_ALERT_EVENT } from "./Alert.constants";
import { buildAlertContainerClasses, generateAlertId } from "./Alert.utils";
const AlertContext = createContext(null);
const AlertProvider = ({
  children,
  position = ALERT_DEFAULTS.position,
  maxAlerts = ALERT_DEFAULTS.maxAlerts
}) => {
  const [alerts, setAlerts] = useState([]);
  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);
  const addAlert = useCallback((options) => {
    const id = generateAlertId();
    const newAlert = {
      id,
      message: options.message,
      type: options.type ?? ALERT_DEFAULTS.type,
      duration: options.duration ?? ALERT_DEFAULTS.duration,
      dismissible: options.dismissible ?? ALERT_DEFAULTS.dismissible,
      icon: options.icon,
      round: options.round ?? ALERT_DEFAULTS.round,
      shadow: options.shadow ?? ALERT_DEFAULTS.shadow,
      border: options.border ?? ALERT_DEFAULTS.border
    };
    setAlerts((prev) => {
      const updated = [...prev, newAlert];
      return updated.length > maxAlerts ? updated.slice(-maxAlerts) : updated;
    });
    if (newAlert.duration > 0) {
      setTimeout(() => removeAlert(id), newAlert.duration);
    }
    return id;
  }, [maxAlerts, removeAlert]);
  useEffect(() => {
    const handleEvent = (e) => {
      const detail = e.detail;
      if (detail) addAlert(detail);
    };
    window.addEventListener(SHOW_ALERT_EVENT, handleEvent);
    return () => window.removeEventListener(SHOW_ALERT_EVENT, handleEvent);
  }, [addAlert]);
  const contextValue = useMemo(
    () => ({ alerts, addAlert, removeAlert }),
    [alerts, addAlert, removeAlert]
  );
  const containerClasses = useMemo(
    () => buildAlertContainerClasses(position),
    [position]
  );
  const alertPortal = useMemo(() => {
    if (alerts.length === 0) return null;
    return createPortal(
      /* @__PURE__ */ jsx("div", { className: containerClasses, children: alerts.map((alert) => /* @__PURE__ */ jsx("div", { className: "w3f-alert-wrapper", children: /* @__PURE__ */ jsx(
        Note,
        {
          type: alert.type,
          dismissible: alert.dismissible,
          onDismiss: () => removeAlert(alert.id),
          icon: alert.icon,
          round: alert.round,
          shadow: alert.shadow,
          border: alert.border,
          children: alert.message
        }
      ) }, alert.id)) }),
      document.body
    );
  }, [alerts, containerClasses, removeAlert]);
  return /* @__PURE__ */ jsxs(AlertContext.Provider, { value: contextValue, children: [
    children,
    alertPortal
  ] });
};
AlertProvider.displayName = "AlertProvider";
var Alert_default = AlertProvider;
export {
  AlertContext,
  AlertProvider,
  Alert_default as default
};
//# sourceMappingURL=Alert.js.map

import { useContext, useCallback } from "react";
import { NotificationContext } from "./Notifications";
import { SHOW_NOTIFICATION_EVENT, NOTIFICATION_DEFAULTS } from "./Notifications.constants";
const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe ser usado dentro de un NotificationProvider");
  }
  return context;
};
const dispatchNotification = (options) => {
  const event = new CustomEvent(SHOW_NOTIFICATION_EVENT, {
    detail: {
      title: options.title,
      message: options.message,
      type: options.type ?? NOTIFICATION_DEFAULTS.type,
      duration: options.duration ?? NOTIFICATION_DEFAULTS.duration,
      dismissible: options.dismissible ?? NOTIFICATION_DEFAULTS.dismissible,
      icon: options.icon,
      showProgress: options.showProgress ?? NOTIFICATION_DEFAULTS.showProgress
    }
  });
  window.dispatchEvent(event);
};
const useNotificationEvent = () => {
  return useCallback((options) => {
    dispatchNotification(options);
  }, []);
};
export {
  dispatchNotification,
  useNotification,
  useNotificationEvent
};
//# sourceMappingURL=Notifications.hooks.js.map

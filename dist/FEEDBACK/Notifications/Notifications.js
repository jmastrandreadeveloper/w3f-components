"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { NOTIFICATION_DEFAULTS, SHOW_NOTIFICATION_EVENT } from "./Notifications.constants";
import { buildNotificationContainerClasses, buildNotificationClasses, generateNotificationId } from "./Notifications.utils";
const NOTIFICATION_ICON_MAP = {
  info: /* @__PURE__ */ jsx(Info, { size: 20 }),
  success: /* @__PURE__ */ jsx(CheckCircle, { size: 20 }),
  warning: /* @__PURE__ */ jsx(AlertTriangle, { size: 20 }),
  danger: /* @__PURE__ */ jsx(XCircle, { size: 20 })
};
import { useNotification, dispatchNotification, useNotificationEvent } from "./Notifications.hooks";
const NotificationContext = createContext(null);
const NotificationCard = ({ notification, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const remainingRef = useRef(notification.duration);
  const animFrameRef = useRef(0);
  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(notification.id);
    }, NOTIFICATION_DEFAULTS.exitAnimationDuration);
  }, [notification.id, onDismiss]);
  useEffect(() => {
    if (notification.duration <= 0 || !notification.showProgress) return;
    const updateProgress = () => {
      if (isPaused) return;
      const elapsed = Date.now() - startTimeRef.current;
      const total = notification.duration;
      const pct = Math.max(0, 100 - elapsed / total * 100);
      setProgress(pct);
      if (pct > 0) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };
    animFrameRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [notification.duration, notification.showProgress, isPaused]);
  useEffect(() => {
    if (notification.duration <= 0 || isPaused) return;
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleDismiss();
    }, remainingRef.current);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [notification.duration, isPaused, handleDismiss]);
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startTimeRef.current));
    }
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);
  const cardClasses = useMemo(
    () => buildNotificationClasses(notification.type, isExiting),
    [notification.type, isExiting]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cardClasses,
      role: "alert",
      "aria-live": "polite",
      "aria-atomic": "true",
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsx("div", { className: "w3f-notification__icon", children: notification.icon || NOTIFICATION_ICON_MAP[notification.type] }),
        /* @__PURE__ */ jsxs("div", { className: "w3f-notification__content", children: [
          notification.title && /* @__PURE__ */ jsx("div", { className: "w3f-notification__title", children: notification.title }),
          /* @__PURE__ */ jsx("div", { className: "w3f-notification__message", children: notification.message })
        ] }),
        notification.dismissible && /* @__PURE__ */ jsx(
          "button",
          {
            className: "w3f-notification__close",
            onClick: handleDismiss,
            "aria-label": "Cerrar notificaci\xF3n",
            type: "button",
            children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
              /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
            ] })
          }
        ),
        notification.showProgress && notification.duration > 0 && /* @__PURE__ */ jsx("div", { className: "w3f-notification__progress-track", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "w3f-notification__progress-bar",
            style: { width: `${progress}%` }
          }
        ) })
      ]
    }
  );
};
NotificationCard.displayName = "NotificationCard";
const NotificationProvider = ({
  children,
  position = NOTIFICATION_DEFAULTS.position,
  maxNotifications = NOTIFICATION_DEFAULTS.maxNotifications
}) => {
  const [notifications, setNotifications] = useState([]);
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);
  const addNotification = useCallback((options) => {
    const id = generateNotificationId();
    const newNotification = {
      id,
      title: options.title,
      message: options.message,
      type: options.type ?? NOTIFICATION_DEFAULTS.type,
      duration: options.duration ?? NOTIFICATION_DEFAULTS.duration,
      dismissible: options.dismissible ?? NOTIFICATION_DEFAULTS.dismissible,
      icon: options.icon,
      showProgress: options.showProgress ?? NOTIFICATION_DEFAULTS.showProgress
    };
    setNotifications((prev) => {
      const updated = [...prev, newNotification];
      return updated.length > maxNotifications ? updated.slice(-maxNotifications) : updated;
    });
    return id;
  }, [maxNotifications]);
  useEffect(() => {
    const handleEvent = (e) => {
      const detail = e.detail;
      if (detail) addNotification(detail);
    };
    window.addEventListener(SHOW_NOTIFICATION_EVENT, handleEvent);
    return () => window.removeEventListener(SHOW_NOTIFICATION_EVENT, handleEvent);
  }, [addNotification]);
  const contextValue = useMemo(
    () => ({ notifications, addNotification, removeNotification, clearAll }),
    [notifications, addNotification, removeNotification, clearAll]
  );
  const containerClasses = useMemo(
    () => buildNotificationContainerClasses(position),
    [position]
  );
  const notificationPortal = useMemo(() => {
    if (notifications.length === 0) return null;
    return createPortal(
      /* @__PURE__ */ jsx("div", { className: containerClasses, children: notifications.map((notification) => /* @__PURE__ */ jsx(
        NotificationCard,
        {
          notification,
          onDismiss: removeNotification
        },
        notification.id
      )) }),
      document.body
    );
  }, [notifications, containerClasses, removeNotification]);
  return /* @__PURE__ */ jsxs(NotificationContext.Provider, { value: contextValue, children: [
    children,
    notificationPortal
  ] });
};
NotificationProvider.displayName = "NotificationProvider";
var Notifications_default = NotificationProvider;
export {
  NotificationContext,
  NotificationProvider,
  Notifications_default as default,
  dispatchNotification,
  useNotification,
  useNotificationEvent
};
//# sourceMappingURL=Notifications.js.map

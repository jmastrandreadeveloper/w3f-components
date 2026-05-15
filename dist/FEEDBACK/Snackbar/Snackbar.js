"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SNACKBAR_DEFAULTS } from "./Snackbar.constants";
import { buildAnchorClasses, buildSnackbarClasses } from "./Snackbar.utils";
import { default as default2 } from "./Snackbar.hooks";
const Snackbar = React.forwardRef(({
  open,
  message,
  onClose,
  autoHideDuration,
  variant = SNACKBAR_DEFAULTS.variant,
  anchorOrigin = SNACKBAR_DEFAULTS.anchorOrigin,
  action,
  resumeHideDuration,
  className,
  // Backwards-compatible aliases
  show,
  duration,
  ...rest
}, ref) => {
  const isOpen = open ?? show ?? false;
  const hideDuration = autoHideDuration ?? duration ?? SNACKBAR_DEFAULTS.autoHideDuration;
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const handleClose = useCallback((reason = "timeout") => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onClose?.(null, reason);
    }, SNACKBAR_DEFAULTS.exitAnimationDuration);
  }, [onClose]);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsExiting(false);
    }
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen || hideDuration === null || hideDuration <= 0 || isPaused) return;
    const effectiveDuration = isPaused && resumeHideDuration != null ? resumeHideDuration : hideDuration;
    const timer = setTimeout(() => {
      handleClose("timeout");
    }, effectiveDuration);
    return () => clearTimeout(timer);
  }, [isOpen, hideDuration, isPaused, resumeHideDuration, handleClose]);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose("escapeKeyDown");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);
  const anchorClasses = useMemo(
    () => buildAnchorClasses(anchorOrigin),
    [anchorOrigin]
  );
  const snackbarClasses = useMemo(
    () => buildSnackbarClasses(variant, isExiting, className),
    [variant, isExiting, className]
  );
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx("div", { className: anchorClasses, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: snackbarClasses,
      role: "alert",
      "aria-live": "polite",
      "aria-atomic": "true",
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      ...rest,
      children: [
        /* @__PURE__ */ jsx("p", { className: "w3f-snackbar__message", children: message }),
        action ? /* @__PURE__ */ jsx("div", { className: "w3f-snackbar__action", children: action }) : /* @__PURE__ */ jsx(
          "button",
          {
            className: "w3f-snackbar__close",
            onClick: () => handleClose("clickaway"),
            "aria-label": "Cerrar notificacion",
            type: "button",
            children: "\xD7"
          }
        )
      ]
    }
  ) });
});
Snackbar.displayName = "Snackbar";
var Snackbar_default = Snackbar;
export {
  Snackbar,
  Snackbar_default as default,
  default2 as useSnackbar
};
//# sourceMappingURL=Snackbar.js.map

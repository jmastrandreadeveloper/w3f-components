"use client";
import { jsx } from "react/jsx-runtime";
import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import ProgressSpinner from "../../DATADISPLAY/ProgressSpinner/ProgressSpinner";
import { BACKDROP_DEFAULTS } from "./Backdrop.constants";
import { buildBackdropClasses } from "./Backdrop.utils";
import { useScrollLock } from "./Backdrop.hooks";
import { useBackdrop, useScrollLock as useScrollLock2 } from "./Backdrop.hooks";
const Backdrop = React.forwardRef(({
  open = false,
  children,
  invisible = BACKDROP_DEFAULTS.invisible,
  onClick,
  transitionDuration = BACKDROP_DEFAULTS.transitionDuration,
  className,
  sx,
  component: Component = "div",
  showSpinner = BACKDROP_DEFAULTS.showSpinner,
  spinnerColor = BACKDROP_DEFAULTS.spinnerColor,
  spinnerSize = BACKDROP_DEFAULTS.spinnerSize,
  ...rest
}, ref) => {
  useScrollLock(open);
  const backdropClasses = useMemo(
    () => buildBackdropClasses(open, invisible, className),
    [open, invisible, className]
  );
  const inlineStyles = useMemo(() => ({
    transitionDuration: `${transitionDuration}ms`,
    ...sx
  }), [transitionDuration, sx]);
  if (!open) return null;
  const content = /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      className: backdropClasses,
      onClick,
      role: "presentation",
      style: inlineStyles,
      ...rest,
      children: children || showSpinner && /* @__PURE__ */ jsx(
        ProgressSpinner,
        {
          mode: "indeterminate",
          color: spinnerColor,
          size: spinnerSize
        }
      )
    }
  );
  return createPortal(content, document.body);
});
Backdrop.displayName = "Backdrop";
var Backdrop_default = Backdrop;
export {
  Backdrop,
  Backdrop_default as default,
  useBackdrop,
  useScrollLock2 as useScrollLock
};
//# sourceMappingURL=Backdrop.js.map

"use client";
import { jsx } from "react/jsx-runtime";
import React, { useCallback, useImperativeHandle, useMemo } from "react";
import { RIPPLE_DEFAULTS } from "./Ripple.constants";
import { buildRippleClasses } from "./Ripple.utils";
import { useRipple } from "./Ripple.hooks";
import { useRipple as useRipple2 } from "./Ripple.hooks";
const Ripple = React.forwardRef(({
  children,
  className = "",
  color,
  disabled = false,
  unbounded = false,
  centered = false,
  radius,
  animation,
  flat = false,
  role = "button",
  tabIndex = 0,
  onClick,
  ...rest
}, ref) => {
  const { containerRef, createRipple, clearRipples } = useRipple({
    disabled,
    centered,
    unbounded,
    radius,
    enterDuration: animation?.enterDuration ?? RIPPLE_DEFAULTS.enterDuration,
    exitDuration: animation?.exitDuration ?? RIPPLE_DEFAULTS.exitDuration
  });
  useImperativeHandle(ref, () => ({
    launch: (x, y) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      createRipple({
        clientX: x ?? rect.left + rect.width / 2,
        clientY: y ?? rect.top + rect.height / 2
      });
    },
    fadeOutAll: clearRipples
  }), [containerRef, createRipple, clearRipples]);
  const handleClick = useCallback((e) => {
    createRipple(e);
    onClick?.(e);
  }, [createRipple, onClick]);
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        createRipple({
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2
        });
      }
      onClick?.(e);
    }
  }, [containerRef, createRipple, onClick]);
  const containerClasses = useMemo(
    () => buildRippleClasses(flat, disabled, className),
    [flat, disabled, className]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: containerClasses,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      role,
      tabIndex: disabled ? -1 : tabIndex,
      "aria-disabled": disabled,
      "data-ripple-color": color,
      ...rest,
      children: /* @__PURE__ */ jsx("div", { className: "w3f-ripple-content", children })
    }
  );
});
Ripple.displayName = "Ripple";
var Ripple_default = Ripple;
export {
  Ripple,
  Ripple_default as default,
  useRipple2 as useRipple
};
//# sourceMappingURL=Ripple.js.map

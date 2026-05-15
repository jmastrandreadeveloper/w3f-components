"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import Badge from "./Badge";
const BadgeWrapper = React.forwardRef(({
  children,
  badgeContent,
  badgeProps = {},
  className = "",
  style = {},
  overlap = true,
  offset,
  ...rest
}, ref) => {
  const shouldShowBadge = React.useMemo(() => {
    if (badgeProps.invisible) return false;
    if (badgeContent === null || badgeContent === void 0) {
      return badgeProps.variant === "dot";
    }
    if (badgeContent === 0) {
      return badgeProps.showZero === true;
    }
    return true;
  }, [badgeContent, badgeProps]);
  const wrapperStyle = React.useMemo(() => ({
    position: "relative",
    display: "inline-block",
    verticalAlign: "middle",
    ...offset !== void 0 ? { "--w3f-badge-offset": offset } : {},
    ...style
  }), [style, offset]);
  const wrapperClasses = React.useMemo(() => {
    const classes = ["w3f-badge-wrapper"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);
  const enhancedBadgeProps = React.useMemo(() => {
    const defaultPosition = overlap ? "top-right" : null;
    return {
      position: defaultPosition,
      ...badgeProps
    };
  }, [badgeProps, overlap]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: wrapperClasses,
      style: wrapperStyle,
      ...rest,
      children: [
        children,
        shouldShowBadge && /* @__PURE__ */ jsx(Badge, { ...enhancedBadgeProps, children: badgeContent })
      ]
    }
  );
});
BadgeWrapper.displayName = "BadgeWrapper";
var BadgeWrapper_default = BadgeWrapper;
export {
  BadgeWrapper,
  BadgeWrapper_default as default
};
//# sourceMappingURL=BadgeWrapper.js.map

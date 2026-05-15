"use client";
import { jsx } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import Grid from "../../LAYOUT/Grid/Grid";
import { DESKTOP_DEFAULTS } from "./Desktop.constants";
import { getWindowZIndex, buildDesktopClasses } from "./Desktop.utils";
import { useWindowOrder } from "./Desktop.hooks";
const Desktop = forwardRef(({
  children,
  unstyled = DESKTOP_DEFAULTS.unstyled,
  className = DESKTOP_DEFAULTS.className,
  style,
  background = DESKTOP_DEFAULTS.background
}, ref) => {
  const { windowOrder, handleWindowFocus } = useWindowOrder(children);
  return /* @__PURE__ */ jsx(
    Grid,
    {
      ref,
      className: buildDesktopClasses(className, unstyled),
      style: {
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background,
        ...style
      },
      children: React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const key = child.key;
        if (!key) {
          console.warn(
            'Desktop: Window component is missing a unique "key" prop. Z-index management relies on keys.'
          );
          return child;
        }
        const zIndex = getWindowZIndex(windowOrder, String(key));
        return React.cloneElement(
          child,
          {
            style: { ...child.props.style, zIndex },
            onFocus: () => {
              handleWindowFocus(String(key));
              const childProps = child.props;
              if (typeof childProps.onFocus === "function") childProps.onFocus();
            }
          }
        );
      })
    }
  );
});
Desktop.displayName = "Desktop";
var Desktop_default = Desktop;
export {
  Desktop,
  Desktop_default as default
};
//# sourceMappingURL=Desktop.js.map

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { DIVIDERS_DEFAULTS } from "./Dividers.constants";
import { buildDynamicStyles, buildLineBackgroundColor } from "./Dividers.utils";
const Dividers = forwardRef(({
  type = DIVIDERS_DEFAULTS.type,
  className = DIVIDERS_DEFAULTS.className,
  spacing = DIVIDERS_DEFAULTS.spacing,
  thickness = DIVIDERS_DEFAULTS.thickness,
  height = DIVIDERS_DEFAULTS.height,
  color = DIVIDERS_DEFAULTS.color,
  variant = DIVIDERS_DEFAULTS.variant,
  gradient = DIVIDERS_DEFAULTS.gradient,
  animated = DIVIDERS_DEFAULTS.animated,
  children = DIVIDERS_DEFAULTS.children,
  contentStyle = {},
  contentPosition = DIVIDERS_DEFAULTS.contentPosition,
  style = {},
  unstyled = DIVIDERS_DEFAULTS.unstyled,
  ...props
}, ref) => {
  const variantClass = variant === "gradient" ? "w3f-dividers-gradient" : "";
  const animatedClass = animated ? "w3f-dividers-animated" : "";
  const cssClass = unstyled ? `w3f-dividers w3f-divider--unstyled ${className}`.trim().replace(/\s+/g, " ") : `w3f-dividers w3f-dividers-${type} ${variantClass} ${animatedClass} ${className}`.trim().replace(/\s+/g, " ");
  if (children && type === "horizontal") {
    const lineColor = buildLineBackgroundColor(color);
    const cssVars = {
      ...spacing !== "16px" ? { "--w3f-divider-spacing": spacing } : {},
      ...thickness !== "1px" ? { "--w3f-divider-thickness": thickness } : {},
      ...lineColor !== "var(--w3f-gray-300)" ? { "--w3f-divider-line-bg": lineColor } : {},
      ...style
    };
    const posClass = `w3f-dividers-with-content--${contentPosition}`;
    const lineMinClass = contentPosition !== "center" ? "w3f-dividers-line w3f-dividers-line--min" : "w3f-dividers-line";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `w3f-dividers-with-content ${posClass} ${className}`.trim(),
        style: Object.keys(cssVars).length > 0 ? cssVars : void 0,
        ...props,
        children: [
          contentPosition !== "left" && /* @__PURE__ */ jsx("div", { className: contentPosition === "center" ? "w3f-dividers-line" : lineMinClass }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "w3f-dividers-content",
              style: Object.keys(contentStyle).length > 0 ? contentStyle : void 0,
              children
            }
          ),
          contentPosition !== "right" && /* @__PURE__ */ jsx("div", { className: contentPosition === "center" ? "w3f-dividers-line" : lineMinClass })
        ]
      }
    );
  }
  const dynamicStyles = buildDynamicStyles(
    type,
    variant,
    thickness,
    spacing,
    height,
    color,
    gradient,
    animated,
    !!children,
    style
  );
  if (type === "horizontal") {
    return /* @__PURE__ */ jsx(
      "hr",
      {
        ref,
        className: cssClass,
        style: dynamicStyles,
        ...props
      }
    );
  }
  if (type === "vertical") {
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className: cssClass,
        style: dynamicStyles,
        role: "separator",
        "aria-orientation": "vertical",
        ...props
      }
    );
  }
  return null;
});
Dividers.displayName = "Dividers";
var Dividers_default = Dividers;
export {
  Dividers,
  Dividers_default as default
};
//# sourceMappingURL=Dividers.js.map

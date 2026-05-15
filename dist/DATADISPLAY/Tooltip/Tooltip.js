"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { TOOLTIP_DEFAULTS } from "./Tooltip.constants";
import { buildTooltipClasses, buildArrowClasses } from "./Tooltip.utils";
import { useTooltipVisibility } from "./Tooltip.hooks";
const Tooltip = forwardRef(({ children, config = {}, unstyled = TOOLTIP_DEFAULTS.unstyled }, ref) => {
  const {
    message = TOOLTIP_DEFAULTS.message,
    position = TOOLTIP_DEFAULTS.position,
    showDelay = TOOLTIP_DEFAULTS.showDelay,
    hideDelay = TOOLTIP_DEFAULTS.hideDelay,
    arrow = TOOLTIP_DEFAULTS.arrow,
    variant = TOOLTIP_DEFAULTS.variant
  } = config;
  const { isVisible, handleMouseEnter, handleMouseLeave } = useTooltipVisibility(showDelay, hideDelay);
  const tooltipClass = buildTooltipClasses(position, variant, isVisible, unstyled);
  const arrowClass = buildArrowClasses(position);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: "w3f-tooltip-wrapper",
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        children,
        /* @__PURE__ */ jsxs("div", { className: tooltipClass, children: [
          message,
          arrow && /* @__PURE__ */ jsx("div", { className: arrowClass })
        ] })
      ]
    }
  );
});
Tooltip.displayName = "Tooltip";
var Tooltip_default = Tooltip;
export {
  Tooltip,
  Tooltip_default as default
};
//# sourceMappingURL=Tooltip.js.map

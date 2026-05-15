"use client";
import { jsx } from "react/jsx-runtime";
import { CHART_TOOLTIP_DEFAULTS } from "./ChartTooltip.constants";
import { buildTooltipClasses } from "./ChartTooltip.utils";
const ChartTooltip = (props) => {
  const {
    left,
    top,
    visible,
    children,
    className,
    offsetX = CHART_TOOLTIP_DEFAULTS.offsetX,
    offsetY = CHART_TOOLTIP_DEFAULTS.offsetY
  } = props;
  const rootClass = buildTooltipClasses(visible, className);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: rootClass,
      style: {
        position: "absolute",
        left: left + offsetX,
        top: top + offsetY,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-4px)",
        transition: "opacity 120ms ease-out, transform 120ms ease-out"
      },
      role: "tooltip",
      children
    }
  );
};
ChartTooltip.displayName = "ChartTooltip";
var ChartTooltip_default = ChartTooltip;
export {
  ChartTooltip,
  ChartTooltip_default as default
};
//# sourceMappingURL=ChartTooltip.js.map

"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { GaugeInner } from "./GaugeInner";
import { useChartDimensions } from "./Gauge.hooks";
import { BASE_CHART_CLASSES } from "../_base/constants";
const Gauge = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 300, 200);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(GaugeInner, { ...rest, width, height }) }) });
  }
);
Gauge.displayName = "Gauge";
var Gauge_default = Gauge;
export {
  Gauge,
  Gauge_default as default
};
//# sourceMappingURL=Gauge.js.map

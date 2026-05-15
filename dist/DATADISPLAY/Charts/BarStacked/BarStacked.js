"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { BarStackedInner } from "./BarStackedInner";
import { useChartDimensions } from "./BarStacked.hooks";
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from "../_base/constants";
const BarStacked = React.forwardRef(
  ({ width: pw, height: ph, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(BarStackedInner, { ...rest, width, height }) }) });
  }
);
BarStacked.displayName = "BarStacked";
var BarStacked_default = BarStacked;
export {
  BarStacked,
  BarStacked_default as default
};
//# sourceMappingURL=BarStacked.js.map

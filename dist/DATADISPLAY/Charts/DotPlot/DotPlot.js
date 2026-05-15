"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { DotPlotInner } from "./DotPlotInner";
import { useChartDimensions } from "./DotPlot.hooks";
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from "../_base/constants";
const DotPlot = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(DotPlotInner, { ...rest, width, height }) }) });
  }
);
DotPlot.displayName = "DotPlot";
var DotPlot_default = DotPlot;
export {
  DotPlot,
  DotPlot_default as default
};
//# sourceMappingURL=DotPlot.js.map

"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { ThresholdInner } from "./ThresholdInner";
import { useChartDimensions } from "./Threshold.hooks";
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from "../_base/constants";
const Threshold = React.forwardRef(
  ({ width: pw, height: ph, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(
      containerRef,
      pw,
      ph,
      DEFAULT_CHART_WIDTH,
      DEFAULT_CHART_HEIGHT
    );
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(ThresholdInner, { ...rest, width, height }) }) });
  }
);
Threshold.displayName = "Threshold";
var Threshold_default = Threshold;
export {
  Threshold,
  Threshold_default as default
};
//# sourceMappingURL=Threshold.js.map

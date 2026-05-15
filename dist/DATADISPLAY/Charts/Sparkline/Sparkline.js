"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { SparklineInner } from "./SparklineInner";
import { useChartDimensions } from "./Sparkline.hooks";
const Sparkline = React.forwardRef(
  ({ width: propWidth, height: propHeight = 40, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 120, 40);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: propWidth ? void 0 : "100%", display: "inline-block" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, children: /* @__PURE__ */ jsx(SparklineInner, { ...rest, width, height }) }) });
  }
);
Sparkline.displayName = "Sparkline";
var Sparkline_default = Sparkline;
export {
  Sparkline,
  Sparkline_default as default
};
//# sourceMappingURL=Sparkline.js.map

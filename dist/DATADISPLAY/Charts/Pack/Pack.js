"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { PackInner } from "./PackInner";
import { useChartDimensions } from "./Pack.hooks";
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from "../_base/constants";
const Pack = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(PackInner, { ...rest, width, height }) }) });
  }
);
Pack.displayName = "Pack";
var Pack_default = Pack;
export {
  Pack,
  Pack_default as default
};
//# sourceMappingURL=Pack.js.map

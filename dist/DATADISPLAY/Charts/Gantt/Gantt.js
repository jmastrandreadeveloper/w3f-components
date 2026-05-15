"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { GanttInner } from "./GanttInner";
import { useChartDimensions } from "./Gantt.hooks";
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from "../_base/constants";
const Gantt = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(GanttInner, { ...rest, width, height }) }) });
  }
);
Gantt.displayName = "Gantt";
var Gantt_default = Gantt;
export {
  Gantt,
  Gantt_default as default
};
//# sourceMappingURL=Gantt.js.map

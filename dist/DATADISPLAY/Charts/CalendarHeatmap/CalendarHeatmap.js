"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { CalendarHeatmapInner } from "./CalendarHeatmapInner";
import { useChartDimensions } from "./CalendarHeatmap.hooks";
import { BASE_CHART_CLASSES } from "../_base/constants";
const CalendarHeatmap = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 800, 140);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(CalendarHeatmapInner, { ...rest, width, height }) }) });
  }
);
CalendarHeatmap.displayName = "CalendarHeatmap";
var CalendarHeatmap_default = CalendarHeatmap;
export {
  CalendarHeatmap,
  CalendarHeatmap_default as default
};
//# sourceMappingURL=CalendarHeatmap.js.map

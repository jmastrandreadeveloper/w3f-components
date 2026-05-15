"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { RadarInner } from "./RadarInner";
import { useChartDimensions } from "./Radar.hooks";
import { BASE_CHART_CLASSES } from "../_base/constants";
const Radar = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 400, 400);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(RadarInner, { ...rest, width, height }) }) });
  }
);
Radar.displayName = "Radar";
var Radar_default = Radar;
export {
  Radar,
  Radar_default as default
};
//# sourceMappingURL=Radar.js.map

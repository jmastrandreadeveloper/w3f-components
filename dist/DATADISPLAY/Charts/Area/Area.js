"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { AreaInner } from "./AreaInner";
import { useChartDimensions } from "./Area.hooks";
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from "../_base/constants";
const Area = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      DEFAULT_CHART_WIDTH,
      DEFAULT_CHART_HEIGHT
    );
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(AreaInner, { ...rest, width, height }) }) });
  }
);
Area.displayName = "Area";
var Area_default = Area;
export {
  Area,
  Area_default as default
};
//# sourceMappingURL=Area.js.map

"use client";
import { jsx } from "react/jsx-runtime";
import React, { useRef } from "react";
import { BulletInner } from "./BulletInner";
import { useChartDimensions } from "./Bullet.hooks";
import { DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT, BASE_CHART_CLASSES } from "../_base/constants";
const Bullet = React.forwardRef(
  ({ width: propWidth, height: propHeight, ...rest }, ref) => {
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
    return /* @__PURE__ */ jsx("div", { ref, style: { width: "100%" }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsx(BulletInner, { ...rest, width, height }) }) });
  }
);
Bullet.displayName = "Bullet";
var Bullet_default = Bullet;
export {
  Bullet,
  Bullet_default as default
};
//# sourceMappingURL=Bullet.js.map

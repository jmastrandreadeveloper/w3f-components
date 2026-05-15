"use client";
import { jsx } from "react/jsx-runtime";
import React from "react";
import { Pie } from "../Pie/Pie";
const Donut = React.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Pie, { ref, innerRadius: 0.55, ...props })
);
Donut.displayName = "Donut";
var Donut_default = Donut;
export {
  Donut,
  Donut_default as default
};
//# sourceMappingURL=Donut.js.map

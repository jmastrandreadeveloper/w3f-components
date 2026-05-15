"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { BASE_CHART_CLASSES } from "./constants";
const ChartHeader = ({ title, subtitle }) => {
  if (!title && !subtitle) return null;
  return /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.header, children: [
    title && /* @__PURE__ */ jsx("div", { className: BASE_CHART_CLASSES.title, children: title }),
    subtitle && /* @__PURE__ */ jsx("div", { className: BASE_CHART_CLASSES.subtitle, children: subtitle })
  ] });
};
ChartHeader.displayName = "ChartHeader";
export {
  ChartHeader
};
//# sourceMappingURL=ChartHeader.js.map

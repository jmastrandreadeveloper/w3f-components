"use client";
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { PAPER_DEFAULTS } from "./Paper.constants";
import { buildPaperClasses, buildPaperStyle } from "./Paper.utils";
const Paper = forwardRef(({
  children,
  className = PAPER_DEFAULTS.className,
  variant = PAPER_DEFAULTS.variant,
  gridColor = PAPER_DEFAULTS.gridColor,
  size = PAPER_DEFAULTS.size,
  fullWidth = PAPER_DEFAULTS.fullWidth,
  debug = PAPER_DEFAULTS.debug,
  unstyled = PAPER_DEFAULTS.unstyled,
  widthUnits,
  heightUnits,
  style = {}
}, ref) => {
  const cls = buildPaperClasses(variant, gridColor, size, fullWidth, debug, className, unstyled);
  const computedStyle = buildPaperStyle(widthUnits, heightUnits, style);
  return /* @__PURE__ */ jsx("div", { ref, className: cls, style: computedStyle, children });
});
Paper.displayName = "Paper";
var Paper_default = Paper;
export {
  Paper,
  Paper_default as default
};
//# sourceMappingURL=Paper.js.map

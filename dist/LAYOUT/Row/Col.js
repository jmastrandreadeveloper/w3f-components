"use client";
import { jsx } from "react/jsx-runtime";
import { buildColClasses } from "./Row.utils";
const Col = ({
  children,
  className,
  col,
  sm,
  md,
  lg,
  style,
  ...rest
}) => {
  const classes = buildColClasses({ col, sm, md, lg, className });
  return /* @__PURE__ */ jsx("div", { className: classes, style, ...rest, children });
};
Col.displayName = "Col";
var Col_default = Col;
export {
  Col,
  Col_default as default
};
//# sourceMappingURL=Col.js.map

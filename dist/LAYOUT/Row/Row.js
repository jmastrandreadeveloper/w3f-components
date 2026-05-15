"use client";
import { jsx } from "react/jsx-runtime";
import { buildRowClasses } from "./Row.utils";
const Row = ({
  children,
  className,
  style,
  ...rest
}) => {
  const classes = buildRowClasses(className);
  return /* @__PURE__ */ jsx("div", { className: classes, style, ...rest, children });
};
Row.displayName = "Row";
var Row_default = Row;
export {
  Row,
  Row_default as default
};
//# sourceMappingURL=Row.js.map

"use client";
import { jsx } from "react/jsx-runtime";
import { buildCellClassNames } from "./Cell.utils";
const CellRow = ({ children, className = "", style, ...props }) => {
  return /* @__PURE__ */ jsx("div", { className, style, ...props, children });
};
CellRow.displayName = "CellRow";
const Cell = ({
  children,
  content = false,
  center = false,
  vCenter = false,
  className = "",
  style,
  ...props
}) => {
  const classes = buildCellClassNames({ content, center, vCenter, className });
  return /* @__PURE__ */ jsx("div", { className: classes, style, ...props, children });
};
Cell.displayName = "Cell";
var Cell_default = Cell;
export {
  Cell,
  CellRow,
  Cell_default as default
};
//# sourceMappingURL=Cell.js.map

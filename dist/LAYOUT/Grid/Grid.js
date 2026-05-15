"use client";
import { jsx } from "react/jsx-runtime";
import { buildGridInlineStyles, buildGridItemClassNames, buildGridItemInlineStyles } from "./Grid.utils";
const Grid = ({
  children,
  className,
  style,
  ...props
}) => {
  const gridStyle = buildGridInlineStyles({ ...props, style });
  return /* @__PURE__ */ jsx("div", { style: gridStyle, className, ...{}, children });
};
Grid.displayName = "Grid";
const GridAreaItem = ({
  children,
  colSpan,
  gridArea,
  gridRow,
  gridColumn,
  justifySelf,
  alignSelf,
  placeSelf,
  style,
  className,
  ...rest
}) => {
  const classNames = buildGridItemClassNames({ colSpan, className });
  const itemStyle = buildGridItemInlineStyles({
    gridArea,
    gridRow,
    gridColumn,
    justifySelf,
    alignSelf,
    placeSelf,
    style
  });
  return /* @__PURE__ */ jsx("div", { style: itemStyle, className: classNames, ...rest, children });
};
GridAreaItem.displayName = "GridAreaItem";
var Grid_default = Grid;
export {
  Grid,
  GridAreaItem,
  Grid_default as default
};
//# sourceMappingURL=Grid.js.map

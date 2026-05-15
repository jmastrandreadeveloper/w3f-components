"use client";
import { jsx } from "react/jsx-runtime";
import { BUTTON_GRID_DEFAULTS } from "./ButtonGrid.constants";
import { buildButtonGridClasses } from "./ButtonGrid.utils";
const ButtonGrid = ({
  children,
  align = BUTTON_GRID_DEFAULTS.align,
  as: Element = BUTTON_GRID_DEFAULTS.as,
  className,
  style,
  ...rest
}) => {
  const classes = buildButtonGridClasses(align, className);
  return /* @__PURE__ */ jsx(Element, { className: classes, style, ...rest, children });
};
ButtonGrid.displayName = "ButtonGrid";
var ButtonGrid_default = ButtonGrid;
export {
  ButtonGrid,
  ButtonGrid_default as default
};
//# sourceMappingURL=ButtonGrid.js.map

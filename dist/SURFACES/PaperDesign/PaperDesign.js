"use client";
import { jsx } from "react/jsx-runtime";
import Paper from "../Paper/Paper";
import { PAPER_DESIGN_DEFAULTS } from "./PaperDesign.constants";
import { buildGridStyle, buildPaperDesignClasses } from "./PaperDesign.utils";
const PaperDesign = ({
  children,
  className,
  variant,
  gridColor,
  size,
  fullWidth,
  debug,
  widthUnits,
  heightUnits,
  style,
  // Grid
  columns = PAPER_DESIGN_DEFAULTS.columns,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gap = PAPER_DESIGN_DEFAULTS.gap,
  rowGap,
  columnGap,
  justifyContent,
  alignContent,
  justifyItems,
  alignItems,
  gridStyle,
  unstyled = PAPER_DESIGN_DEFAULTS.unstyled
}) => {
  const computedGridStyle = buildGridStyle(
    columns,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    gap,
    rowGap,
    columnGap,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
    gridStyle
  );
  return /* @__PURE__ */ jsx(
    Paper,
    {
      className,
      variant,
      gridColor,
      size,
      fullWidth,
      debug,
      widthUnits,
      heightUnits,
      style,
      children: /* @__PURE__ */ jsx("div", { className: buildPaperDesignClasses(void 0, unstyled), style: computedGridStyle, children })
    }
  );
};
PaperDesign.displayName = "PaperDesign";
var PaperDesign_default = PaperDesign;
export {
  PaperDesign,
  PaperDesign_default as default
};
//# sourceMappingURL=PaperDesign.js.map

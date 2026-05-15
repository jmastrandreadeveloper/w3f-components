"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { GridRows, GridColumns } from "@visx/grid";
import { CHART_GRID_DEFAULTS } from "./ChartGrid.constants";
import { buildGridClasses } from "./ChartGrid.utils";
const ChartGrid = (props) => {
  const {
    xScale,
    yScale,
    width,
    height,
    top = 0,
    left = 0,
    axis = CHART_GRID_DEFAULTS.axis,
    numTicks = CHART_GRID_DEFAULTS.numTicks,
    className
  } = props;
  const rootClass = buildGridClasses(axis, className);
  const commonProps = {
    stroke: "var(--w3f-chart-grid-stroke)",
    strokeDasharray: "var(--w3f-chart-grid-stroke-dasharray)",
    strokeOpacity: 1,
    numTicks
  };
  const drawRows = (axis === "rows" || axis === "both") && yScale;
  const drawCols = (axis === "columns" || axis === "both") && xScale;
  return /* @__PURE__ */ jsxs("g", { className: rootClass, transform: `translate(${left}, ${top})`, children: [
    drawRows && /* @__PURE__ */ jsx(
      GridRows,
      {
        scale: yScale,
        width,
        height,
        ...commonProps
      }
    ),
    drawCols && /* @__PURE__ */ jsx(
      GridColumns,
      {
        scale: xScale,
        width,
        height,
        ...commonProps
      }
    )
  ] });
};
ChartGrid.displayName = "ChartGrid";
var ChartGrid_default = ChartGrid;
export {
  ChartGrid,
  ChartGrid_default as default
};
//# sourceMappingURL=ChartGrid.js.map

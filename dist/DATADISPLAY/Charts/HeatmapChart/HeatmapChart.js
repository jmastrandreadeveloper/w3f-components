"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { HEATMAP_CHART_DEFAULTS, HEATMAP_CHART_MARGIN } from "./HeatmapChart.constants";
import {
  buildHeatmapChartClasses,
  extractAxes,
  buildHeatmapScales,
  getValue
} from "./HeatmapChart.utils";
import { useChartDimensions, useHoveredIndex } from "./HeatmapChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const HeatmapChart = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    colors = HEATMAP_CHART_DEFAULTS.colors,
    unstyled = HEATMAP_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind({ bindId });
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      HEATMAP_CHART_DEFAULTS.width,
      HEATMAP_CHART_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const margin = HEATMAP_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const classes = useMemo(
      () => buildHeatmapChartClasses(className, unstyled),
      [className, unstyled]
    );
    const { rows, cols } = useMemo(() => extractAxes(data), [data]);
    const { xScale, yScale, colorScale } = useMemo(
      () => buildHeatmapScales(data, innerWidth, innerHeight, colors),
      [data, innerWidth, innerHeight, colors]
    );
    const cells = useMemo(() => {
      const result = [];
      let idx = 0;
      for (const row of rows) {
        for (const col of cols) {
          const val = getValue(data, row, col);
          if (val !== void 0) {
            result.push({
              row,
              col,
              value: val,
              x: xScale(col) ?? 0,
              y: yScale(row) ?? 0,
              w: xScale.bandwidth(),
              h: yScale.bandwidth(),
              fill: colorScale(val),
              idx: idx++
            });
          }
        }
      }
      return result;
    }, [data, rows, cols, xScale, yScale, colorScale]);
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx("svg", { width, height, children: /* @__PURE__ */ jsxs(Group, { top: margin.top, left: margin.left, children: [
      cells.map((cell) => /* @__PURE__ */ jsx(
        "rect",
        {
          x: cell.x,
          y: cell.y,
          width: cell.w,
          height: cell.h,
          fill: cell.fill,
          opacity: hoveredIndex === cell.idx ? 0.8 : 1,
          rx: 2,
          onMouseEnter: () => onEnter(cell.idx),
          onMouseLeave: onLeave,
          style: { cursor: "pointer" }
        },
        `${cell.row}-${cell.col}`
      )),
      cols.map((col) => /* @__PURE__ */ jsx(
        "text",
        {
          x: (xScale(col) ?? 0) + xScale.bandwidth() / 2,
          y: innerHeight + 16,
          textAnchor: "middle",
          fill: "var(--w3f-text-secondary, #94a3b8)",
          fontSize: 10,
          children: col
        },
        `col-${col}`
      )),
      rows.map((row) => /* @__PURE__ */ jsx(
        "text",
        {
          x: -8,
          y: (yScale(row) ?? 0) + yScale.bandwidth() / 2,
          textAnchor: "end",
          dominantBaseline: "central",
          fill: "var(--w3f-text-secondary, #94a3b8)",
          fontSize: 10,
          children: row
        },
        `row-${row}`
      ))
    ] }) }) }) });
  }
);
HeatmapChart.displayName = "HeatmapChart";
var HeatmapChart_default = HeatmapChart;
export {
  HeatmapChart,
  HeatmapChart_default as default
};
//# sourceMappingURL=HeatmapChart.js.map

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { HEATMAP_DEFAULTS } from "./Heatmap.constants";
import { buildHeatmapClasses, buildTooltipContent, lookupValue } from "./Heatmap.utils";
import {
  useHeatmapAccessors,
  useHeatmapAxes,
  useHeatmapScales,
  useHeatmapInteraction,
  useInnerDims
} from "./Heatmap.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const HeatmapInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = HEATMAP_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    title,
    subtitle,
    getRow: getRowProp,
    getCol: getColProp,
    getValue: getValueProp,
    showRowLabels = HEATMAP_DEFAULTS.showRowLabels,
    showColLabels = HEATMAP_DEFAULTS.showColLabels,
    cellRadius = HEATMAP_DEFAULTS.cellRadius,
    colors = HEATMAP_DEFAULTS.colors,
    onHover,
    onSelect
  } = props;
  const { getRow, getCol, getValue } = useHeatmapAccessors(getRowProp, getColProp, getValueProp);
  const dims = useInnerDims(width, height, margin ?? { top: 10, right: 10, bottom: 40, left: 60 });
  const { rows, cols } = useHeatmapAxes(data, getRow, getCol);
  const { xScale, yScale, colorScale } = useHeatmapScales(rows, cols, data, getValue, dims.innerWidth, dims.innerHeight, colors);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useHeatmapInteraction(onHover, onSelect);
  const classes = useMemo(() => buildHeatmapClasses(className, unstyled), [className, unstyled]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty heatmap" }) });
  }
  const cellWidth = xScale.bandwidth();
  const cellHeight = yScale.bandwidth();
  const cells = useMemo(() => {
    const result = [];
    for (const row of rows) {
      for (const col of cols) {
        const val = lookupValue(data, row, col, getRow, getCol, getValue);
        if (val != null) {
          const datum = data.find((d) => String(getRow(d)) === row && String(getCol(d)) === col);
          result.push({ row, col, datum, value: val });
        }
      }
    }
    return result;
  }, [data, rows, cols, getRow, getCol, getValue]);
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Heatmap", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          cells.map((cell, i) => /* @__PURE__ */ jsx(
            "rect",
            {
              x: xScale(cell.col) ?? 0,
              y: yScale(cell.row) ?? 0,
              width: cellWidth,
              height: cellHeight,
              rx: cellRadius,
              fill: String(colorScale(cell.value)),
              opacity: hoveredIndex != null && hoveredIndex !== i ? 0.6 : 1,
              onMouseEnter: () => handleEnter(cell.datum, i),
              onMouseLeave: handleLeave,
              onClick: onSelect ? () => handleClick(cell.datum, i) : void 0,
              style: { cursor: onSelect ? "pointer" : void 0, transition: "opacity 120ms ease-out" }
            },
            `${cell.row}-${cell.col}`
          )),
          showRowLabels && rows.map((row) => /* @__PURE__ */ jsx(
            "text",
            {
              x: -6,
              y: (yScale(row) ?? 0) + cellHeight / 2,
              textAnchor: "end",
              dominantBaseline: "central",
              fontSize: 11,
              fill: "var(--w3f-chart-axis-tick-label-color, #64748b)",
              children: row
            },
            `row-${row}`
          )),
          showColLabels && cols.map((col) => /* @__PURE__ */ jsx(
            "text",
            {
              x: (xScale(col) ?? 0) + cellWidth / 2,
              y: dims.innerHeight + 16,
              textAnchor: "middle",
              fontSize: 11,
              fill: "var(--w3f-chart-axis-tick-label-color, #64748b)",
              children: col
            },
            `col-${col}`
          ))
        ] })
      ] }),
      showColLabels && hoveredIndex != null && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: (xScale(cells[hoveredIndex].col) ?? 0) + cellWidth / 2 + dims.margin.left,
          top: (yScale(cells[hoveredIndex].row) ?? 0) + dims.margin.top,
          visible: true,
          offsetY: -8,
          children: buildTooltipContent(cells[hoveredIndex].row, cells[hoveredIndex].col, cells[hoveredIndex].value)
        }
      )
    ] })
  ] });
};
HeatmapInner.displayName = "HeatmapInner";
var HeatmapInner_default = HeatmapInner;
export {
  HeatmapInner,
  HeatmapInner_default as default
};
//# sourceMappingURL=HeatmapInner.js.map

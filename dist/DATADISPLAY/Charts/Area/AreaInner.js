"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { AreaClosed, LinePath } from "@visx/shape";
import { curveMonotoneX, curveLinear } from "@visx/curve";
import { AREA_DEFAULTS } from "./Area.constants";
import { buildAreaClasses, toDate, formatTick } from "./Area.utils";
import { useAreaAccessors, useAreaScales, useAreaColor, useAreaInteraction, useInnerDims } from "./Area.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const AreaInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = AREA_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getDate: gD,
    getValue: gV,
    curved = AREA_DEFAULTS.curved,
    fillOpacity = AREA_DEFAULTS.fillOpacity,
    showLine = AREA_DEFAULTS.showLine,
    strokeWidth = AREA_DEFAULTS.strokeWidth,
    showXAxis = AREA_DEFAULTS.showXAxis,
    showYAxis = AREA_DEFAULTS.showYAxis,
    showGrid = AREA_DEFAULTS.showGrid,
    showTooltip = AREA_DEFAULTS.showTooltip,
    yDomain,
    formatY,
    tickRotateX = 0,
    highlightIndex = null,
    onHover,
    onSelect
  } = props;
  const { getDate, getValue } = useAreaAccessors(gD, gV);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useAreaScales(data, dims.innerWidth, dims.innerHeight, getDate, getValue, yDomain);
  const color = useAreaColor(colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useAreaInteraction(onHover, onSelect);
  const classes = useMemo(() => buildAreaClasses(className, unstyled), [className, unstyled]);
  const yTickFormat = formatY ?? formatTick;
  const curve = curved ? curveMonotoneX : curveLinear;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty area chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Area chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
          /* @__PURE__ */ jsx(
            AreaClosed,
            {
              data: [...data],
              x: (d) => xScale(toDate(getDate(d))) ?? 0,
              y: (d) => yScale(getValue(d)) ?? 0,
              yScale,
              fill: color,
              fillOpacity,
              curve
            }
          ),
          showLine && /* @__PURE__ */ jsx(
            LinePath,
            {
              data: [...data],
              x: (d) => xScale(toDate(getDate(d))) ?? 0,
              y: (d) => yScale(getValue(d)) ?? 0,
              stroke: color,
              strokeWidth,
              curve
            }
          ),
          data.map((d, i) => /* @__PURE__ */ jsx(
            "circle",
            {
              cx: xScale(toDate(getDate(d))) ?? 0,
              cy: yScale(getValue(d)) ?? 0,
              r: 8,
              fill: "transparent",
              onMouseEnter: () => handleEnter(d, i),
              onMouseLeave: handleLeave,
              onClick: onSelect ? () => handleClick(d, i) : void 0,
              style: { cursor: onSelect ? "pointer" : void 0 }
            },
            i
          )),
          hoveredIndex != null && /* @__PURE__ */ jsx(
            "circle",
            {
              cx: xScale(toDate(getDate(data[hoveredIndex]))) ?? 0,
              cy: yScale(getValue(data[hoveredIndex])) ?? 0,
              r: 5,
              fill: color,
              stroke: "#fff",
              strokeWidth: 2,
              pointerEvents: "none"
            }
          ),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight, tickRotate: tickRotateX }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yTickFormat }),
          highlightIndex != null && data[highlightIndex] != null && (() => {
            const d = data[highlightIndex];
            const cx = xScale(toDate(getDate(d))) ?? 0;
            const cy = yScale(getValue(d)) ?? 0;
            return /* @__PURE__ */ jsxs("g", { children: [
              /* @__PURE__ */ jsx("circle", { cx, cy, r: 12, fill: color, opacity: 0.2, pointerEvents: "none" }),
              /* @__PURE__ */ jsx("circle", { cx, cy, r: 6, fill: color, stroke: "#fff", strokeWidth: 2.5, pointerEvents: "none" }),
              /* @__PURE__ */ jsx("line", { x1: cx, y1: 0, x2: cx, y2: dims.innerHeight, stroke: color, strokeWidth: 1, strokeDasharray: "4 3", opacity: 0.6, pointerEvents: "none" })
            ] });
          })()
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const d = data[hoveredIndex];
        const date = toDate(getDate(d));
        return /* @__PURE__ */ jsx(ChartTooltip, { left: (xScale(date) ?? 0) + dims.margin.left, top: (yScale(getValue(d)) ?? 0) + dims.margin.top, visible: true, offsetY: -12, children: `${date.toLocaleDateString()}: ${getValue(d).toLocaleString()}` });
      })()
    ] })
  ] });
};
AreaInner.displayName = "AreaInner";
var AreaInner_default = AreaInner;
export {
  AreaInner,
  AreaInner_default as default
};
//# sourceMappingURL=AreaInner.js.map

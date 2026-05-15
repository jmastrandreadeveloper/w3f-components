"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { curveMonotoneX, curveLinear } from "@visx/curve";
import { LINE_DEFAULTS } from "./Line.constants";
import { buildLineClasses, toDate, formatTick } from "./Line.utils";
import { useLineAccessors, useLineScales, useLineColor, useLineInteraction, useInnerDims } from "./Line.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const LineInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = LINE_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getDate: gD,
    getValue: gV,
    curved = LINE_DEFAULTS.curved,
    showDots = LINE_DEFAULTS.showDots,
    strokeWidth = LINE_DEFAULTS.strokeWidth,
    showXAxis = LINE_DEFAULTS.showXAxis,
    showYAxis = LINE_DEFAULTS.showYAxis,
    showGrid = LINE_DEFAULTS.showGrid,
    showTooltip = LINE_DEFAULTS.showTooltip,
    yDomain,
    formatY,
    onHover,
    onSelect,
    highlightIndex = null
  } = props;
  const { getDate, getValue } = useLineAccessors(gD, gV);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useLineScales(data, dims.innerWidth, dims.innerHeight, getDate, getValue, yDomain);
  const color = useLineColor(colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useLineInteraction(onHover, onSelect);
  const classes = useMemo(() => buildLineClasses(className, unstyled), [className, unstyled]);
  const yTickFormat = formatY ?? formatTick;
  const curve = curved ? curveMonotoneX : curveLinear;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty line chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Line chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
          /* @__PURE__ */ jsx(
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
          showDots && data.map((d, i) => {
            const cx = xScale(toDate(getDate(d))) ?? 0;
            const cy = yScale(getValue(d)) ?? 0;
            return /* @__PURE__ */ jsx(
              "circle",
              {
                cx,
                cy,
                r: hoveredIndex === i ? 5 : 3,
                fill: color,
                stroke: "#fff",
                strokeWidth: 1.5,
                opacity: hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1,
                onMouseEnter: () => handleEnter(d, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(d, i) : void 0,
                style: { cursor: onSelect ? "pointer" : void 0, transition: "r 120ms, opacity 120ms" }
              },
              i
            );
          }),
          !showDots && data.map((d, i) => {
            const cx = xScale(toDate(getDate(d))) ?? 0;
            const cy = yScale(getValue(d)) ?? 0;
            return /* @__PURE__ */ jsx(
              "circle",
              {
                cx,
                cy,
                r: 8,
                fill: "transparent",
                onMouseEnter: () => handleEnter(d, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(d, i) : void 0,
                style: { cursor: onSelect ? "pointer" : void 0 }
              },
              i
            );
          }),
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
          highlightIndex != null && highlightIndex < data.length && (() => {
            const d = data[highlightIndex];
            const cx = xScale(toDate(getDate(d))) ?? 0;
            const cy = yScale(getValue(d)) ?? 0;
            return /* @__PURE__ */ jsxs("g", { pointerEvents: "none", children: [
              /* @__PURE__ */ jsx("line", { x1: cx, y1: 0, x2: cx, y2: dims.innerHeight, stroke: color, strokeWidth: 1, strokeDasharray: "4 3", opacity: 0.6 }),
              /* @__PURE__ */ jsx("circle", { cx, cy, r: 12, fill: color, opacity: 0.2 }),
              /* @__PURE__ */ jsx("circle", { cx, cy, r: 6, fill: color, stroke: "#fff", strokeWidth: 2.5 })
            ] });
          })(),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yTickFormat })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const d = data[hoveredIndex];
        const date = toDate(getDate(d));
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: (xScale(date) ?? 0) + dims.margin.left,
            top: (yScale(getValue(d)) ?? 0) + dims.margin.top,
            visible: true,
            offsetY: -12,
            children: `${date.toLocaleDateString()}: ${getValue(d).toLocaleString()}`
          }
        );
      })()
    ] })
  ] });
};
LineInner.displayName = "LineInner";
var LineInner_default = LineInner;
export {
  LineInner,
  LineInner_default as default
};
//# sourceMappingURL=LineInner.js.map

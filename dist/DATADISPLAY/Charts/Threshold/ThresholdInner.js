"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import VisxThreshold from "@visx/threshold/lib/Threshold";
import { curveMonotoneX, curveLinear } from "@visx/curve";
import { THRESHOLD_DEFAULTS } from "./Threshold.constants";
import { buildThresholdClasses, toDate, formatTick } from "./Threshold.utils";
import { useThresholdAccessors, useThresholdScales, useThresholdColors, useThresholdInteraction, useInnerDims } from "./Threshold.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { ChartLegend } from "../primitives/ChartLegend";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const ThresholdInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = THRESHOLD_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getDate: gD,
    getValue0: gV0,
    getValue1: gV1,
    label0 = "Series A",
    label1 = "Series B",
    aboveColor,
    belowColor,
    fillOpacity = THRESHOLD_DEFAULTS.fillOpacity,
    curved = THRESHOLD_DEFAULTS.curved,
    strokeWidth = THRESHOLD_DEFAULTS.strokeWidth,
    showXAxis = THRESHOLD_DEFAULTS.showXAxis,
    showYAxis = THRESHOLD_DEFAULTS.showYAxis,
    showGrid = THRESHOLD_DEFAULTS.showGrid,
    showTooltip = THRESHOLD_DEFAULTS.showTooltip,
    showLegend = THRESHOLD_DEFAULTS.showLegend,
    yDomain,
    formatY,
    onHover,
    highlightIndex = null
  } = props;
  const { getDate, getValue0, getValue1 } = useThresholdAccessors(gD, gV0, gV1);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useThresholdScales(data, dims.innerWidth, dims.innerHeight, getDate, getValue0, getValue1, yDomain);
  const colors = useThresholdColors(aboveColor, belowColor, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave } = useThresholdInteraction(onHover);
  const classes = useMemo(() => buildThresholdClasses(className, unstyled), [className, unstyled]);
  const yTickFormat = formatY ?? formatTick;
  const curve = curved ? curveMonotoneX : curveLinear;
  const legendItems = useMemo(() => [
    { id: "above", label: `${label0} > ${label1}`, color: colors.above },
    { id: "below", label: `${label1} > ${label0}`, color: colors.below }
  ], [label0, label1, colors]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty threshold chart" }) });
  }
  const mutableData = [...data];
  const thresholdId = `threshold-${bindId ?? "default"}-${width}`;
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    showLegend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Threshold chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
          /* @__PURE__ */ jsx(
            VisxThreshold,
            {
              id: thresholdId,
              data: mutableData,
              x: (d) => xScale(toDate(getDate(d))) ?? 0,
              y0: (d) => yScale(getValue0(d)) ?? 0,
              y1: (d) => yScale(getValue1(d)) ?? 0,
              clipAboveTo: 0,
              clipBelowTo: dims.innerHeight,
              curve,
              aboveAreaProps: { fill: colors.above, fillOpacity },
              belowAreaProps: { fill: colors.below, fillOpacity }
            }
          ),
          /* @__PURE__ */ jsx(
            LinePath,
            {
              data: mutableData,
              x: (d) => xScale(toDate(getDate(d))) ?? 0,
              y: (d) => yScale(getValue0(d)) ?? 0,
              stroke: colors.line0,
              strokeWidth,
              curve
            }
          ),
          /* @__PURE__ */ jsx(
            LinePath,
            {
              data: mutableData,
              x: (d) => xScale(toDate(getDate(d))) ?? 0,
              y: (d) => yScale(getValue1(d)) ?? 0,
              stroke: colors.line1,
              strokeWidth,
              strokeDasharray: "4,2",
              curve
            }
          ),
          data.map((d, i) => {
            const cx = xScale(toDate(getDate(d))) ?? 0;
            const midY = (yScale(getValue0(d)) + yScale(getValue1(d))) / 2;
            return /* @__PURE__ */ jsx(
              "circle",
              {
                cx,
                cy: midY,
                r: 8,
                fill: "transparent",
                onMouseEnter: () => handleEnter(d, i),
                onMouseLeave: handleLeave,
                style: { cursor: "default" }
              },
              i
            );
          }),
          hoveredIndex != null && (() => {
            const d = data[hoveredIndex];
            const cx = xScale(toDate(getDate(d))) ?? 0;
            return /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("circle", { cx, cy: yScale(getValue0(d)), r: 4, fill: colors.line0, stroke: "#fff", strokeWidth: 2, pointerEvents: "none" }),
              /* @__PURE__ */ jsx("circle", { cx, cy: yScale(getValue1(d)), r: 4, fill: colors.line1, stroke: "#fff", strokeWidth: 2, pointerEvents: "none" })
            ] });
          })(),
          highlightIndex != null && highlightIndex < data.length && (() => {
            const d = data[highlightIndex];
            const cx = xScale(toDate(getDate(d))) ?? 0;
            const cy = (yScale(getValue0(d)) + yScale(getValue1(d))) / 2;
            const hlColor = colors.above ?? "var(--w3f-primary)";
            return /* @__PURE__ */ jsxs("g", { pointerEvents: "none", children: [
              /* @__PURE__ */ jsx("line", { x1: cx, y1: 0, x2: cx, y2: dims.innerHeight, stroke: hlColor, strokeWidth: 1, strokeDasharray: "4 3", opacity: 0.6 }),
              /* @__PURE__ */ jsx("circle", { cx, cy: yScale(getValue0(d)), r: 12, fill: colors.line0, opacity: 0.2 }),
              /* @__PURE__ */ jsx("circle", { cx, cy: yScale(getValue0(d)), r: 6, fill: colors.line0, stroke: "#fff", strokeWidth: 2.5 }),
              /* @__PURE__ */ jsx("circle", { cx, cy: yScale(getValue1(d)), r: 12, fill: colors.line1, opacity: 0.2 }),
              /* @__PURE__ */ jsx("circle", { cx, cy: yScale(getValue1(d)), r: 6, fill: colors.line1, stroke: "#fff", strokeWidth: 2.5 })
            ] });
          })(),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yTickFormat })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const d = data[hoveredIndex];
        const date = toDate(getDate(d));
        const v0 = getValue0(d);
        const v1 = getValue1(d);
        const cx = (xScale(date) ?? 0) + dims.margin.left;
        const cy = (yScale(v0) + yScale(v1)) / 2 + dims.margin.top;
        return /* @__PURE__ */ jsx(ChartTooltip, { left: cx, top: cy, visible: true, offsetY: -12, children: `${date.toLocaleDateString()}
${label0}: ${v0.toLocaleString()}
${label1}: ${v1.toLocaleString()}` });
      })()
    ] })
  ] });
};
ThresholdInner.displayName = "ThresholdInner";
var ThresholdInner_default = ThresholdInner;
export {
  ThresholdInner,
  ThresholdInner_default as default
};
//# sourceMappingURL=ThresholdInner.js.map

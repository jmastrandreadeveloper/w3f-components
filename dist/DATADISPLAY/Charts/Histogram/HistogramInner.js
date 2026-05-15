"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar as VisxBar } from "@visx/shape";
import { HISTOGRAM_DEFAULTS } from "./Histogram.constants";
import { buildHistogramClasses, buildTooltipContent, formatTick } from "./Histogram.utils";
import {
  useHistogramBins,
  useHistogramScales,
  useHistogramColor,
  useHistogramInteraction,
  useInnerDims
} from "./Histogram.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const HistogramInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = HISTOGRAM_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    binCount = HISTOGRAM_DEFAULTS.binCount,
    showXAxis = HISTOGRAM_DEFAULTS.showXAxis,
    showYAxis = HISTOGRAM_DEFAULTS.showYAxis,
    showGrid = HISTOGRAM_DEFAULTS.showGrid,
    showTooltip = HISTOGRAM_DEFAULTS.showTooltip,
    barRadius = HISTOGRAM_DEFAULTS.barRadius,
    xDomain,
    formatX,
    formatY,
    onHover,
    onSelect,
    highlightIndex = null
  } = props;
  const bins = useHistogramBins(data, binCount, xDomain);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useHistogramScales(bins, dims.innerWidth, dims.innerHeight);
  const fillColor = useHistogramColor(colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useHistogramInteraction(onHover, onSelect);
  const classes = useMemo(() => buildHistogramClasses(className, unstyled), [className, unstyled]);
  const xf = formatX ?? formatTick;
  const yf = formatY ?? formatTick;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty histogram" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Histogram", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
          bins.map((bin, i) => {
            const barX = xScale(bin.x0) ?? 0;
            const barW = Math.max(0, (xScale(bin.x1) ?? 0) - barX - 1);
            const barY = yScale(bin.count) ?? 0;
            const barH = dims.innerHeight - barY;
            const isHovered = hoveredIndex === i;
            return /* @__PURE__ */ jsx(
              VisxBar,
              {
                x: barX,
                y: barY,
                width: barW,
                height: barH,
                fill: fillColor,
                opacity: highlightIndex != null ? highlightIndex === i ? 1 : 0.3 : hoveredIndex != null && !isHovered ? 0.4 : 0.8,
                stroke: highlightIndex === i ? "#fff" : void 0,
                strokeWidth: highlightIndex === i ? 2 : void 0,
                rx: barRadius,
                onMouseEnter: () => handleEnter(bin, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(bin, i) : void 0,
                style: { cursor: highlightIndex === i ? "pointer" : onSelect ? "pointer" : void 0, transition: "opacity 120ms ease-out" }
              },
              i
            );
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight, tickFormat: xf }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yf })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const bin = bins[hoveredIndex];
        const cx = ((xScale(bin.x0) ?? 0) + (xScale(bin.x1) ?? 0)) / 2 + dims.margin.left;
        const cy = (yScale(bin.count) ?? 0) + dims.margin.top;
        return /* @__PURE__ */ jsx(ChartTooltip, { left: cx, top: cy, visible: true, offsetY: -12, children: buildTooltipContent(bin) });
      })()
    ] })
  ] });
};
HistogramInner.displayName = "HistogramInner";
var HistogramInner_default = HistogramInner;
export {
  HistogramInner,
  HistogramInner_default as default
};
//# sourceMappingURL=HistogramInner.js.map

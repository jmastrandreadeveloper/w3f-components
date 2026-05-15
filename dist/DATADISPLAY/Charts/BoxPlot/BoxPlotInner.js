"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { BOXPLOT_DEFAULTS } from "./BoxPlot.constants";
import { buildBoxPlotClasses, buildTooltipContent, formatTick } from "./BoxPlot.utils";
import {
  useBoxPlotStats,
  useBoxPlotScales,
  useBoxPlotColors,
  useBoxPlotInteraction,
  useInnerDims
} from "./BoxPlot.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const BoxPlotInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = BOXPLOT_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showXAxis = BOXPLOT_DEFAULTS.showXAxis,
    showYAxis = BOXPLOT_DEFAULTS.showYAxis,
    showGrid = BOXPLOT_DEFAULTS.showGrid,
    showTooltip = BOXPLOT_DEFAULTS.showTooltip,
    showOutliers = BOXPLOT_DEFAULTS.showOutliers,
    boxWidth = BOXPLOT_DEFAULTS.boxWidth,
    yDomain,
    formatY,
    onHover,
    onSelect
  } = props;
  const stats = useBoxPlotStats(data);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useBoxPlotScales(stats, dims.innerWidth, dims.innerHeight, yDomain);
  const colors = useBoxPlotColors(stats, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBoxPlotInteraction(onHover, onSelect);
  const classes = useMemo(() => buildBoxPlotClasses(className, unstyled), [className, unstyled]);
  const yf = formatY ?? formatTick;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty box plot" }) });
  }
  const halfBox = Math.min(boxWidth, xScale.bandwidth()) / 2;
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Box plot", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
          stats.map((s, i) => {
            const cx = (xScale(s.group) ?? 0) + xScale.bandwidth() / 2;
            const isHovered = hoveredIndex === i;
            const opacity = hoveredIndex != null && !isHovered ? 0.4 : 1;
            const fill = colors[i];
            return /* @__PURE__ */ jsxs(
              "g",
              {
                opacity,
                style: { transition: "opacity 120ms ease-out", cursor: onSelect ? "pointer" : void 0 },
                onMouseEnter: () => handleEnter(s, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(s, i) : void 0,
                children: [
                  /* @__PURE__ */ jsx(
                    "line",
                    {
                      x1: cx,
                      x2: cx,
                      y1: yScale(s.max),
                      y2: yScale(s.min),
                      stroke: fill,
                      strokeWidth: 1.5
                    }
                  ),
                  /* @__PURE__ */ jsx("line", { x1: cx - halfBox * 0.5, x2: cx + halfBox * 0.5, y1: yScale(s.max), y2: yScale(s.max), stroke: fill, strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsx("line", { x1: cx - halfBox * 0.5, x2: cx + halfBox * 0.5, y1: yScale(s.min), y2: yScale(s.min), stroke: fill, strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: cx - halfBox,
                      y: yScale(s.thirdQuartile),
                      width: halfBox * 2,
                      height: yScale(s.firstQuartile) - yScale(s.thirdQuartile),
                      fill,
                      fillOpacity: 0.3,
                      stroke: fill,
                      strokeWidth: 1.5,
                      rx: 2
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "line",
                    {
                      x1: cx - halfBox,
                      x2: cx + halfBox,
                      y1: yScale(s.median),
                      y2: yScale(s.median),
                      stroke: fill,
                      strokeWidth: 2.5
                    }
                  ),
                  showOutliers && s.outliers.map((v, oi) => /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx,
                      cy: yScale(v),
                      r: 3,
                      fill: "none",
                      stroke: fill,
                      strokeWidth: 1.5
                    },
                    oi
                  ))
                ]
              },
              s.group
            );
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yf })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const s = stats[hoveredIndex];
        const cx = (xScale(s.group) ?? 0) + xScale.bandwidth() / 2 + dims.margin.left;
        const cy = yScale(s.median) + dims.margin.top;
        return /* @__PURE__ */ jsx(ChartTooltip, { left: cx, top: cy, visible: true, offsetY: -12, children: buildTooltipContent(s) });
      })()
    ] })
  ] });
};
BoxPlotInner.displayName = "BoxPlotInner";
var BoxPlotInner_default = BoxPlotInner;
export {
  BoxPlotInner,
  BoxPlotInner_default as default
};
//# sourceMappingURL=BoxPlotInner.js.map

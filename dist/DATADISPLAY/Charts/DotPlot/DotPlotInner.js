"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { DOTPLOT_DEFAULTS } from "./DotPlot.constants";
import { buildDotPlotClasses, buildTooltipContent, formatTick } from "./DotPlot.utils";
import { useDotPlotAccessors, useDotPlotScales, useDotPlotColors, useDotPlotInteraction, useInnerDims } from "./DotPlot.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const DotPlotInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    categories,
    unstyled = DOTPLOT_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getX: gxp,
    getCategory: gcp,
    showXAxis = DOTPLOT_DEFAULTS.showXAxis,
    showCategoryLabels = DOTPLOT_DEFAULTS.showCategoryLabels,
    showGrid = DOTPLOT_DEFAULTS.showGrid,
    showTooltip = DOTPLOT_DEFAULTS.showTooltip,
    pointRadius = DOTPLOT_DEFAULTS.pointRadius,
    xDomain,
    formatX,
    onHover,
    onSelect
  } = props;
  const { getX, getCategory } = useDotPlotAccessors(gxp, gcp);
  const dims = useInnerDims(width, height, margin ?? { top: 20, right: 20, bottom: 40, left: 80 });
  const { xScale, yScale } = useDotPlotScales(data, categories, dims.innerWidth, dims.innerHeight, getX, xDomain);
  const categoryColors = useDotPlotColors(categories, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useDotPlotInteraction(onHover, onSelect);
  const classes = useMemo(() => buildDotPlotClasses(className, unstyled), [className, unstyled]);
  const xf = formatX ?? formatTick;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty dot plot" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Dot plot", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { xScale, width: dims.innerWidth, height: dims.innerHeight, axis: "columns" }),
          data.map((d, i) => {
            const catIdx = getCategory(d);
            const catName = categories[catIdx] ?? "";
            const cx = xScale(getX(d)) ?? 0;
            const cy = (yScale(catName) ?? 0) + yScale.bandwidth() / 2;
            return /* @__PURE__ */ jsx(
              Circle,
              {
                cx,
                cy,
                r: pointRadius,
                fill: categoryColors[catIdx % categoryColors.length],
                opacity: hoveredIndex != null && hoveredIndex !== i ? 0.4 : 0.8,
                onMouseEnter: () => handleEnter(d, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(d, i) : void 0,
                style: { cursor: onSelect ? "pointer" : void 0, transition: "opacity 120ms ease-out" }
              },
              i
            );
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight, tickFormat: xf }),
          showCategoryLabels && categories.map((cat) => /* @__PURE__ */ jsx(
            "text",
            {
              x: -8,
              y: (yScale(cat) ?? 0) + yScale.bandwidth() / 2,
              textAnchor: "end",
              dominantBaseline: "central",
              fontSize: 11,
              fill: "var(--w3f-chart-axis-tick-label-color, #64748b)",
              children: cat
            },
            cat
          ))
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const d = data[hoveredIndex];
        const catIdx = getCategory(d);
        const catName = categories[catIdx] ?? "";
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: (xScale(getX(d)) ?? 0) + dims.margin.left,
            top: (yScale(catName) ?? 0) + yScale.bandwidth() / 2 + dims.margin.top,
            visible: true,
            offsetY: -12,
            children: buildTooltipContent(d, getX, catName)
          }
        );
      })()
    ] })
  ] });
};
DotPlotInner.displayName = "DotPlotInner";
var DotPlotInner_default = DotPlotInner;
export {
  DotPlotInner,
  DotPlotInner_default as default
};
//# sourceMappingURL=DotPlotInner.js.map

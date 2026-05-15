"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar as VisxBar } from "@visx/shape";
import { BAR_SH_DEFAULTS } from "./BarStackedHorizontal.constants";
import { buildBarSHClasses, formatTick } from "./BarStackedHorizontal.utils";
import { useBarSHAccessors, useBarSHScales, useStackHData, useBarSHColors, useBarSHInteraction, useInnerDims } from "./BarStackedHorizontal.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { ChartLegend } from "../primitives/ChartLegend";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const BarStackedHorizontalInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    keys,
    unstyled = BAR_SH_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getLabel: gL,
    showXAxis = BAR_SH_DEFAULTS.showXAxis,
    showYAxis = BAR_SH_DEFAULTS.showYAxis,
    showGrid = BAR_SH_DEFAULTS.showGrid,
    showTooltip = BAR_SH_DEFAULTS.showTooltip,
    showLegend = BAR_SH_DEFAULTS.showLegend,
    padding = BAR_SH_DEFAULTS.padding,
    barRadius = BAR_SH_DEFAULTS.barRadius,
    formatX,
    highlightIndex = null,
    highlightKey = null,
    onHover,
    onSelect
  } = props;
  const { getLabel } = useBarSHAccessors(gL);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useBarSHScales(data, keys, dims.innerWidth, dims.innerHeight, getLabel, padding);
  const stackRows = useStackHData(data, keys, getLabel);
  const colorMap = useBarSHColors(keys, colorScheme);
  const { hovered, handleEnter, handleLeave, handleClick } = useBarSHInteraction(onHover, onSelect);
  const classes = useMemo(() => buildBarSHClasses(className, unstyled), [className, unstyled]);
  const xTickFormat = formatX ?? formatTick;
  const legendItems = useMemo(() => keys.map((k) => ({ id: k, label: k, color: colorMap[k] })), [keys, colorMap]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty stacked horizontal bar chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    showLegend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Stacked horizontal bar chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { xScale, width: dims.innerWidth, height: dims.innerHeight, axis: "columns" }),
          stackRows.map((row, gi) => {
            const barY = yScale(row.label) ?? 0;
            const bh = yScale.bandwidth();
            return /* @__PURE__ */ jsx(Group, { children: row.segments.map((seg, ki) => {
              const x0 = xScale(seg.x0) ?? 0;
              const x1 = xScale(seg.x1) ?? 0;
              const barX = x0;
              const barW = x1 - x0;
              const isHovered = hovered?.groupIdx === gi && hovered?.keyIdx === ki;
              const isHighlightedGroup = highlightIndex === gi;
              const isHighlightedBar = isHighlightedGroup && (highlightKey == null || highlightKey === seg.key);
              const isDimmed = highlightIndex != null ? !isHighlightedBar : hovered != null && !isHovered;
              return /* @__PURE__ */ jsx(
                VisxBar,
                {
                  x: barX,
                  y: barY,
                  width: Math.max(barW, 0),
                  height: bh,
                  fill: colorMap[seg.key],
                  opacity: isDimmed ? 0.3 : 1,
                  stroke: isHighlightedBar ? "#fff" : void 0,
                  strokeWidth: isHighlightedBar ? 2 : void 0,
                  rx: barRadius,
                  onMouseEnter: () => handleEnter(data[gi], gi, ki),
                  onMouseLeave: handleLeave,
                  onClick: onSelect ? () => handleClick(data[gi], gi) : void 0,
                  style: { cursor: onSelect ? "pointer" : void 0, transition: "opacity 120ms ease-out" }
                },
                seg.key
              );
            }) }, row.label);
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight, tickFormat: xTickFormat }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left" })
        ] })
      ] }),
      showTooltip && hovered != null && (() => {
        const row = stackRows[hovered.groupIdx];
        const seg = row.segments[hovered.keyIdx];
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: (xScale(seg.x1) ?? 0) + dims.margin.left,
            top: (yScale(row.label) ?? 0) + yScale.bandwidth() / 2 + dims.margin.top,
            visible: true,
            offsetX: 8,
            children: `${seg.key}: ${seg.value.toLocaleString()}`
          }
        );
      })()
    ] })
  ] });
};
BarStackedHorizontalInner.displayName = "BarStackedHorizontalInner";
var BarStackedHorizontalInner_default = BarStackedHorizontalInner;
export {
  BarStackedHorizontalInner,
  BarStackedHorizontalInner_default as default
};
//# sourceMappingURL=BarStackedHorizontalInner.js.map

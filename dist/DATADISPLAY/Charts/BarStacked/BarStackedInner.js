"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar as VisxBar } from "@visx/shape";
import { BAR_STACKED_DEFAULTS } from "./BarStacked.constants";
import { buildBarStackedClasses, formatTick } from "./BarStacked.utils";
import { useBarStackedAccessors, useBarStackedScales, useStackData, useBarStackedColors, useBarStackedInteraction, useInnerDims } from "./BarStacked.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { ChartLegend } from "../primitives/ChartLegend";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const BarStackedInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    keys,
    unstyled = BAR_STACKED_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getLabel: gL,
    showXAxis = BAR_STACKED_DEFAULTS.showXAxis,
    showYAxis = BAR_STACKED_DEFAULTS.showYAxis,
    showGrid = BAR_STACKED_DEFAULTS.showGrid,
    showTooltip = BAR_STACKED_DEFAULTS.showTooltip,
    showLegend = BAR_STACKED_DEFAULTS.showLegend,
    padding = BAR_STACKED_DEFAULTS.padding,
    barRadius = BAR_STACKED_DEFAULTS.barRadius,
    formatY,
    highlightIndex = null,
    highlightKey = null,
    onHover,
    onSelect
  } = props;
  const { getLabel } = useBarStackedAccessors(gL);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useBarStackedScales(data, keys, dims.innerWidth, dims.innerHeight, getLabel, padding);
  const stackRows = useStackData(data, keys, getLabel);
  const colorMap = useBarStackedColors(keys, colorScheme);
  const { hovered, handleEnter, handleLeave, handleClick } = useBarStackedInteraction(onHover, onSelect);
  const classes = useMemo(() => buildBarStackedClasses(className, unstyled), [className, unstyled]);
  const yTickFormat = formatY ?? formatTick;
  const legendItems = useMemo(() => keys.map((k) => ({ id: k, label: k, color: colorMap[k] })), [keys, colorMap]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty stacked bar chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    showLegend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Stacked bar chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
          stackRows.map((row, gi) => {
            const barX = xScale(row.label) ?? 0;
            const bw = xScale.bandwidth();
            return /* @__PURE__ */ jsx(Group, { children: row.segments.map((seg, ki) => {
              const y0 = yScale(seg.y0) ?? 0;
              const y1 = yScale(seg.y1) ?? 0;
              const barY = y1;
              const barH = y0 - y1;
              const isHovered = hovered?.groupIdx === gi && hovered?.keyIdx === ki;
              const isHighlightedGroup = highlightIndex === gi;
              const isHighlightedBar = isHighlightedGroup && (highlightKey == null || highlightKey === seg.key);
              const isDimmed = highlightIndex != null ? !isHighlightedBar : hovered != null && !isHovered;
              return /* @__PURE__ */ jsx(
                VisxBar,
                {
                  x: barX,
                  y: barY,
                  width: bw,
                  height: Math.max(barH, 0),
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
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yTickFormat })
        ] })
      ] }),
      showTooltip && hovered != null && (() => {
        const row = stackRows[hovered.groupIdx];
        const seg = row.segments[hovered.keyIdx];
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: (xScale(row.label) ?? 0) + xScale.bandwidth() / 2 + dims.margin.left,
            top: (yScale(seg.y1) ?? 0) + dims.margin.top,
            visible: true,
            offsetY: -8,
            children: `${seg.key}: ${seg.value.toLocaleString()}`
          }
        );
      })()
    ] })
  ] });
};
BarStackedInner.displayName = "BarStackedInner";
var BarStackedInner_default = BarStackedInner;
export {
  BarStackedInner,
  BarStackedInner_default as default
};
//# sourceMappingURL=BarStackedInner.js.map

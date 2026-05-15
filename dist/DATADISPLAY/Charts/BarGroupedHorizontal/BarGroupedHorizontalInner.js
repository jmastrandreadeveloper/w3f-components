"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar as VisxBar } from "@visx/shape";
import { BAR_GH_DEFAULTS } from "./BarGroupedHorizontal.constants";
import { buildBarGHClasses, formatTick } from "./BarGroupedHorizontal.utils";
import { useBarGHAccessors, useBarGHScales, useBarGHColors, useBarGHInteraction, useInnerDims } from "./BarGroupedHorizontal.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { ChartLegend } from "../primitives/ChartLegend";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const BarGroupedHorizontalInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    keys,
    unstyled = BAR_GH_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getLabel: gL,
    showXAxis = BAR_GH_DEFAULTS.showXAxis,
    showYAxis = BAR_GH_DEFAULTS.showYAxis,
    showGrid = BAR_GH_DEFAULTS.showGrid,
    showTooltip = BAR_GH_DEFAULTS.showTooltip,
    showLegend = BAR_GH_DEFAULTS.showLegend,
    padding = BAR_GH_DEFAULTS.padding,
    barRadius = BAR_GH_DEFAULTS.barRadius,
    xDomain,
    formatX,
    highlightIndex = null,
    highlightKey = null,
    onHover,
    onSelect
  } = props;
  const { getLabel } = useBarGHAccessors(gL);
  const dims = useInnerDims(width, height, margin);
  const { y0Scale, y1Scale, xScale } = useBarGHScales(data, keys, dims.innerWidth, dims.innerHeight, getLabel, padding, xDomain);
  const colorMap = useBarGHColors(keys, colorScheme);
  const { hovered, handleEnter, handleLeave, handleClick } = useBarGHInteraction(onHover, onSelect);
  const classes = useMemo(() => buildBarGHClasses(className, unstyled), [className, unstyled]);
  const xTickFormat = formatX ?? formatTick;
  const legendItems = useMemo(() => keys.map((k) => ({ id: k, label: k, color: colorMap[k] })), [keys, colorMap]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty grouped horizontal bar chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    showLegend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Grouped horizontal bar chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { xScale, width: dims.innerWidth, height: dims.innerHeight, axis: "columns" }),
          data.map((d, gi) => {
            const label = String(getLabel(d));
            const groupY = y0Scale(label) ?? 0;
            return /* @__PURE__ */ jsx(Group, { top: groupY, children: keys.map((key, ki) => {
              const value = Number(d[key]) || 0;
              const barY = y1Scale(key) ?? 0;
              const barW = xScale(value) ?? 0;
              const isHovered = hovered?.groupIdx === gi && hovered?.keyIdx === ki;
              const isHighlightedGroup = highlightIndex === gi;
              const isHighlightedBar = isHighlightedGroup && (highlightKey == null || highlightKey === key);
              const isDimmed = highlightIndex != null ? !isHighlightedBar : hovered != null && !isHovered;
              return /* @__PURE__ */ jsx(
                VisxBar,
                {
                  x: 0,
                  y: barY,
                  width: Math.max(barW, 0),
                  height: y1Scale.bandwidth(),
                  fill: colorMap[key],
                  opacity: isDimmed ? 0.3 : 1,
                  stroke: isHighlightedBar ? "#fff" : void 0,
                  strokeWidth: isHighlightedBar ? 2 : void 0,
                  rx: barRadius,
                  onMouseEnter: () => handleEnter(d, gi, ki),
                  onMouseLeave: handleLeave,
                  onClick: onSelect ? () => handleClick(d, gi) : void 0,
                  style: { cursor: onSelect ? "pointer" : void 0, transition: "opacity 120ms ease-out" }
                },
                key
              );
            }) }, label);
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight, tickFormat: xTickFormat }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: y0Scale, orientation: "left" })
        ] })
      ] }),
      showTooltip && hovered != null && (() => {
        const d = data[hovered.groupIdx];
        const key = keys[hovered.keyIdx];
        const label = String(getLabel(d));
        const value = Number(d[key]) || 0;
        const groupY = y0Scale(label) ?? 0;
        const barY = y1Scale(key) ?? 0;
        return /* @__PURE__ */ jsx(ChartTooltip, { left: (xScale(value) ?? 0) + dims.margin.left, top: groupY + barY + y1Scale.bandwidth() / 2 + dims.margin.top, visible: true, offsetX: 8, children: `${key}: ${value.toLocaleString()}` });
      })()
    ] })
  ] });
};
BarGroupedHorizontalInner.displayName = "BarGroupedHorizontalInner";
var BarGroupedHorizontalInner_default = BarGroupedHorizontalInner;
export {
  BarGroupedHorizontalInner,
  BarGroupedHorizontalInner_default as default
};
//# sourceMappingURL=BarGroupedHorizontalInner.js.map

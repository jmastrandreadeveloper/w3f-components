"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar as VisxBar } from "@visx/shape";
import { BAR_H_DEFAULTS } from "./BarHorizontal.constants";
import { buildBarHClasses, buildTooltipContent, formatTick } from "./BarHorizontal.utils";
import {
  useBarHAccessors,
  useBarHScales,
  useBarHColors,
  useBarHInteraction,
  useInnerDims
} from "./BarHorizontal.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const BarHorizontalInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = BAR_H_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getLabel: gL,
    getValue: gV,
    showXAxis = BAR_H_DEFAULTS.showXAxis,
    showYAxis = BAR_H_DEFAULTS.showYAxis,
    showGrid = BAR_H_DEFAULTS.showGrid,
    showTooltip = BAR_H_DEFAULTS.showTooltip,
    padding = BAR_H_DEFAULTS.padding,
    barRadius = BAR_H_DEFAULTS.barRadius,
    xDomain,
    formatX,
    highlightIndex = null,
    onHover,
    onSelect
  } = props;
  const { getLabel, getValue } = useBarHAccessors(gL, gV);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useBarHScales(data, dims.innerWidth, dims.innerHeight, getLabel, getValue, padding, xDomain);
  const colors = useBarHColors(data, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBarHInteraction(onHover, onSelect);
  const classes = useMemo(() => buildBarHClasses(className, unstyled), [className, unstyled]);
  const xTickFormat = formatX ?? formatTick;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty horizontal bar chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Horizontal bar chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { xScale, width: dims.innerWidth, height: dims.innerHeight, axis: "columns" }),
          data.map((d, i) => {
            const label = String(getLabel(d));
            const value = getValue(d);
            const bh = yScale.bandwidth();
            const barY = yScale(label) ?? 0;
            const barWidth = xScale(value) ?? 0;
            return /* @__PURE__ */ jsx(
              VisxBar,
              {
                x: 0,
                y: barY,
                width: Math.max(barWidth, 0),
                height: bh,
                fill: colors[i],
                opacity: highlightIndex != null ? highlightIndex === i ? 1 : 0.3 : hoveredIndex != null && hoveredIndex !== i ? 0.5 : 1,
                stroke: highlightIndex === i ? "#fff" : void 0,
                strokeWidth: highlightIndex === i ? 2 : void 0,
                rx: barRadius,
                onMouseEnter: () => handleEnter(d, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(d, i) : void 0,
                style: { cursor: onSelect ? "pointer" : void 0, transition: "opacity 120ms ease-out" }
              },
              label
            );
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight, tickFormat: xTickFormat }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left" })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: (xScale(getValue(data[hoveredIndex])) ?? 0) + dims.margin.left,
          top: (yScale(String(getLabel(data[hoveredIndex]))) ?? 0) + yScale.bandwidth() / 2 + dims.margin.top,
          visible: true,
          offsetX: 8,
          children: buildTooltipContent(data[hoveredIndex], getLabel, getValue)
        }
      )
    ] })
  ] });
};
BarHorizontalInner.displayName = "BarHorizontalInner";
var BarHorizontalInner_default = BarHorizontalInner;
export {
  BarHorizontalInner,
  BarHorizontalInner_default as default
};
//# sourceMappingURL=BarHorizontalInner.js.map

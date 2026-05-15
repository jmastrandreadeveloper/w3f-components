"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar as VisxBar } from "@visx/shape";
import { BAR_DEFAULTS } from "./Bar.constants";
import { buildBarClasses, buildTooltipContent, formatTick } from "./Bar.utils";
import {
  useBarAccessors,
  useBarScales,
  useBarColors,
  useBarInteraction,
  useInnerDims
} from "./Bar.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { ChartLegend } from "../primitives/ChartLegend";
import { ChartHeader } from "../_base/ChartHeader";
import { BASE_CHART_CLASSES } from "../_base/constants";
const BarInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = BAR_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getLabel: getLabelProp,
    getValue: getValueProp,
    showXAxis = BAR_DEFAULTS.showXAxis,
    showYAxis = BAR_DEFAULTS.showYAxis,
    showGrid = BAR_DEFAULTS.showGrid,
    showTooltip = BAR_DEFAULTS.showTooltip,
    showLegend = BAR_DEFAULTS.showLegend,
    padding = BAR_DEFAULTS.padding,
    barRadius = BAR_DEFAULTS.barRadius,
    yDomain,
    formatY,
    highlightIndex = null,
    onHover,
    onSelect
  } = props;
  const { getLabel, getValue } = useBarAccessors(getLabelProp, getValueProp);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useBarScales(
    data,
    dims.innerWidth,
    dims.innerHeight,
    getLabel,
    getValue,
    padding,
    yDomain
  );
  const colors = useBarColors(data, getLabel, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBarInteraction(
    onHover,
    onSelect
  );
  const classes = useMemo(() => buildBarClasses(className, unstyled), [className, unstyled]);
  const yTickFormat = formatY ?? formatTick;
  const legendItems = useMemo(
    () => showLegend ? data.map((d, i) => ({ id: String(getLabel(d)), label: String(getLabel(d)), color: colors[i] })) : [],
    [showLegend, data, getLabel, colors]
  );
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx(
      "svg",
      {
        width,
        height,
        className: BASE_CHART_CLASSES.svg,
        role: "img",
        "aria-label": ariaLabel ?? "Empty bar chart"
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs(
        "svg",
        {
          width,
          height,
          className: BASE_CHART_CLASSES.svg,
          role: "img",
          "aria-label": ariaLabel ?? "Bar chart",
          children: [
            description && /* @__PURE__ */ jsx("desc", { children: description }),
            /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
              showGrid && /* @__PURE__ */ jsx(
                ChartGrid,
                {
                  yScale,
                  width: dims.innerWidth,
                  height: dims.innerHeight,
                  axis: "rows"
                }
              ),
              data.map((d, i) => {
                const label = String(getLabel(d));
                const value = getValue(d);
                const bw = xScale.bandwidth();
                const barX = xScale(label) ?? 0;
                const barY = yScale(value) ?? 0;
                const barHeight = dims.innerHeight - barY;
                return /* @__PURE__ */ jsx(
                  VisxBar,
                  {
                    x: barX,
                    y: barY,
                    width: bw,
                    height: Math.max(barHeight, 0),
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
              showXAxis && /* @__PURE__ */ jsx(
                ChartAxis,
                {
                  scale: xScale,
                  orientation: "bottom",
                  top: dims.innerHeight
                }
              ),
              showYAxis && /* @__PURE__ */ jsx(
                ChartAxis,
                {
                  scale: yScale,
                  orientation: "left",
                  tickFormat: yTickFormat
                }
              )
            ] })
          ]
        }
      ),
      showTooltip && hoveredIndex != null && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: (xScale(String(getLabel(data[hoveredIndex]))) ?? 0) + xScale.bandwidth() / 2 + dims.margin.left,
          top: (yScale(getValue(data[hoveredIndex])) ?? 0) + dims.margin.top,
          visible: true,
          offsetY: -8,
          children: buildTooltipContent(data[hoveredIndex], getLabel, getValue)
        }
      )
    ] }),
    showLegend && legendItems.length > 0 && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems, direction: "horizontal" })
  ] });
};
BarInner.displayName = "BarInner";
var BarInner_default = BarInner;
export {
  BarInner,
  BarInner_default as default
};
//# sourceMappingURL=BarInner.js.map

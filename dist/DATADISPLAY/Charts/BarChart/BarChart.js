"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { BAR_CHART_DEFAULTS, BAR_CHART_MARGIN } from "./BarChart.constants";
import { buildBarChartClasses, buildBarScales, formatTick } from "./BarChart.utils";
import { useChartDimensions, useHoveredIndex } from "./BarChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const BarChart = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = BAR_CHART_DEFAULTS.color,
    horizontal = BAR_CHART_DEFAULTS.horizontal,
    unstyled = BAR_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind({ bindId });
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      BAR_CHART_DEFAULTS.width,
      BAR_CHART_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const margin = BAR_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo(
      () => buildBarScales(data, innerWidth, innerHeight, horizontal),
      [data, innerWidth, innerHeight, horizontal]
    );
    const classes = useMemo(
      () => buildBarChartClasses(className, unstyled),
      [className, unstyled]
    );
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx("svg", { width, height, children: /* @__PURE__ */ jsxs(Group, { top: margin.top, left: margin.left, children: [
      data.map((d, i) => {
        if (horizontal) {
          const bandScale2 = yScale;
          const linearScale2 = xScale;
          const barHeight2 = bandScale2.bandwidth?.() ?? 0;
          const barWidth2 = linearScale2(d.value) ?? 0;
          const barY2 = bandScale2(d.label) ?? 0;
          return /* @__PURE__ */ jsx(
            Bar,
            {
              x: 0,
              y: barY2,
              width: barWidth2,
              height: barHeight2,
              fill: color,
              opacity: hoveredIndex === i ? 0.8 : 1,
              rx: 2,
              onMouseEnter: () => onEnter(i),
              onMouseLeave: onLeave
            },
            d.label
          );
        }
        const bandScale = xScale;
        const linearScale = yScale;
        const barWidth = bandScale.bandwidth?.() ?? 0;
        const barHeight = innerHeight - (linearScale(d.value) ?? 0);
        const barX = bandScale(d.label) ?? 0;
        const barY = linearScale(d.value) ?? 0;
        return /* @__PURE__ */ jsx(
          Bar,
          {
            x: barX,
            y: barY,
            width: barWidth,
            height: barHeight,
            fill: color,
            opacity: hoveredIndex === i ? 0.8 : 1,
            rx: 2,
            onMouseEnter: () => onEnter(i),
            onMouseLeave: onLeave
          },
          d.label
        );
      }),
      /* @__PURE__ */ jsx(
        AxisBottom,
        {
          top: innerHeight,
          scale: horizontal ? xScale : xScale,
          tickFormat: formatTick,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      ),
      /* @__PURE__ */ jsx(
        AxisLeft,
        {
          scale: horizontal ? yScale : yScale,
          tickFormat: formatTick,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      )
    ] }) }) }) });
  }
);
BarChart.displayName = "BarChart";
var BarChart_default = BarChart;
export {
  BarChart,
  BarChart_default as default
};
//# sourceMappingURL=BarChart.js.map

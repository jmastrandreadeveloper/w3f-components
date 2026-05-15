"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo, useId } from "react";
import { Group } from "@visx/group";
import { AreaClosed, LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { AREA_CHART_DEFAULTS, AREA_CHART_MARGIN } from "./AreaChart.constants";
import { buildAreaChartClasses, buildAreaScales, formatTick } from "./AreaChart.utils";
import { useChartDimensions } from "./AreaChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const AreaChart = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = AREA_CHART_DEFAULTS.color,
    gradient = AREA_CHART_DEFAULTS.gradient,
    unstyled = AREA_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind({ bindId });
    const containerRef = useRef(null);
    const gradientId = useId();
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      AREA_CHART_DEFAULTS.width,
      AREA_CHART_DEFAULTS.height
    );
    const margin = AREA_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo(
      () => buildAreaScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight]
    );
    const classes = useMemo(
      () => buildAreaChartClasses(className, unstyled),
      [className, unstyled]
    );
    const getX = (d) => xScale(d.x) ?? 0;
    const getY = (d) => yScale(d.y) ?? 0;
    const safeGradientId = gradientId.replace(/:/g, "_");
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsxs("svg", { width, height, children: [
      gradient && /* @__PURE__ */ jsx(
        LinearGradient,
        {
          id: safeGradientId,
          from: color,
          to: color,
          fromOpacity: 0.4,
          toOpacity: 0.05
        }
      ),
      /* @__PURE__ */ jsxs(Group, { top: margin.top, left: margin.left, children: [
        /* @__PURE__ */ jsx(
          AreaClosed,
          {
            data,
            x: getX,
            y: getY,
            yScale,
            curve: curveMonotoneX,
            fill: gradient ? `url(#${safeGradientId})` : color,
            fillOpacity: gradient ? 1 : 0.3
          }
        ),
        /* @__PURE__ */ jsx(
          LinePath,
          {
            data,
            x: getX,
            y: getY,
            stroke: color,
            strokeWidth: 2,
            curve: curveMonotoneX
          }
        ),
        /* @__PURE__ */ jsx(
          AxisBottom,
          {
            top: innerHeight,
            scale: xScale,
            tickFormat: formatTick,
            stroke: "var(--w3f-text-secondary, #94a3b8)",
            tickStroke: "var(--w3f-text-secondary, #94a3b8)",
            tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
          }
        ),
        /* @__PURE__ */ jsx(
          AxisLeft,
          {
            scale: yScale,
            tickFormat: formatTick,
            stroke: "var(--w3f-text-secondary, #94a3b8)",
            tickStroke: "var(--w3f-text-secondary, #94a3b8)",
            tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
          }
        )
      ] })
    ] }) }) });
  }
);
AreaChart.displayName = "AreaChart";
var AreaChart_default = AreaChart;
export {
  AreaChart,
  AreaChart_default as default
};
//# sourceMappingURL=AreaChart.js.map

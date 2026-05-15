"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { curveMonotoneX, curveLinear } from "@visx/curve";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LINE_CHART_DEFAULTS, LINE_CHART_MARGIN } from "./LineChart.constants";
import { buildLineChartClasses, buildLineScales, formatTick } from "./LineChart.utils";
import { useChartDimensions } from "./LineChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const LineChart = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = LINE_CHART_DEFAULTS.color,
    curved = LINE_CHART_DEFAULTS.curved,
    showDots = LINE_CHART_DEFAULTS.showDots,
    unstyled = LINE_CHART_DEFAULTS.unstyled,
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
      LINE_CHART_DEFAULTS.width,
      LINE_CHART_DEFAULTS.height
    );
    const margin = LINE_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo(
      () => buildLineScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight]
    );
    const classes = useMemo(
      () => buildLineChartClasses(className, unstyled),
      [className, unstyled]
    );
    const getX = (d) => xScale(d.x) ?? 0;
    const getY = (d) => yScale(d.y) ?? 0;
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx("svg", { width, height, children: /* @__PURE__ */ jsxs(Group, { top: margin.top, left: margin.left, children: [
      /* @__PURE__ */ jsx(
        LinePath,
        {
          data,
          x: getX,
          y: getY,
          stroke: color,
          strokeWidth: 2,
          curve: curved ? curveMonotoneX : curveLinear
        }
      ),
      showDots && data.map((d, i) => /* @__PURE__ */ jsx(
        "circle",
        {
          cx: getX(d),
          cy: getY(d),
          r: 4,
          fill: color,
          stroke: "var(--w3f-surface, #fff)",
          strokeWidth: 2
        },
        i
      )),
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
    ] }) }) }) });
  }
);
LineChart.displayName = "LineChart";
var LineChart_default = LineChart;
export {
  LineChart,
  LineChart_default as default
};
//# sourceMappingURL=LineChart.js.map

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { SCATTER_PLOT_DEFAULTS, SCATTER_PLOT_MARGIN } from "./ScatterPlot.constants";
import { buildScatterPlotClasses, buildScatterScales, formatTick } from "./ScatterPlot.utils";
import { useChartDimensions, useHoveredIndex } from "./ScatterPlot.hooks";
import { useBridgeBind } from "@w3f/bridge";
const ScatterPlot = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = SCATTER_PLOT_DEFAULTS.color,
    unstyled = SCATTER_PLOT_DEFAULTS.unstyled,
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
      SCATTER_PLOT_DEFAULTS.width,
      SCATTER_PLOT_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const margin = SCATTER_PLOT_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo(
      () => buildScatterScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight]
    );
    const classes = useMemo(
      () => buildScatterPlotClasses(className, unstyled),
      [className, unstyled]
    );
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx("svg", { width, height, children: /* @__PURE__ */ jsxs(Group, { top: margin.top, left: margin.left, children: [
      data.map((d, i) => /* @__PURE__ */ jsx(
        Circle,
        {
          cx: xScale(d.x) ?? 0,
          cy: yScale(d.y) ?? 0,
          r: d.size ?? SCATTER_PLOT_DEFAULTS.defaultPointSize,
          fill: d.color ?? color,
          opacity: hoveredIndex === i ? 0.7 : 0.85,
          onMouseEnter: () => onEnter(i),
          onMouseLeave: onLeave,
          style: { cursor: "pointer", transition: "opacity 0.15s" }
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
ScatterPlot.displayName = "ScatterPlot";
var ScatterPlot_default = ScatterPlot;
export {
  ScatterPlot,
  ScatterPlot_default as default
};
//# sourceMappingURL=ScatterPlot.js.map

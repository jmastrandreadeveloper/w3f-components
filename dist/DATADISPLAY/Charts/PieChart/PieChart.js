"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { PIE_CHART_DEFAULTS } from "./PieChart.constants";
import { buildPieChartClasses, getSliceColor, getSliceValue } from "./PieChart.utils";
import { useChartDimensions, useHoveredIndex } from "./PieChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const PieChart = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    donut = PIE_CHART_DEFAULTS.donut,
    unstyled = PIE_CHART_DEFAULTS.unstyled,
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
      PIE_CHART_DEFAULTS.width,
      PIE_CHART_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = donut ? radius * 0.55 : 0;
    const centerX = width / 2;
    const centerY = height / 2;
    const classes = useMemo(
      () => buildPieChartClasses(className, unstyled),
      [className, unstyled]
    );
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx("svg", { width, height, children: /* @__PURE__ */ jsx(Group, { top: centerY, left: centerX, children: /* @__PURE__ */ jsx(
      Pie,
      {
        data,
        pieValue: getSliceValue,
        outerRadius: radius,
        innerRadius,
        padAngle: 0.01,
        children: (pie) => pie.arcs.map((arc, i) => {
          const pathD = pie.path(arc) ?? "";
          return /* @__PURE__ */ jsxs("g", { children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: pathD,
                fill: getSliceColor(arc.data, i),
                opacity: hoveredIndex === i ? 0.8 : 1,
                onMouseEnter: () => onEnter(i),
                onMouseLeave: onLeave,
                style: { cursor: "pointer", transition: "opacity 0.15s" }
              }
            ),
            radius > 60 && /* @__PURE__ */ jsx(
              "text",
              {
                x: pie.path.centroid(arc)[0],
                y: pie.path.centroid(arc)[1],
                textAnchor: "middle",
                dominantBaseline: "central",
                fill: "#fff",
                fontSize: 11,
                fontWeight: 600,
                pointerEvents: "none",
                children: arc.data.label
              }
            )
          ] }, arc.data.label);
        })
      }
    ) }) }) }) });
  }
);
PieChart.displayName = "PieChart";
var PieChart_default = PieChart;
export {
  PieChart,
  PieChart_default as default
};
//# sourceMappingURL=PieChart.js.map

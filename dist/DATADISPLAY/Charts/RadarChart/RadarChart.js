"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { RADAR_CHART_DEFAULTS, RADAR_CHART_MARGIN } from "./RadarChart.constants";
import {
  buildRadarChartClasses,
  buildRadarPolygon,
  buildGridPolygon,
  labelPosition
} from "./RadarChart.utils";
import { useChartDimensions, useHoveredIndex } from "./RadarChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const GRID_LEVELS = 5;
const RadarChart = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = RADAR_CHART_DEFAULTS.color,
    unstyled = RADAR_CHART_DEFAULTS.unstyled,
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
      RADAR_CHART_DEFAULTS.width,
      RADAR_CHART_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const margin = RADAR_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const cx = innerWidth / 2 + margin.left;
    const cy = innerHeight / 2 + margin.top;
    const classes = useMemo(
      () => buildRadarChartClasses(className, unstyled),
      [className, unstyled]
    );
    const polygonPoints = useMemo(
      () => buildRadarPolygon(data, radius),
      [data, radius]
    );
    const gridPolygons = useMemo(
      () => Array.from(
        { length: GRID_LEVELS },
        (_, i) => buildGridPolygon(data.length, radius, i + 1, GRID_LEVELS)
      ),
      [data.length, radius]
    );
    const labels = useMemo(
      () => data.map((d, i) => ({ ...labelPosition(i, data.length, radius), label: d.axis })),
      [data, radius]
    );
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx("svg", { width, height, children: /* @__PURE__ */ jsxs(Group, { top: cy, left: cx, children: [
      gridPolygons.map((points, i) => /* @__PURE__ */ jsx(
        "polygon",
        {
          points,
          fill: "none",
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          strokeOpacity: 0.2,
          strokeWidth: 1
        },
        `grid-${i}`
      )),
      data.map((_, i) => {
        const angle = Math.PI * 2 * i / data.length - Math.PI / 2;
        return /* @__PURE__ */ jsx(
          "line",
          {
            x1: 0,
            y1: 0,
            x2: radius * Math.cos(angle),
            y2: radius * Math.sin(angle),
            stroke: "var(--w3f-text-secondary, #94a3b8)",
            strokeOpacity: 0.3,
            strokeWidth: 1
          },
          `axis-${i}`
        );
      }),
      /* @__PURE__ */ jsx(
        "polygon",
        {
          points: polygonPoints,
          fill: color,
          fillOpacity: 0.25,
          stroke: color,
          strokeWidth: 2
        }
      ),
      data.map((d, i) => {
        const maxVal = Math.max(...data.map((dd) => dd.value), 1);
        const angle = Math.PI * 2 * i / data.length - Math.PI / 2;
        const r = d.value / maxVal * radius;
        return /* @__PURE__ */ jsx(
          "circle",
          {
            cx: r * Math.cos(angle),
            cy: r * Math.sin(angle),
            r: hoveredIndex === i ? 5 : 3.5,
            fill: color,
            stroke: "#fff",
            strokeWidth: 1.5,
            onMouseEnter: () => onEnter(i),
            onMouseLeave: onLeave,
            style: { cursor: "pointer" }
          },
          `point-${i}`
        );
      }),
      labels.map((lbl, i) => /* @__PURE__ */ jsx(
        "text",
        {
          x: lbl.x,
          y: lbl.y,
          textAnchor: lbl.anchor,
          dominantBaseline: "central",
          fill: "var(--w3f-text-secondary, #94a3b8)",
          fontSize: 11,
          children: lbl.label
        },
        `label-${i}`
      ))
    ] }) }) }) });
  }
);
RadarChart.displayName = "RadarChart";
var RadarChart_default = RadarChart;
export {
  RadarChart,
  RadarChart_default as default
};
//# sourceMappingURL=RadarChart.js.map

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { RADAR_DEFAULTS } from "./Radar.constants";
import {
  buildRadarClasses,
  buildPolygon,
  buildGridPolygon,
  labelPosition,
  axisAngle,
  buildTooltipContent
} from "./Radar.utils";
import { useRadarAccessors, useRadarScale, useRadarColor, useRadarInteraction } from "./Radar.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const RadarInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = RADAR_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getLabel: glp,
    getValue: gvp,
    gridLevels = RADAR_DEFAULTS.gridLevels,
    showGrid = RADAR_DEFAULTS.showGrid,
    showLabels = RADAR_DEFAULTS.showLabels,
    showTooltip = RADAR_DEFAULTS.showTooltip,
    showDots = RADAR_DEFAULTS.showDots,
    fillOpacity = RADAR_DEFAULTS.fillOpacity,
    maxValue,
    onHover,
    onSelect
  } = props;
  const { getLabel, getValue } = useRadarAccessors(glp, gvp);
  const margin = 40;
  const radius = Math.min(width, height) / 2 - margin;
  const rScale = useRadarScale(data, getValue, radius, maxValue);
  const color = useRadarColor(colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useRadarInteraction(onHover, onSelect);
  const classes = useMemo(() => buildRadarClasses(className, unstyled), [className, unstyled]);
  const cx = width / 2;
  const cy = height / 2;
  const n = data.length;
  if (n === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty radar chart" }) });
  }
  const polygon = buildPolygon(data, getValue, rScale);
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Radar chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: cy, left: cx, children: [
          showGrid && Array.from({ length: gridLevels }, (_, level) => {
            const r = radius * (level + 1) / gridLevels;
            return /* @__PURE__ */ jsx(
              "polygon",
              {
                points: buildGridPolygon(n, r),
                fill: "none",
                stroke: "var(--w3f-chart-grid-stroke, #e2e8f0)",
                strokeWidth: 0.5,
                strokeDasharray: "2 4"
              },
              level
            );
          }),
          showGrid && data.map((_, i) => {
            const angle = axisAngle(i, n);
            return /* @__PURE__ */ jsx(
              "line",
              {
                x1: 0,
                y1: 0,
                x2: Math.cos(angle) * radius,
                y2: Math.sin(angle) * radius,
                stroke: "var(--w3f-chart-grid-stroke, #e2e8f0)",
                strokeWidth: 0.5
              },
              i
            );
          }),
          /* @__PURE__ */ jsx(
            "polygon",
            {
              points: polygon,
              fill: color,
              fillOpacity,
              stroke: color,
              strokeWidth: 2
            }
          ),
          showDots && data.map((d, i) => {
            const angle = axisAngle(i, n);
            const r = rScale(getValue(d));
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            const isHovered = hoveredIndex === i;
            return /* @__PURE__ */ jsx(
              "circle",
              {
                cx: px,
                cy: py,
                r: isHovered ? 5 : 3.5,
                fill: color,
                stroke: "#fff",
                strokeWidth: 2,
                onMouseEnter: () => handleEnter(d, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(d, i) : void 0,
                style: { cursor: onSelect ? "pointer" : void 0, transition: "r 120ms ease-out" }
              },
              i
            );
          }),
          showLabels && data.map((d, i) => {
            const pos = labelPosition(i, n, radius);
            return /* @__PURE__ */ jsx(
              "text",
              {
                x: pos.x,
                y: pos.y,
                textAnchor: pos.anchor,
                dominantBaseline: "central",
                fontSize: 11,
                fill: "var(--w3f-chart-axis-tick-label-color, #64748b)",
                children: getLabel(d)
              },
              i
            );
          })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const d = data[hoveredIndex];
        const angle = axisAngle(hoveredIndex, n);
        const r = rScale(getValue(d));
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: cx + Math.cos(angle) * r,
            top: cy + Math.sin(angle) * r,
            visible: true,
            offsetY: -12,
            children: buildTooltipContent(d, getLabel, getValue)
          }
        );
      })()
    ] })
  ] });
};
RadarInner.displayName = "RadarInner";
var RadarInner_default = RadarInner;
export {
  RadarInner,
  RadarInner_default as default
};
//# sourceMappingURL=RadarInner.js.map

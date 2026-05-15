"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { GAUGE_CHART_DEFAULTS } from "./GaugeChart.constants";
import {
  buildGaugeChartClasses,
  buildGaugeScale,
  getGaugeColor,
  arcPath,
  needlePath
} from "./GaugeChart.utils";
import { useChartDimensions } from "./GaugeChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const GaugeChart = React.forwardRef(
  ({
    value,
    min = GAUGE_CHART_DEFAULTS.min,
    max = GAUGE_CHART_DEFAULTS.max,
    color = GAUGE_CHART_DEFAULTS.color,
    thresholds,
    width: propWidth,
    height: propHeight,
    unstyled = GAUGE_CHART_DEFAULTS.unstyled,
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
      GAUGE_CHART_DEFAULTS.width,
      GAUGE_CHART_DEFAULTS.height
    );
    const classes = useMemo(
      () => buildGaugeChartClasses(className, unstyled),
      [className, unstyled]
    );
    const outerRadius = Math.min(width / 2 - 10, height - 30);
    const innerRadius = outerRadius * 0.65;
    const cx = width / 2;
    const cy = height - 20;
    const angleScale = useMemo(() => buildGaugeScale(min, max), [min, max]);
    const needleAngle = angleScale(Math.max(min, Math.min(max, value)));
    const fillColor = getGaugeColor(value, color, thresholds);
    const bgArc = useMemo(
      () => arcPath(cx, cy, outerRadius, -Math.PI / 2, Math.PI / 2, innerRadius),
      [cx, cy, outerRadius, innerRadius]
    );
    const filledArc = useMemo(
      () => arcPath(cx, cy, outerRadius, -Math.PI / 2, needleAngle, innerRadius),
      [cx, cy, outerRadius, innerRadius, needleAngle]
    );
    const needle = useMemo(
      () => needlePath(cx, cy, outerRadius - 4, needleAngle, 3),
      [cx, cy, outerRadius, needleAngle]
    );
    const pct = Math.round((value - min) / (max - min) * 100);
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsxs("svg", { width, height, children: [
      /* @__PURE__ */ jsx("path", { d: bgArc, fill: "var(--w3f-surface-variant, #334155)", opacity: 0.3 }),
      /* @__PURE__ */ jsx("path", { d: filledArc, fill: fillColor }),
      /* @__PURE__ */ jsx("path", { d: needle, fill: "var(--w3f-text-primary, #e2e8f0)" }),
      /* @__PURE__ */ jsx("circle", { cx, cy, r: 5, fill: "var(--w3f-text-primary, #e2e8f0)" }),
      /* @__PURE__ */ jsx(
        "text",
        {
          x: cx,
          y: cy - innerRadius * 0.3,
          textAnchor: "middle",
          dominantBaseline: "central",
          fill: "var(--w3f-text-primary, #e2e8f0)",
          fontSize: Math.max(14, outerRadius * 0.22),
          fontWeight: 700,
          children: value
        }
      ),
      /* @__PURE__ */ jsx(
        "text",
        {
          x: cx - outerRadius,
          y: cy + 14,
          textAnchor: "middle",
          fill: "var(--w3f-text-secondary, #94a3b8)",
          fontSize: 10,
          children: min
        }
      ),
      /* @__PURE__ */ jsx(
        "text",
        {
          x: cx + outerRadius,
          y: cy + 14,
          textAnchor: "middle",
          fill: "var(--w3f-text-secondary, #94a3b8)",
          fontSize: 10,
          children: max
        }
      )
    ] }) }) });
  }
);
GaugeChart.displayName = "GaugeChart";
var GaugeChart_default = GaugeChart;
export {
  GaugeChart,
  GaugeChart_default as default
};
//# sourceMappingURL=GaugeChart.js.map

"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { GAUGE_DEFAULTS } from "./Gauge.constants";
import { buildGaugeClasses, arcPath, needlePath } from "./Gauge.utils";
import { useGaugeScale, useGaugeColor } from "./Gauge.hooks";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const GaugeInner = (props) => {
  const {
    value,
    width,
    height,
    className,
    unstyled = GAUGE_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    title,
    subtitle,
    min = GAUGE_DEFAULTS.min,
    max = GAUGE_DEFAULTS.max,
    color = GAUGE_DEFAULTS.color,
    thresholds,
    showValue = GAUGE_DEFAULTS.showValue,
    showMinMax = GAUGE_DEFAULTS.showMinMax,
    highlightIndex,
    formatValue
  } = props;
  const scale = useGaugeScale(min, max);
  const fillColor = useGaugeColor(value, color, thresholds);
  const classes = useMemo(() => buildGaugeClasses(className, unstyled), [className, unstyled]);
  const cx = width / 2;
  const cy = height * 0.72;
  const outerR = Math.min(width / 2, height * 0.65) * 0.9;
  const innerR = outerR * 0.7;
  const needleLen = outerR * 0.85;
  const startAngle = -Math.PI / 2;
  const endAngle = Math.PI / 2;
  const valueAngle = scale(value);
  const needle = needlePath(cx, cy, needleLen, valueAngle);
  const fmt = formatValue ?? ((v) => v.toFixed(0));
  const segments = useMemo(() => {
    if (!thresholds || thresholds.length === 0) return null;
    const sorted = [...thresholds].sort((a, b) => a.value - b.value);
    return sorted.map((t, i) => {
      const from = i === 0 ? min : sorted[i - 1].value;
      const to = t.value;
      return { color: t.color, fromAngle: scale(from), toAngle: scale(to) };
    });
  }, [thresholds, min, scale]);
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsx("div", { className: BASE_CHART_CLASSES.container, children: /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? `Gauge: ${value}`, children: [
      description && /* @__PURE__ */ jsx("desc", { children: description }),
      segments ? (
        /* Threshold arcs — each segment colored, highlightIndex dims others */
        segments.map((seg, i) => /* @__PURE__ */ jsx(
          "path",
          {
            d: arcPath(cx, cy, outerR, innerR, seg.fromAngle, seg.toAngle),
            fill: seg.color,
            opacity: highlightIndex != null && highlightIndex !== i ? 0.25 : 1,
            style: { transition: "opacity 150ms ease-out" }
          },
          i
        ))
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("path", { d: arcPath(cx, cy, outerR, innerR, startAngle, endAngle), fill: "var(--w3f-chart-grid-stroke, #e2e8f0)", opacity: 0.4 }),
        /* @__PURE__ */ jsx("path", { d: arcPath(cx, cy, outerR, innerR, startAngle, valueAngle), fill: fillColor })
      ] }),
      segments && /* @__PURE__ */ jsx(
        "path",
        {
          d: arcPath(cx, cy, outerR * 0.96, innerR * 1.04, startAngle, valueAngle),
          fill: "rgba(0,0,0,0.18)"
        }
      ),
      /* @__PURE__ */ jsx("path", { d: needle, fill: "var(--w3f-chart-text-color, #1e293b)" }),
      /* @__PURE__ */ jsx("circle", { cx, cy, r: 6, fill: "var(--w3f-chart-text-color, #1e293b)" }),
      /* @__PURE__ */ jsx("circle", { cx, cy, r: 3, fill: "#fff" }),
      showValue && /* @__PURE__ */ jsx(
        "text",
        {
          x: cx,
          y: cy + outerR * 0.35,
          textAnchor: "middle",
          fontSize: Math.max(16, outerR * 0.22),
          fontWeight: 700,
          fill: "var(--w3f-chart-text-color, #1e293b)",
          children: fmt(value)
        }
      ),
      showMinMax && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "text",
          {
            x: cx - outerR - 4,
            y: cy + 4,
            textAnchor: "end",
            fontSize: 10,
            fill: "var(--w3f-chart-secondary-text-color, #94a3b8)",
            children: min
          }
        ),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: cx + outerR + 4,
            y: cy + 4,
            textAnchor: "start",
            fontSize: 10,
            fill: "var(--w3f-chart-secondary-text-color, #94a3b8)",
            children: max
          }
        )
      ] })
    ] }) })
  ] });
};
GaugeInner.displayName = "GaugeInner";
var GaugeInner_default = GaugeInner;
export {
  GaugeInner,
  GaugeInner_default as default
};
//# sourceMappingURL=GaugeInner.js.map

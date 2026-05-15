"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useCallback, useRef } from "react";
import { SPARKLINE_DEFAULTS } from "./Sparkline.constants";
import { buildSparklineClasses, buildSparklinePath, buildAreaPath } from "./Sparkline.utils";
import { useSparklineScales, useSparklineHover } from "./Sparkline.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { ChartHeader } from "../_base/ChartHeader";
const PADDING = 4;
const SparklineInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = SPARKLINE_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    title,
    subtitle,
    color = SPARKLINE_DEFAULTS.color,
    showArea = SPARKLINE_DEFAULTS.showArea,
    showEndDot = SPARKLINE_DEFAULTS.showEndDot,
    showMinMax = SPARKLINE_DEFAULTS.showMinMax,
    strokeWidth = SPARKLINE_DEFAULTS.strokeWidth,
    showTooltip = SPARKLINE_DEFAULTS.showTooltip,
    onHover,
    onSelect,
    highlightIndex = null
  } = props;
  const svgRef = useRef(null);
  const { xScale, yScale } = useSparklineScales(data, width, height);
  const { hoveredIndex, handleMove, handleLeave } = useSparklineHover(onHover);
  const classes = useMemo(() => buildSparklineClasses(className, unstyled), [className, unstyled]);
  const linePath = useMemo(() => buildSparklinePath(data, xScale, yScale), [data, xScale, yScale]);
  const areaPath = useMemo(
    () => showArea ? buildAreaPath(data, xScale, yScale, height, PADDING) : "",
    [data, xScale, yScale, height, showArea]
  );
  const minIdx = useMemo(() => {
    if (!showMinMax || data.length === 0) return -1;
    let mi = 0;
    for (let i = 1; i < data.length; i++) if (data[i] < data[mi]) mi = i;
    return mi;
  }, [data, showMinMax]);
  const maxIdx = useMemo(() => {
    if (!showMinMax || data.length === 0) return -1;
    let mi = 0;
    for (let i = 1; i < data.length; i++) if (data[i] > data[mi]) mi = i;
    return mi;
  }, [data, showMinMax]);
  const handleMouseMove = useCallback((e) => {
    if (data.length === 0) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    let nearest = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < data.length; i++) {
      const dist = Math.abs(xScale(i) - mouseX);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    }
    handleMove(nearest, data[nearest]);
  }, [data, xScale, handleMove]);
  const handleClick = useCallback(() => {
    if (hoveredIndex != null && onSelect) onSelect(data[hoveredIndex], hoveredIndex);
  }, [hoveredIndex, data, onSelect]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, role: "img", "aria-label": ariaLabel ?? "Empty sparkline" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, style: { display: "inline-block", lineHeight: 0 }, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-block" }, children: [
      /* @__PURE__ */ jsxs(
        "svg",
        {
          ref: svgRef,
          width,
          height,
          role: "img",
          "aria-label": ariaLabel ?? "Sparkline",
          onMouseMove: handleMouseMove,
          onMouseLeave: handleLeave,
          onClick: handleClick,
          style: { cursor: onSelect ? "pointer" : "default" },
          children: [
            showArea && /* @__PURE__ */ jsx("path", { d: areaPath, fill: color, fillOpacity: 0.15 }),
            /* @__PURE__ */ jsx("path", { d: linePath, fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" }),
            showEndDot && data.length > 0 && /* @__PURE__ */ jsx("circle", { cx: xScale(data.length - 1), cy: yScale(data[data.length - 1]), r: strokeWidth + 1, fill: color }),
            showMinMax && minIdx >= 0 && /* @__PURE__ */ jsx("circle", { cx: xScale(minIdx), cy: yScale(data[minIdx]), r: strokeWidth + 1, fill: "#ef4444" }),
            showMinMax && maxIdx >= 0 && /* @__PURE__ */ jsx("circle", { cx: xScale(maxIdx), cy: yScale(data[maxIdx]), r: strokeWidth + 1, fill: "#22c55e" }),
            hoveredIndex != null && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "line",
                {
                  x1: xScale(hoveredIndex),
                  y1: PADDING,
                  x2: xScale(hoveredIndex),
                  y2: height - PADDING,
                  stroke: color,
                  strokeWidth: 1,
                  strokeDasharray: "3,3",
                  opacity: 0.5
                }
              ),
              /* @__PURE__ */ jsx(
                "circle",
                {
                  cx: xScale(hoveredIndex),
                  cy: yScale(data[hoveredIndex]),
                  r: strokeWidth + 1.5,
                  fill: "white",
                  stroke: color,
                  strokeWidth: 1.5
                }
              )
            ] }),
            highlightIndex != null && highlightIndex < data.length && /* @__PURE__ */ jsx(
              "circle",
              {
                cx: xScale(highlightIndex),
                cy: yScale(data[highlightIndex]),
                r: 4,
                fill: color,
                stroke: "#fff",
                strokeWidth: 2,
                pointerEvents: "none"
              }
            )
          ]
        }
      ),
      showTooltip && hoveredIndex != null && /* @__PURE__ */ jsx(ChartTooltip, { left: xScale(hoveredIndex), top: yScale(data[hoveredIndex]), visible: true, offsetY: -12, children: data[hoveredIndex].toLocaleString() })
    ] })
  ] });
};
SparklineInner.displayName = "SparklineInner";
var SparklineInner_default = SparklineInner;
export {
  SparklineInner,
  SparklineInner_default as default
};
//# sourceMappingURL=SparklineInner.js.map

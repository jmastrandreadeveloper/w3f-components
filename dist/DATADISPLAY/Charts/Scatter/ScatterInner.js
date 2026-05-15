"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { SCATTER_DEFAULTS } from "./Scatter.constants";
import { buildScatterClasses, buildTooltipContent, formatTick } from "./Scatter.utils";
import {
  useScatterAccessors,
  useScatterScales,
  useScatterColors,
  useScatterInteraction,
  useInnerDims
} from "./Scatter.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const ScatterInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = SCATTER_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getX: getXProp,
    getY: getYProp,
    getR: getRProp,
    getLabel: getLabelProp,
    showXAxis = SCATTER_DEFAULTS.showXAxis,
    showYAxis = SCATTER_DEFAULTS.showYAxis,
    showGrid = SCATTER_DEFAULTS.showGrid,
    showTooltip = SCATTER_DEFAULTS.showTooltip,
    pointRadius = SCATTER_DEFAULTS.pointRadius,
    xDomain,
    yDomain,
    formatX,
    formatY,
    onHover,
    onSelect,
    highlightIndex = null
  } = props;
  const { getX, getY, getR, getLabel } = useScatterAccessors(getXProp, getYProp, getRProp, getLabelProp);
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useScatterScales(data, dims.innerWidth, dims.innerHeight, getX, getY, xDomain, yDomain);
  const colors = useScatterColors(data, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useScatterInteraction(onHover, onSelect);
  const classes = useMemo(() => buildScatterClasses(className, unstyled), [className, unstyled]);
  const xTickFormat = formatX ?? formatTick;
  const yTickFormat = formatY ?? formatTick;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty scatter chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Scatter chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(
            ChartGrid,
            {
              xScale,
              yScale,
              width: dims.innerWidth,
              height: dims.innerHeight,
              axis: "both"
            }
          ),
          data.map((d, i) => {
            const cx = xScale(getX(d)) ?? 0;
            const cy = yScale(getY(d)) ?? 0;
            const r = getR(d) ?? pointRadius;
            return /* @__PURE__ */ jsx(
              Circle,
              {
                cx,
                cy,
                r,
                fill: colors[i],
                opacity: highlightIndex != null ? highlightIndex === i ? 1 : 0.3 : hoveredIndex != null && hoveredIndex !== i ? 0.4 : 0.8,
                stroke: highlightIndex === i ? "#fff" : void 0,
                strokeWidth: highlightIndex === i ? 2 : void 0,
                onMouseEnter: () => handleEnter(d, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(d, i) : void 0,
                style: { cursor: highlightIndex === i ? "pointer" : onSelect ? "pointer" : void 0, transition: "opacity 120ms ease-out" }
              },
              i
            );
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight, tickFormat: xTickFormat }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yTickFormat })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: (xScale(getX(data[hoveredIndex])) ?? 0) + dims.margin.left,
          top: (yScale(getY(data[hoveredIndex])) ?? 0) + dims.margin.top,
          visible: true,
          offsetY: -12,
          children: buildTooltipContent(data[hoveredIndex], getX, getY)
        }
      )
    ] })
  ] });
};
ScatterInner.displayName = "ScatterInner";
var ScatterInner_default = ScatterInner;
export {
  ScatterInner,
  ScatterInner_default as default
};
//# sourceMappingURL=ScatterInner.js.map

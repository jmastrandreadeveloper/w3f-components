"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { VIOLIN_DEFAULTS } from "./Violin.constants";
import { buildViolinClasses, buildTooltipContent, formatTick } from "./Violin.utils";
import {
  useViolinScales,
  useViolinKDE,
  useViolinColors,
  useViolinInteraction,
  useInnerDims
} from "./Violin.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
import { safeExtent } from "../_base/utils";
const ViolinInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = VIOLIN_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showXAxis = VIOLIN_DEFAULTS.showXAxis,
    showYAxis = VIOLIN_DEFAULTS.showYAxis,
    showGrid = VIOLIN_DEFAULTS.showGrid,
    showTooltip = VIOLIN_DEFAULTS.showTooltip,
    resolution = VIOLIN_DEFAULTS.resolution,
    bandwidth = VIOLIN_DEFAULTS.bandwidth,
    yDomain,
    formatY,
    onHover,
    onSelect
  } = props;
  const dims = useInnerDims(width, height, margin);
  const { xScale, yScale } = useViolinScales(data, dims.innerWidth, dims.innerHeight, yDomain);
  const allValues = useMemo(() => data.flatMap((d) => d.values), [data]);
  const [yMin, yMax] = useMemo(() => yDomain ?? safeExtent(allValues), [yDomain, allValues]);
  const kdeResults = useViolinKDE(data, yMin, yMax, resolution, bandwidth);
  const colors = useViolinColors(data, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useViolinInteraction(onHover, onSelect);
  const classes = useMemo(() => buildViolinClasses(className, unstyled), [className, unstyled]);
  const yf = formatY ?? formatTick;
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty violin plot" }) });
  }
  const maxDensity = useMemo(() => {
    let m = 0;
    for (const pts of kdeResults) for (const p of pts) if (p.density > m) m = p.density;
    return m || 1;
  }, [kdeResults]);
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Violin plot", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
          data.map((g, i) => {
            const cx = (xScale(g.group) ?? 0) + xScale.bandwidth() / 2;
            const halfW = xScale.bandwidth() / 2 * 0.9;
            const pts = kdeResults[i];
            const isHovered = hoveredIndex === i;
            const opacity = hoveredIndex != null && !isHovered ? 0.4 : 1;
            const fill = colors[i];
            const rightSide = pts.map((p) => {
              const y = yScale(p.value);
              const dx = p.density / maxDensity * halfW;
              return `${cx + dx},${y}`;
            });
            const leftSide = [...pts].reverse().map((p) => {
              const y = yScale(p.value);
              const dx = p.density / maxDensity * halfW;
              return `${cx - dx},${y}`;
            });
            const pathD = `M${rightSide.join(" L")} L${leftSide.join(" L")} Z`;
            return /* @__PURE__ */ jsx(
              "path",
              {
                d: pathD,
                fill,
                fillOpacity: 0.3,
                stroke: fill,
                strokeWidth: 1.5,
                opacity,
                style: { transition: "opacity 120ms ease-out", cursor: onSelect ? "pointer" : void 0 },
                onMouseEnter: () => handleEnter(g, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(g, i) : void 0
              },
              g.group
            );
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight }),
          showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yf })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const g = data[hoveredIndex];
        const cx = (xScale(g.group) ?? 0) + xScale.bandwidth() / 2 + dims.margin.left;
        const sorted = [...g.values].sort((a, b) => a - b);
        const medianVal = sorted[Math.floor(sorted.length / 2)];
        const cy = yScale(medianVal) + dims.margin.top;
        return /* @__PURE__ */ jsx(ChartTooltip, { left: cx, top: cy, visible: true, offsetY: -12, children: buildTooltipContent(g) });
      })()
    ] })
  ] });
};
ViolinInner.displayName = "ViolinInner";
var ViolinInner_default = ViolinInner;
export {
  ViolinInner,
  ViolinInner_default as default
};
//# sourceMappingURL=ViolinInner.js.map

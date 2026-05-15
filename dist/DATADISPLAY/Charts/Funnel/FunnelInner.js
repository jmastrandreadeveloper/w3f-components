"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { FUNNEL_DEFAULTS } from "./Funnel.constants";
import { buildFunnelClasses, buildSegmentPath, buildTooltipContent } from "./Funnel.utils";
import { useFunnelSegments, useFunnelColors, useFunnelInteraction } from "./Funnel.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const FunnelInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = FUNNEL_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showLabels = FUNNEL_DEFAULTS.showLabels,
    showPercentage = FUNNEL_DEFAULTS.showPercentage,
    showTooltip = FUNNEL_DEFAULTS.showTooltip,
    gap = FUNNEL_DEFAULTS.gap,
    formatValue,
    onHover,
    onSelect,
    highlightIndex = null
  } = props;
  const segments = useFunnelSegments(data, width, height, gap);
  const colors = useFunnelColors(data, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useFunnelInteraction(onHover, onSelect);
  const classes = useMemo(() => buildFunnelClasses(className, unstyled), [className, unstyled]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty funnel chart" }) });
  }
  const centerX = width / 2;
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Funnel chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        segments.map((seg, i) => /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: buildSegmentPath(seg),
              fill: colors[i],
              opacity: highlightIndex != null ? highlightIndex === i ? 1 : 0.3 : hoveredIndex != null && hoveredIndex !== i ? 0.4 : 0.85,
              stroke: highlightIndex === i ? "#fff" : void 0,
              strokeWidth: highlightIndex === i ? 2 : void 0,
              onMouseEnter: () => handleEnter(seg.datum, i),
              onMouseLeave: handleLeave,
              onClick: onSelect ? () => handleClick(seg.datum, i) : void 0,
              style: { cursor: highlightIndex === i ? "pointer" : onSelect ? "pointer" : "default", transition: "opacity 120ms ease-out" }
            }
          ),
          showLabels && /* @__PURE__ */ jsxs(
            "text",
            {
              x: centerX,
              y: seg.y + seg.height / 2,
              dy: "0.35em",
              textAnchor: "middle",
              fontSize: 12,
              fontWeight: 600,
              fill: "#fff",
              pointerEvents: "none",
              children: [
                seg.datum.label,
                showPercentage && ` (${seg.percentage.toFixed(0)}%)`
              ]
            }
          )
        ] }, i))
      ] }),
      showTooltip && hoveredIndex != null && segments[hoveredIndex] && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: centerX,
          top: segments[hoveredIndex].y,
          visible: true,
          offsetY: -16,
          children: buildTooltipContent(segments[hoveredIndex].datum, segments[hoveredIndex].percentage, formatValue)
        }
      )
    ] })
  ] });
};
FunnelInner.displayName = "FunnelInner";
var FunnelInner_default = FunnelInner;
export {
  FunnelInner,
  FunnelInner_default as default
};
//# sourceMappingURL=FunnelInner.js.map

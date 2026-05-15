"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Pie as VisxPie } from "@visx/shape";
import { PIE_DEFAULTS } from "./Pie.constants";
import { buildPieClasses, buildTooltipContent, labelFits } from "./Pie.utils";
import { usePieAccessors, usePieColors, usePieInteraction } from "./Pie.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { ChartLegend } from "../primitives/ChartLegend";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const PieInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = PIE_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    getValue: gvp,
    getLabel: glp,
    innerRadius: innerRadioProp = PIE_DEFAULTS.innerRadius,
    padAngle = PIE_DEFAULTS.padAngle,
    cornerRadius = PIE_DEFAULTS.cornerRadius,
    showLabels = PIE_DEFAULTS.showLabels,
    showTooltip = PIE_DEFAULTS.showTooltip,
    showLegend = PIE_DEFAULTS.showLegend,
    onHover,
    onSelect,
    highlightIndex = null
  } = props;
  const { getValue, getLabel } = usePieAccessors(gvp, glp);
  const colors = usePieColors(data, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = usePieInteraction(onHover, onSelect);
  const classes = useMemo(() => buildPieClasses(className, unstyled), [className, unstyled]);
  const legendHeight = showLegend ? 36 : 0;
  const svgHeight = height - legendHeight;
  const radius = Math.min(width, svgHeight) / 2 * 0.85;
  const innerR = radius * innerRadioProp;
  const cx = width / 2;
  const cy = svgHeight / 2;
  const legendItems = useMemo(
    () => data.map((d, i) => ({ id: d.id, label: d.label, color: colors[i] })),
    [data, colors]
  );
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height: svgHeight, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty pie chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height: svgHeight, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Pie chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsx(Group, { top: cy, left: cx, children: /* @__PURE__ */ jsx(
          VisxPie,
          {
            data: [...data],
            pieValue: getValue,
            outerRadius: radius,
            innerRadius: innerR,
            padAngle,
            cornerRadius,
            children: (pie) => pie.arcs.map((arc, i) => {
              const d = arc.data;
              const isHighlighted = highlightIndex != null && highlightIndex === i;
              const opacity = highlightIndex != null ? isHighlighted ? 1 : 0.3 : hoveredIndex != null && hoveredIndex !== i ? 0.5 : 1;
              const path = pie.path(arc) ?? "";
              const [lx, ly] = pie.path.centroid(arc);
              return /* @__PURE__ */ jsxs(
                "g",
                {
                  opacity,
                  style: { transition: "opacity 120ms ease-out", cursor: onSelect ? "pointer" : void 0 },
                  onMouseEnter: () => handleEnter(d, i),
                  onMouseLeave: handleLeave,
                  onClick: onSelect ? () => handleClick(d, i) : void 0,
                  children: [
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: path,
                        fill: colors[i],
                        stroke: isHighlighted ? "#fff" : void 0,
                        strokeWidth: isHighlighted ? 2 : void 0
                      }
                    ),
                    showLabels && labelFits(arc.startAngle, arc.endAngle) && /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: lx,
                        y: ly,
                        fill: "#fff",
                        fontSize: 11,
                        fontWeight: 600,
                        textAnchor: "middle",
                        dominantBaseline: "central",
                        pointerEvents: "none",
                        children: getLabel(d)
                      }
                    )
                  ]
                },
                d.id
              );
            })
          }
        ) })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const d = data[hoveredIndex];
        return /* @__PURE__ */ jsx(ChartTooltip, { left: cx, top: cy, visible: true, offsetY: -radius - 12, children: buildTooltipContent(d, getValue) });
      })()
    ] }),
    showLegend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems, direction: "horizontal" })
  ] });
};
PieInner.displayName = "PieInner";
var PieInner_default = PieInner;
export {
  PieInner,
  PieInner_default as default
};
//# sourceMappingURL=PieInner.js.map

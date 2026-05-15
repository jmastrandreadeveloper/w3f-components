"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { NETWORK_DEFAULTS } from "./Network.constants";
import { buildNetworkClasses, buildTooltipContent } from "./Network.utils";
import {
  useNetworkLayout,
  useNetworkColors,
  useNetworkInteraction
} from "./Network.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const NetworkInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = NETWORK_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    nodeRadius = NETWORK_DEFAULTS.nodeRadius,
    showLabels = NETWORK_DEFAULTS.showLabels,
    showTooltip = NETWORK_DEFAULTS.showTooltip,
    linkWidth = NETWORK_DEFAULTS.linkWidth,
    iterations = NETWORK_DEFAULTS.iterations,
    onHover,
    onSelect
  } = props;
  const layout = useNetworkLayout(data, width, height, iterations);
  const colors = useNetworkColors(layout.nodes, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useNetworkInteraction(onHover, onSelect);
  const classes = useMemo(() => buildNetworkClasses(className, unstyled), [className, unstyled]);
  const nodeMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const n of layout.nodes) {
      map.set(n.id, { x: n.x, y: n.y });
    }
    return map;
  }, [layout.nodes]);
  if (data.nodes.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty network chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Network chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        layout.links.map((link, i) => {
          const s = nodeMap.get(link.source);
          const t = nodeMap.get(link.target);
          if (!s || !t) return null;
          const isHighlighted = hoveredIndex != null && (data.nodes[hoveredIndex]?.id === link.source || data.nodes[hoveredIndex]?.id === link.target);
          return /* @__PURE__ */ jsx(
            "line",
            {
              x1: s.x,
              y1: s.y,
              x2: t.x,
              y2: t.y,
              stroke: isHighlighted ? "var(--w3f-primary, #6366f1)" : "#94a3b8",
              strokeWidth: isHighlighted ? linkWidth * 2 : linkWidth,
              strokeOpacity: hoveredIndex != null && !isHighlighted ? 0.2 : 0.6,
              style: { transition: "stroke-opacity 120ms, stroke-width 120ms" }
            },
            `link-${i}`
          );
        }),
        layout.nodes.map((node, i) => /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: node.x,
              cy: node.y,
              r: nodeRadius,
              fill: colors[i],
              stroke: "#fff",
              strokeWidth: 1.5,
              opacity: hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1,
              onMouseEnter: () => handleEnter(node, i),
              onMouseLeave: handleLeave,
              onClick: onSelect ? () => handleClick(node, i) : void 0,
              style: { cursor: onSelect ? "pointer" : "default", transition: "opacity 120ms ease-out" }
            }
          ),
          showLabels && /* @__PURE__ */ jsx(
            "text",
            {
              x: node.x,
              y: node.y - nodeRadius - 4,
              textAnchor: "middle",
              fontSize: 10,
              fill: "currentColor",
              pointerEvents: "none",
              opacity: hoveredIndex != null && hoveredIndex !== i ? 0.3 : 0.8,
              children: node.label ?? node.id
            }
          )
        ] }, node.id))
      ] }),
      showTooltip && hoveredIndex != null && layout.nodes[hoveredIndex] && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: layout.nodes[hoveredIndex].x,
          top: layout.nodes[hoveredIndex].y,
          visible: true,
          offsetY: -nodeRadius - 16,
          children: buildTooltipContent(layout.nodes[hoveredIndex])
        }
      )
    ] })
  ] });
};
NetworkInner.displayName = "NetworkInner";
var NetworkInner_default = NetworkInner;
export {
  NetworkInner,
  NetworkInner_default as default
};
//# sourceMappingURL=NetworkInner.js.map

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { SANKEY_DEFAULTS } from "./Sankey.constants";
import { buildSankeyClasses, buildLinkPath, buildTooltipContent } from "./Sankey.utils";
import { useSankeyLayout, useSankeyColors, useSankeyInteraction } from "./Sankey.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const SankeyInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = SANKEY_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    nodeWidth = SANKEY_DEFAULTS.nodeWidth,
    nodePadding = SANKEY_DEFAULTS.nodePadding,
    showLabels = SANKEY_DEFAULTS.showLabels,
    showTooltip = SANKEY_DEFAULTS.showTooltip,
    onHover,
    onSelect
  } = props;
  const layout = useSankeyLayout(data, width, height, nodeWidth, nodePadding);
  const colorMap = useSankeyColors(layout.nodes, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useSankeyInteraction(onHover, onSelect);
  const classes = useMemo(() => buildSankeyClasses(className, unstyled), [className, unstyled]);
  if (data.nodes.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty sankey chart" }) });
  }
  const hoveredNode = hoveredIndex != null ? layout.nodes[hoveredIndex] : null;
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Sankey chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        layout.links.map((link, i) => {
          const sNode = layout.nodes.find((n) => n.id === link.source);
          const tNode = layout.nodes.find((n) => n.id === link.target);
          if (!sNode || !tNode) return null;
          const isHighlighted = hoveredNode && (hoveredNode.id === link.source || hoveredNode.id === link.target);
          const path = buildLinkPath(
            sNode.x1,
            link.sy0,
            link.sy1,
            tNode.x0,
            link.ty0,
            link.ty1
          );
          return /* @__PURE__ */ jsx(
            "path",
            {
              d: path,
              fill: colorMap.get(link.source) ?? "#94a3b8",
              fillOpacity: isHighlighted ? 0.5 : hoveredIndex != null ? 0.1 : 0.3,
              stroke: "none",
              style: { transition: "fill-opacity 120ms" }
            },
            `link-${i}`
          );
        }),
        layout.nodes.map((node, i) => /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "rect",
            {
              x: node.x0,
              y: node.y0,
              width: node.x1 - node.x0,
              height: Math.max(node.y1 - node.y0, 2),
              fill: colorMap.get(node.id) ?? "#6366f1",
              opacity: hoveredIndex != null && hoveredIndex !== i ? 0.5 : 1,
              rx: 2,
              onMouseEnter: () => handleEnter(node, i),
              onMouseLeave: handleLeave,
              onClick: onSelect ? () => handleClick(node, i) : void 0,
              style: { cursor: onSelect ? "pointer" : "default", transition: "opacity 120ms" }
            }
          ),
          showLabels && /* @__PURE__ */ jsx(
            "text",
            {
              x: node.layer === 0 ? node.x0 - 4 : node.x1 + 4,
              y: (node.y0 + node.y1) / 2,
              dy: "0.35em",
              textAnchor: node.layer === 0 ? "end" : "start",
              fontSize: 11,
              fill: "currentColor",
              pointerEvents: "none",
              children: node.label ?? node.id
            }
          )
        ] }, node.id))
      ] }),
      showTooltip && hoveredNode && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: (hoveredNode.x0 + hoveredNode.x1) / 2,
          top: hoveredNode.y0,
          visible: true,
          offsetY: -16,
          children: buildTooltipContent(hoveredNode)
        }
      )
    ] })
  ] });
};
SankeyInner.displayName = "SankeyInner";
var SankeyInner_default = SankeyInner;
export {
  SankeyInner,
  SankeyInner_default as default
};
//# sourceMappingURL=SankeyInner.js.map

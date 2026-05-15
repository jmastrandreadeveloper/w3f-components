"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Tree, hierarchy } from "@visx/hierarchy";
import { TREE_DIAGRAM_DEFAULTS } from "./TreeDiagram.constants";
import { buildTreeDiagramClasses, buildTooltipContent } from "./TreeDiagram.utils";
import { useTreeDiagramColors, useTreeDiagramInteraction } from "./TreeDiagram.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const MARGIN = { top: 40, right: 40, bottom: 40, left: 40 };
function polarToCartesian(angle, radius) {
  return [
    radius * Math.cos(angle - Math.PI / 2),
    radius * Math.sin(angle - Math.PI / 2)
  ];
}
function getNodePosition(node, layout) {
  if (layout === "left-right") return [node.y, node.x];
  if (layout === "radial") return polarToCartesian(node.x, node.y);
  return [node.x, node.y];
}
function maxDepth(root) {
  return root.height + 1;
}
const TreeDiagramInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = TREE_DIAGRAM_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    layout = TREE_DIAGRAM_DEFAULTS.layout,
    showLabels = TREE_DIAGRAM_DEFAULTS.showLabels,
    showTooltip = TREE_DIAGRAM_DEFAULTS.showTooltip,
    nodeRadius = TREE_DIAGRAM_DEFAULTS.nodeRadius,
    linkStroke = TREE_DIAGRAM_DEFAULTS.linkStroke,
    onHover,
    onSelect
  } = props;
  const innerWidth = Math.max(width - MARGIN.left - MARGIN.right, 0);
  const innerHeight = Math.max(height - MARGIN.top - MARGIN.bottom, 0);
  const root = useMemo(
    () => hierarchy(data).sum((d) => d.value ?? 0).sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
    [data]
  );
  const allNodes = useMemo(() => root.descendants(), [root]);
  const depthCount = useMemo(() => maxDepth(root), [root]);
  const colors = useTreeDiagramColors(depthCount, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useTreeDiagramInteraction(onHover, onSelect);
  const classes = useMemo(() => buildTreeDiagramClasses(className, unstyled), [className, unstyled]);
  const treeSize = useMemo(() => {
    if (layout === "left-right") return [innerHeight, innerWidth];
    if (layout === "radial") {
      const radius = Math.min(innerWidth, innerHeight) / 2;
      return [2 * Math.PI, radius];
    }
    return [innerWidth, innerHeight];
  }, [layout, innerWidth, innerHeight]);
  const centerX = layout === "radial" ? innerWidth / 2 : 0;
  const centerY = layout === "radial" ? innerHeight / 2 : 0;
  if (allNodes.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty tree diagram" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Tree diagram", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsx(Tree, { root, size: treeSize, children: (tree) => /* @__PURE__ */ jsxs(Group, { top: MARGIN.top + centerY, left: MARGIN.left + centerX, children: [
          tree.links().map((link, i) => {
            const [sx, sy] = getNodePosition(link.source, layout);
            const [tx, ty] = getNodePosition(link.target, layout);
            return /* @__PURE__ */ jsx(
              "line",
              {
                x1: sx,
                y1: sy,
                x2: tx,
                y2: ty,
                stroke: linkStroke,
                strokeWidth: 1.5,
                strokeOpacity: 0.6,
                fill: "none"
              },
              `link-${i}`
            );
          }),
          tree.descendants().map((node, i) => {
            const [nx, ny] = getNodePosition(node, layout);
            const d = node.data;
            const isHovered = hoveredIndex === i;
            const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;
            const label = d.label ?? d.id;
            const fillColor = colors[node.depth % colors.length];
            let labelDx = 0;
            let labelDy = 0;
            let textAnchor = "middle";
            let labelRotation = 0;
            if (layout === "top-down") {
              labelDy = -(nodeRadius + 4);
              textAnchor = "middle";
            } else if (layout === "left-right") {
              labelDx = node.children ? -(nodeRadius + 6) : nodeRadius + 6;
              labelDy = 3;
              textAnchor = node.children ? "end" : "start";
            } else {
              const angle = node.x;
              const isRight = angle < Math.PI;
              labelDx = isRight ? nodeRadius + 6 : -(nodeRadius + 6);
              labelDy = 3;
              textAnchor = isRight ? "start" : "end";
              const degrees = angle * 180 / Math.PI - 90;
              labelRotation = isRight ? degrees : degrees + 180;
            }
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
                    "circle",
                    {
                      cx: nx,
                      cy: ny,
                      r: isHovered ? nodeRadius * 1.3 : nodeRadius,
                      fill: fillColor,
                      stroke: "#fff",
                      strokeWidth: 1.5,
                      style: { transition: "r 120ms ease-out" }
                    }
                  ),
                  showLabels && /* @__PURE__ */ jsx(
                    "text",
                    {
                      x: nx,
                      y: ny,
                      dx: labelDx,
                      dy: labelDy,
                      fontSize: 11,
                      fontWeight: node.depth === 0 ? 600 : 400,
                      fill: "var(--w3f-text-primary, #333)",
                      textAnchor,
                      pointerEvents: "none",
                      transform: layout === "radial" && labelRotation ? `rotate(${labelRotation}, ${nx}, ${ny})` : void 0,
                      children: label
                    }
                  )
                ]
              },
              `node-${d.id}-${i}`
            );
          })
        ] }) })
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const nodes = root.descendants();
        const node = nodes[hoveredIndex];
        if (!node) return null;
        const [nx, ny] = getNodePosition(node, layout);
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: nx + MARGIN.left + centerX,
            top: ny + MARGIN.top + centerY,
            visible: true,
            offsetY: -(nodeRadius + 12),
            children: buildTooltipContent(node.data)
          }
        );
      })()
    ] })
  ] });
};
TreeDiagramInner.displayName = "TreeDiagramInner";
var TreeDiagramInner_default = TreeDiagramInner;
export {
  TreeDiagramInner,
  TreeDiagramInner_default as default
};
//# sourceMappingURL=TreeDiagramInner.js.map

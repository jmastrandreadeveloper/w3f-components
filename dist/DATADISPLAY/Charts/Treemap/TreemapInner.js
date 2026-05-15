"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Treemap as VisxTreemap, hierarchy, treemapSquarify } from "@visx/hierarchy";
import { TREEMAP_DEFAULTS } from "./Treemap.constants";
import { buildTreemapClasses, buildTooltipContent, textFits, truncateLabel } from "./Treemap.utils";
import { useTreemapColors, useTreemapInteraction } from "./Treemap.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const TreemapInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = TREEMAP_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showLabels = TREEMAP_DEFAULTS.showLabels,
    showTooltip = TREEMAP_DEFAULTS.showTooltip,
    tilePadding = TREEMAP_DEFAULTS.tilePadding,
    tileRadius = TREEMAP_DEFAULTS.tileRadius,
    onHover,
    onSelect
  } = props;
  const root = useMemo(
    () => hierarchy(data).sum((d) => d.value ?? 0).sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
    [data]
  );
  const leaves = useMemo(() => root.leaves(), [root]);
  const colors = useTreemapColors(leaves.length, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useTreemapInteraction(onHover, onSelect);
  const classes = useMemo(() => buildTreemapClasses(className, unstyled), [className, unstyled]);
  if (leaves.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty treemap" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Treemap", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsx(
          VisxTreemap,
          {
            root,
            size: [width, height],
            tile: treemapSquarify,
            padding: tilePadding,
            children: (treemap) => /* @__PURE__ */ jsx(Group, { children: treemap.descendants().filter((n) => !n.children).map((node, i) => {
              const w = node.x1 - node.x0;
              const h = node.y1 - node.y0;
              const d = node.data;
              const isHovered = hoveredIndex === i;
              const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;
              const label = d.label ?? d.id;
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
                      "rect",
                      {
                        x: node.x0,
                        y: node.y0,
                        width: w,
                        height: h,
                        fill: colors[i],
                        rx: tileRadius
                      }
                    ),
                    showLabels && textFits(w, h) && /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: node.x0 + 4,
                        y: node.y0 + 14,
                        fontSize: 11,
                        fill: "#fff",
                        fontWeight: 500,
                        pointerEvents: "none",
                        children: truncateLabel(label, w - 8)
                      }
                    )
                  ]
                },
                d.id + "-" + i
              );
            }) })
          }
        )
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const leafNodes = root.leaves();
        const node = leafNodes[hoveredIndex];
        if (!node) return null;
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: (node.x0 + node.x1) / 2,
            top: node.y0,
            visible: true,
            offsetY: -12,
            children: buildTooltipContent(node.data)
          }
        );
      })()
    ] })
  ] });
};
TreemapInner.displayName = "TreemapInner";
var TreemapInner_default = TreemapInner;
export {
  TreemapInner,
  TreemapInner_default as default
};
//# sourceMappingURL=TreemapInner.js.map

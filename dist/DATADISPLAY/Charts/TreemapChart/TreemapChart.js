"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { Treemap, treemapSquarify, hierarchy } from "@visx/hierarchy";
import { TREEMAP_CHART_DEFAULTS, DEFAULT_TREEMAP_COLORS } from "./TreemapChart.constants";
import {
  buildTreemapChartClasses,
  tileColor,
  textFits,
  truncateLabel
} from "./TreemapChart.utils";
import { useChartDimensions, useHoveredIndex } from "./TreemapChart.hooks";
import { useBridgeBind } from "@w3f/bridge";
const TREEMAP_MARGIN = { top: 4, right: 4, bottom: 4, left: 4 };
const TreemapChart = React.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    colors = DEFAULT_TREEMAP_COLORS,
    unstyled = TREEMAP_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind({ bindId });
    const containerRef = useRef(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      TREEMAP_CHART_DEFAULTS.width,
      TREEMAP_CHART_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const classes = useMemo(
      () => buildTreemapChartClasses(className, unstyled),
      [className, unstyled]
    );
    const innerWidth = Math.max(width - TREEMAP_MARGIN.left - TREEMAP_MARGIN.right, 0);
    const innerHeight = Math.max(height - TREEMAP_MARGIN.top - TREEMAP_MARGIN.bottom, 0);
    const root = useMemo(() => {
      const h = hierarchy(data).sum((d) => d.value ?? 0).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
      return h;
    }, [data]);
    return /* @__PURE__ */ jsx("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx("svg", { width, height, children: /* @__PURE__ */ jsx(Group, { top: TREEMAP_MARGIN.top, left: TREEMAP_MARGIN.left, children: /* @__PURE__ */ jsx(
      Treemap,
      {
        root,
        size: [innerWidth, innerHeight],
        tile: treemapSquarify,
        round: true,
        children: (treemap) => {
          const leaves = treemap.descendants().filter((n) => !n.children);
          return /* @__PURE__ */ jsx(Group, { children: leaves.map((node, i) => {
            const w = (node.x1 ?? 0) - (node.x0 ?? 0);
            const h = (node.y1 ?? 0) - (node.y0 ?? 0);
            return /* @__PURE__ */ jsxs(Group, { top: node.y0, left: node.x0, children: [
              /* @__PURE__ */ jsx(
                "rect",
                {
                  width: w,
                  height: h,
                  fill: tileColor(i, colors),
                  opacity: hoveredIndex === i ? 0.8 : 1,
                  stroke: "var(--w3f-surface, #1e293b)",
                  strokeWidth: 2,
                  rx: 2,
                  onMouseEnter: () => onEnter(i),
                  onMouseLeave: onLeave,
                  style: { cursor: "pointer" }
                }
              ),
              textFits(w, h) && /* @__PURE__ */ jsx(
                "text",
                {
                  x: w / 2,
                  y: h / 2,
                  textAnchor: "middle",
                  dominantBaseline: "central",
                  fill: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  pointerEvents: "none",
                  children: truncateLabel(node.data.name, w - 8)
                }
              )
            ] }, `leaf-${i}`);
          }) });
        }
      }
    ) }) }) }) });
  }
);
TreemapChart.displayName = "TreemapChart";
var TreemapChart_default = TreemapChart;
export {
  TreemapChart,
  TreemapChart_default as default
};
//# sourceMappingURL=TreemapChart.js.map

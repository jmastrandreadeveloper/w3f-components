"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Pack as VisxPack, hierarchy } from "@visx/hierarchy";
import { PACK_DEFAULTS } from "./Pack.constants";
import { buildPackClasses, buildTooltipContent } from "./Pack.utils";
import { usePackColors, usePackInteraction } from "./Pack.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const PackInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = PACK_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showLabels = PACK_DEFAULTS.showLabels,
    showTooltip = PACK_DEFAULTS.showTooltip,
    circlePadding = PACK_DEFAULTS.circlePadding,
    onHover,
    onSelect
  } = props;
  const root = useMemo(
    () => hierarchy(data).sum((d) => d.value ?? 0).sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
    [data]
  );
  const leaves = useMemo(() => root.leaves(), [root]);
  const colors = usePackColors(leaves.length, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = usePackInteraction(onHover, onSelect);
  const classes = useMemo(() => buildPackClasses(className, unstyled), [className, unstyled]);
  if (leaves.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty pack chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Circle pack chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsx(
          VisxPack,
          {
            root,
            size: [width, height],
            padding: circlePadding,
            children: (pack) => {
              const leafNodes = pack.descendants().filter((n) => !n.children);
              return /* @__PURE__ */ jsxs(Group, { children: [
                pack.descendants().filter((n) => n.children && n.depth > 0).map((node, i) => /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: node.x,
                    cy: node.y,
                    r: node.r,
                    fill: "none",
                    stroke: "var(--w3f-chart-grid-stroke, #e2e8f0)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3"
                  },
                  "p-" + i
                )),
                leafNodes.map((node, i) => {
                  const d = node.data;
                  const isHovered = hoveredIndex === i;
                  const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;
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
                            cx: node.x,
                            cy: node.y,
                            r: node.r,
                            fill: colors[i],
                            fillOpacity: 0.75
                          }
                        ),
                        showLabels && node.r > 14 && /* @__PURE__ */ jsx(
                          "text",
                          {
                            x: node.x,
                            y: node.y,
                            textAnchor: "middle",
                            dominantBaseline: "central",
                            fontSize: Math.min(11, node.r * 0.45),
                            fill: "#fff",
                            fontWeight: 500,
                            pointerEvents: "none",
                            children: (d.label ?? d.id).slice(0, Math.floor(node.r / 4))
                          }
                        )
                      ]
                    },
                    d.id + "-" + i
                  );
                })
              ] });
            }
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
            left: node.x ?? 0,
            top: (node.y ?? 0) - (node.r ?? 0),
            visible: true,
            offsetY: -12,
            children: buildTooltipContent(node.data)
          }
        );
      })()
    ] })
  ] });
};
PackInner.displayName = "PackInner";
var PackInner_default = PackInner;
export {
  PackInner,
  PackInner_default as default
};
//# sourceMappingURL=PackInner.js.map

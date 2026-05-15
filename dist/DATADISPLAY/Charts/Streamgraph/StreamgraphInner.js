"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Area } from "@visx/shape";
import { curveLinear, curveBasis } from "@visx/curve";
import { STREAMGRAPH_DEFAULTS } from "./Streamgraph.constants";
import { buildStreamgraphClasses, computeStreamLayers } from "./Streamgraph.utils";
import { useStreamScales, useStreamColors, useStreamHover, useInnerDims } from "./Streamgraph.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartLegend } from "../primitives/ChartLegend";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const StreamgraphInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    keys,
    unstyled = STREAMGRAPH_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    curved = STREAMGRAPH_DEFAULTS.curved,
    fillOpacity = STREAMGRAPH_DEFAULTS.fillOpacity,
    showXAxis = STREAMGRAPH_DEFAULTS.showXAxis,
    showLegend = STREAMGRAPH_DEFAULTS.showLegend,
    highlightSeriesId = null,
    onHover
  } = props;
  const dims = useInnerDims(width, height, margin);
  const { dates, layers } = useMemo(() => computeStreamLayers(data, keys), [data, keys]);
  const { xScale, yScale } = useStreamScales(layers, dates, dims.innerWidth, dims.innerHeight);
  const colorMap = useStreamColors(keys, colorScheme);
  const { hovered, enter, leave } = useStreamHover(onHover);
  const classes = useMemo(() => buildStreamgraphClasses(className, unstyled), [className, unstyled]);
  const curve = curved ? curveBasis : curveLinear;
  const legendItems = useMemo(
    () => keys.map((k) => ({ id: k, label: data.find((s) => s.id === k)?.label ?? k, color: colorMap(k) })),
    [keys, data, colorMap]
  );
  if (layers.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty streamgraph" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    showLegend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems }),
    /* @__PURE__ */ jsx("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Streamgraph", children: [
      description && /* @__PURE__ */ jsx("desc", { children: description }),
      /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
        layers.map((layer) => {
          const active = highlightSeriesId ?? hovered;
          const isDimmed = active != null && active !== layer.key;
          return /* @__PURE__ */ jsx(
            Area,
            {
              data: layer.points,
              x: (d) => xScale(d.date) ?? 0,
              y0: (d) => yScale(d.y0) ?? 0,
              y1: (d) => yScale(d.y1) ?? 0,
              curve,
              children: ({ path }) => /* @__PURE__ */ jsx(
                "path",
                {
                  d: path([...layer.points]) ?? "",
                  fill: colorMap(layer.key),
                  fillOpacity: isDimmed ? 0.15 : fillOpacity,
                  stroke: colorMap(layer.key),
                  strokeWidth: 0.5,
                  onMouseEnter: () => enter(layer.key),
                  onMouseLeave: leave,
                  style: { cursor: "pointer", transition: "fill-opacity 120ms" }
                }
              )
            },
            layer.key
          );
        }),
        showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight })
      ] })
    ] }) })
  ] });
};
StreamgraphInner.displayName = "StreamgraphInner";
var StreamgraphInner_default = StreamgraphInner;
export {
  StreamgraphInner,
  StreamgraphInner_default as default
};
//# sourceMappingURL=StreamgraphInner.js.map

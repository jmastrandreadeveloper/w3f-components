"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { curveMonotoneX, curveLinear } from "@visx/curve";
import { LINE_MULTI_DEFAULTS } from "./LineMulti.constants";
import { buildLineMultiClasses, toDate, formatTick } from "./LineMulti.utils";
import { useLineMultiScales, useLineMultiColors, useLineMultiHover, useInnerDims } from "./LineMulti.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartLegend } from "../primitives/ChartLegend";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const LineMultiInner = (props) => {
  const {
    data,
    width,
    height,
    margin,
    className,
    unstyled = LINE_MULTI_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    curved = LINE_MULTI_DEFAULTS.curved,
    showDots = LINE_MULTI_DEFAULTS.showDots,
    strokeWidth = LINE_MULTI_DEFAULTS.strokeWidth,
    showXAxis = LINE_MULTI_DEFAULTS.showXAxis,
    showYAxis = LINE_MULTI_DEFAULTS.showYAxis,
    showGrid = LINE_MULTI_DEFAULTS.showGrid,
    showLegend = LINE_MULTI_DEFAULTS.showLegend,
    highlightSeriesId = null,
    formatY,
    onHover
  } = props;
  const dims = useInnerDims(width, height, margin);
  const seriesIds = useMemo(() => data.map((s) => s.id), [data]);
  const { xScale, yScale } = useLineMultiScales(data, dims.innerWidth, dims.innerHeight);
  const colorMap = useLineMultiColors(seriesIds, colorScheme);
  const { hovered, enter, leave } = useLineMultiHover(onHover);
  const classes = useMemo(() => buildLineMultiClasses(className, unstyled), [className, unstyled]);
  const yTickFormat = formatY ?? formatTick;
  const curve = curved ? curveMonotoneX : curveLinear;
  const legendItems = useMemo(
    () => data.map((s) => ({ id: s.id, label: s.label ?? s.id, color: colorMap[s.id] })),
    [data, colorMap]
  );
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty multi-line chart" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    showLegend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems }),
    /* @__PURE__ */ jsx("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Multi-line chart", children: [
      description && /* @__PURE__ */ jsx("desc", { children: description }),
      /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
        showGrid && /* @__PURE__ */ jsx(ChartGrid, { yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "rows" }),
        data.map((series) => {
          const active = highlightSeriesId ?? hovered;
          const isDimmed = active != null && active !== series.id;
          return /* @__PURE__ */ jsxs(
            "g",
            {
              onMouseEnter: () => enter(series.id),
              onMouseLeave: leave,
              style: { cursor: "pointer" },
              children: [
                /* @__PURE__ */ jsx(
                  LinePath,
                  {
                    data: [...series.data],
                    x: (d) => xScale(toDate(d.date)) ?? 0,
                    y: (d) => yScale(d.value) ?? 0,
                    stroke: colorMap[series.id],
                    strokeWidth: hovered === series.id ? strokeWidth + 1 : strokeWidth,
                    strokeOpacity: isDimmed ? 0.2 : 1,
                    curve
                  }
                ),
                /* @__PURE__ */ jsx(
                  LinePath,
                  {
                    data: [...series.data],
                    x: (d) => xScale(toDate(d.date)) ?? 0,
                    y: (d) => yScale(d.value) ?? 0,
                    stroke: "transparent",
                    strokeWidth: 12,
                    curve
                  }
                ),
                showDots && series.data.map((pt, pi) => /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: xScale(toDate(pt.date)) ?? 0,
                    cy: yScale(pt.value) ?? 0,
                    r: 3,
                    fill: colorMap[series.id],
                    opacity: isDimmed ? 0.2 : 1
                  },
                  pi
                ))
              ]
            },
            series.id
          );
        }),
        showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight }),
        showYAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: yScale, orientation: "left", tickFormat: yTickFormat })
      ] })
    ] }) })
  ] });
};
LineMultiInner.displayName = "LineMultiInner";
var LineMultiInner_default = LineMultiInner;
export {
  LineMultiInner,
  LineMultiInner_default as default
};
//# sourceMappingURL=LineMultiInner.js.map

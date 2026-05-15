"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { scaleTime, scaleBand } from "@visx/scale";
import { GANTT_DEFAULTS } from "./Gantt.constants";
import { buildGanttClasses, buildTooltipContent, toDate } from "./Gantt.utils";
import { useGanttColors, useGanttInteraction, useInnerDims } from "./Gantt.hooks";
import { ChartAxis } from "../primitives/ChartAxis";
import { ChartGrid } from "../primitives/ChartGrid";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const DEFAULT_MARGIN = { top: 20, right: 20, bottom: 40, left: 120 };
const GanttInner = (props) => {
  const {
    data,
    width,
    height,
    margin = DEFAULT_MARGIN,
    className,
    unstyled = GANTT_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showLabels = GANTT_DEFAULTS.showLabels,
    showTooltip = GANTT_DEFAULTS.showTooltip,
    showXAxis = GANTT_DEFAULTS.showXAxis,
    showGrid = GANTT_DEFAULTS.showGrid,
    barHeight = GANTT_DEFAULTS.barHeight,
    barGap = GANTT_DEFAULTS.barGap,
    barRadius = GANTT_DEFAULTS.barRadius,
    onHover,
    onSelect
  } = props;
  const dims = useInnerDims(width, height, margin);
  const groups = useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    data.forEach((t) => {
      const g = t.group ?? t.id;
      seen.add(g);
    });
    return Array.from(seen);
  }, [data]);
  const colorMap = useGanttColors(groups, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useGanttInteraction(onHover, onSelect);
  const classes = useMemo(() => buildGanttClasses(className, unstyled), [className, unstyled]);
  const { xScale, yScale } = useMemo(() => {
    if (data.length === 0) {
      const now = /* @__PURE__ */ new Date();
      const later = new Date(now.getTime() + 864e5);
      return {
        xScale: scaleTime({ domain: [now, later], range: [0, dims.innerWidth] }),
        yScale: scaleBand({ domain: [], range: [0, dims.innerHeight], padding: 0.2 })
      };
    }
    const dates = data.flatMap((t) => [toDate(t.start).getTime(), toDate(t.end).getTime()]);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const span = maxDate.getTime() - minDate.getTime();
    const padded = span * 0.02;
    const xs = scaleTime({
      domain: [new Date(minDate.getTime() - padded), new Date(maxDate.getTime() + padded)],
      range: [0, dims.innerWidth]
    });
    const labels = data.map((t) => t.label);
    const ys = scaleBand({
      domain: [...labels],
      range: [0, dims.innerHeight],
      padding: 0.2
    });
    return { xScale: xs, yScale: ys };
  }, [data, dims.innerWidth, dims.innerHeight]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty Gantt chart" }) });
  }
  const bandwidth = yScale.bandwidth();
  const taskBarHeight = Math.min(barHeight, bandwidth);
  const barY = (bandwidth - taskBarHeight) / 2;
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Gantt chart", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsxs(Group, { top: dims.margin.top, left: dims.margin.left, children: [
          showGrid && /* @__PURE__ */ jsx(ChartGrid, { xScale, yScale, width: dims.innerWidth, height: dims.innerHeight, axis: "x" }),
          data.map((task, i) => {
            const startX = xScale(toDate(task.start)) ?? 0;
            const endX = xScale(toDate(task.end)) ?? 0;
            const taskWidth = Math.max(endX - startX, 2);
            const y = (yScale(task.label) ?? 0) + barY;
            const color = colorMap[task.group ?? task.id] ?? colorMap[groups[i % groups.length]];
            return /* @__PURE__ */ jsxs(
              "g",
              {
                opacity: hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1,
                style: { transition: "opacity 120ms ease-out" },
                onMouseEnter: () => handleEnter(task, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(task, i) : void 0,
                cursor: onSelect ? "pointer" : "default",
                children: [
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: startX,
                      y,
                      width: taskWidth,
                      height: taskBarHeight,
                      fill: color,
                      fillOpacity: 0.3,
                      rx: barRadius,
                      ry: barRadius
                    }
                  ),
                  task.progress != null && task.progress > 0 && /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: startX,
                      y,
                      width: taskWidth * Math.min(task.progress, 1),
                      height: taskBarHeight,
                      fill: color,
                      fillOpacity: 0.85,
                      rx: barRadius,
                      ry: barRadius
                    }
                  ),
                  task.progress == null && /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: startX,
                      y,
                      width: taskWidth,
                      height: taskBarHeight,
                      fill: color,
                      fillOpacity: 0.75,
                      rx: barRadius,
                      ry: barRadius
                    }
                  )
                ]
              },
              task.id
            );
          }),
          showLabels && data.map((task, i) => {
            const y = (yScale(task.label) ?? 0) + barY + taskBarHeight / 2;
            return /* @__PURE__ */ jsx(
              "text",
              {
                x: -8,
                y,
                textAnchor: "end",
                dominantBaseline: "central",
                fontSize: 12,
                fill: "var(--w3f-text-primary, #333)",
                opacity: hoveredIndex != null && hoveredIndex !== i ? 0.4 : 1,
                style: { transition: "opacity 120ms ease-out" },
                children: task.label
              },
              `label-${task.id}`
            );
          }),
          showXAxis && /* @__PURE__ */ jsx(ChartAxis, { scale: xScale, orientation: "bottom", top: dims.innerHeight })
        ] })
      ] }),
      showTooltip && hoveredIndex != null && data[hoveredIndex] && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: (xScale(toDate(data[hoveredIndex].start)) ?? 0) + dims.margin.left,
          top: (yScale(data[hoveredIndex].label) ?? 0) + dims.margin.top,
          visible: true,
          offsetY: -16,
          children: buildTooltipContent(data[hoveredIndex])
        }
      )
    ] })
  ] });
};
GanttInner.displayName = "GanttInner";
var GanttInner_default = GanttInner;
export {
  GanttInner,
  GanttInner_default as default
};
//# sourceMappingURL=GanttInner.js.map

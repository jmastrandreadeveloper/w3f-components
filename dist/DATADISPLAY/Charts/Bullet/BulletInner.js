"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { BULLET_DEFAULTS } from "./Bullet.constants";
import { buildBulletClasses, buildBulletScale, buildTooltipContent } from "./Bullet.utils";
import { useBulletInteraction } from "./Bullet.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const BulletInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = BULLET_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    title,
    subtitle,
    showLabels = BULLET_DEFAULTS.showLabels,
    showValues = BULLET_DEFAULTS.showValues,
    showTooltip = BULLET_DEFAULTS.showTooltip,
    barHeight = BULLET_DEFAULTS.barHeight,
    rowGap = BULLET_DEFAULTS.rowGap,
    valueColor = BULLET_DEFAULTS.valueColor,
    targetColor = BULLET_DEFAULTS.targetColor,
    rangeColors = BULLET_DEFAULTS.rangeColors,
    highlightIndex,
    onHover,
    onSelect
  } = props;
  const labelWidth = 80;
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useBulletInteraction(onHover, onSelect);
  const classes = useMemo(() => buildBulletClasses(className, unstyled), [className, unstyled]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty bullet chart" }) });
  }
  const leftOffset = showLabels ? labelWidth : 0;
  const barWidth = width - leftOffset - (showValues ? 50 : 0);
  const totalHeight = data.length * barHeight + (data.length - 1) * rowGap;
  const fmt = (n) => n.toLocaleString();
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs(
        "svg",
        {
          width,
          height: Math.max(totalHeight, height),
          className: BASE_CHART_CLASSES.svg,
          role: "img",
          "aria-label": ariaLabel ?? "Bullet chart",
          children: [
            description && /* @__PURE__ */ jsx("desc", { children: description }),
            data.map((datum, i) => {
              const scale = buildBulletScale(datum, barWidth);
              const y = i * (barHeight + rowGap);
              const measureH = barHeight * 0.4;
              const measureY = y + (barHeight - measureH) / 2;
              const dimmed = highlightIndex != null && highlightIndex !== i || highlightIndex == null && hoveredIndex != null && hoveredIndex !== i;
              return /* @__PURE__ */ jsxs("g", { children: [
                showLabels && /* @__PURE__ */ jsx(
                  "text",
                  {
                    x: leftOffset - 8,
                    y: y + barHeight / 2,
                    textAnchor: "end",
                    dominantBaseline: "central",
                    fontSize: 11,
                    fill: "currentColor",
                    children: datum.label
                  }
                ),
                /* @__PURE__ */ jsxs("g", { transform: `translate(${leftOffset}, ${y})`, children: [
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: 0,
                      y: 0,
                      width: scale(datum.ranges[2]) ?? 0,
                      height: barHeight,
                      fill: rangeColors[2],
                      rx: 2
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: 0,
                      y: 0,
                      width: scale(datum.ranges[1]) ?? 0,
                      height: barHeight,
                      fill: rangeColors[1],
                      rx: 2
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: 0,
                      y: 0,
                      width: scale(datum.ranges[0]) ?? 0,
                      height: barHeight,
                      fill: rangeColors[0],
                      rx: 2
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: 0,
                      y: measureY - y,
                      width: scale(datum.value) ?? 0,
                      height: measureH,
                      fill: valueColor,
                      opacity: dimmed ? 0.4 : 0.9,
                      rx: 1,
                      onMouseEnter: () => handleEnter(datum, i),
                      onMouseLeave: handleLeave,
                      onClick: onSelect ? () => handleClick(datum, i) : void 0,
                      style: { cursor: onSelect ? "pointer" : "default", transition: "opacity 120ms ease-out" }
                    }
                  ),
                  datum.target !== void 0 && /* @__PURE__ */ jsx(
                    "line",
                    {
                      x1: scale(datum.target) ?? 0,
                      y1: 2,
                      x2: scale(datum.target) ?? 0,
                      y2: barHeight - 2,
                      stroke: targetColor,
                      strokeWidth: 2.5
                    }
                  )
                ] }),
                showValues && /* @__PURE__ */ jsx(
                  "text",
                  {
                    x: leftOffset + barWidth + 8,
                    y: y + barHeight / 2,
                    dominantBaseline: "central",
                    fontSize: 11,
                    fontWeight: 600,
                    fill: "currentColor",
                    children: fmt(datum.value)
                  }
                )
              ] }, i);
            })
          ]
        }
      ),
      showTooltip && hoveredIndex != null && data[hoveredIndex] && /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          left: leftOffset + (buildBulletScale(data[hoveredIndex], barWidth)(data[hoveredIndex].value) ?? 0) / 2,
          top: hoveredIndex * (barHeight + rowGap),
          visible: true,
          offsetY: -16,
          children: buildTooltipContent(data[hoveredIndex], void 0)
        }
      )
    ] })
  ] });
};
BulletInner.displayName = "BulletInner";
var BulletInner_default = BulletInner;
export {
  BulletInner,
  BulletInner_default as default
};
//# sourceMappingURL=BulletInner.js.map

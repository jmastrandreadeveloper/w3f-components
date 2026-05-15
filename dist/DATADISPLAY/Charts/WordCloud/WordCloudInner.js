"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Wordcloud as VisxWordcloud } from "@visx/wordcloud";
import { scaleLinear } from "@visx/scale";
import { WORDCLOUD_DEFAULTS } from "./WordCloud.constants";
import { buildWordCloudClasses, buildTooltipContent } from "./WordCloud.utils";
import { useWordCloudColors, useWordCloudInteraction } from "./WordCloud.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const WordCloudInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = WORDCLOUD_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showTooltip = WORDCLOUD_DEFAULTS.showTooltip,
    fontFamily = WORDCLOUD_DEFAULTS.fontFamily,
    fontMinSize = WORDCLOUD_DEFAULTS.fontMinSize,
    fontMaxSize = WORDCLOUD_DEFAULTS.fontMaxSize,
    spiral = WORDCLOUD_DEFAULTS.spiral,
    rotate = 0,
    padding = WORDCLOUD_DEFAULTS.padding,
    onHover,
    onSelect
  } = props;
  const colors = useWordCloudColors(data.length, colorScheme);
  const { hoveredIndex, handleEnter, handleLeave, handleClick } = useWordCloudInteraction(onHover, onSelect);
  const classes = useMemo(() => buildWordCloudClasses(className, unstyled), [className, unstyled]);
  const fontScale = useMemo(() => {
    const values = data.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    return scaleLinear({
      domain: [minVal, maxVal],
      range: [fontMinSize, fontMaxSize]
    });
  }, [data, fontMinSize, fontMaxSize]);
  const rotateFn = useMemo(() => {
    if (typeof rotate === "function") return rotate;
    return () => rotate;
  }, [rotate]);
  const wordIndexMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    data.forEach((d, i) => map.set(d.text, i));
    return map;
  }, [data]);
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty word cloud" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Word cloud", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsx(
          VisxWordcloud,
          {
            width,
            height,
            words: data,
            fontSize: (d) => fontScale(d.value),
            font: fontFamily,
            padding,
            spiral,
            rotate: (d) => rotateFn(d),
            children: (cloud) => /* @__PURE__ */ jsx(Group, { top: height / 2, left: width / 2, children: cloud.map((word, i) => {
              const originalIndex = wordIndexMap.get(word.text) ?? i;
              const datum = data[originalIndex];
              const isHovered = hoveredIndex === originalIndex;
              const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;
              return /* @__PURE__ */ jsx(
                "text",
                {
                  transform: `translate(${word.x}, ${word.y}) rotate(${word.rotate})`,
                  fontSize: word.size,
                  fontFamily: word.font,
                  textAnchor: "middle",
                  fill: colors[originalIndex],
                  opacity,
                  style: { transition: "opacity 120ms ease-out", cursor: onSelect ? "pointer" : "default" },
                  onMouseEnter: () => handleEnter(datum, originalIndex),
                  onMouseLeave: handleLeave,
                  onClick: onSelect ? () => handleClick(datum, originalIndex) : void 0,
                  children: word.text
                },
                `${word.text}-${i}`
              );
            }) })
          }
        )
      ] }),
      showTooltip && hoveredIndex != null && (() => {
        const datum = data[hoveredIndex];
        if (!datum) return null;
        return /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            left: width / 2,
            top: height / 2,
            visible: true,
            offsetY: -12,
            children: buildTooltipContent(datum)
          }
        );
      })()
    ] })
  ] });
};
WordCloudInner.displayName = "WordCloudInner";
var WordCloudInner_default = WordCloudInner;
export {
  WordCloudInner,
  WordCloudInner_default as default
};
//# sourceMappingURL=WordCloudInner.js.map

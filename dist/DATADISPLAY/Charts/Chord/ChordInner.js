"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { Chord as VisxChord, Ribbon } from "@visx/chord";
import { arc as d3arc } from "d3-shape";
import { CHORD_DEFAULTS } from "./Chord.constants";
import { buildChordClasses, buildTooltipContent } from "./Chord.utils";
import { useChordColors, useChordInteraction } from "./Chord.hooks";
import { ChartTooltip } from "../primitives/ChartTooltip";
import { BASE_CHART_CLASSES } from "../_base/constants";
import { ChartHeader } from "../_base/ChartHeader";
const ChordInner = (props) => {
  const {
    data,
    width,
    height,
    className,
    unstyled = CHORD_DEFAULTS.unstyled,
    bindId,
    ariaLabel,
    description,
    colorScheme,
    title,
    subtitle,
    showLabels = CHORD_DEFAULTS.showLabels,
    showTooltip = CHORD_DEFAULTS.showTooltip,
    padAngle = CHORD_DEFAULTS.padAngle,
    onHover,
    onSelect
  } = props;
  const { matrix, labels } = data;
  const colors = useChordColors(labels.length, colorScheme);
  const { hoveredIndex, hoveredDatum, handleEnter, handleLeave, handleClick } = useChordInteraction(onHover, onSelect);
  const classes = useMemo(() => buildChordClasses(className, unstyled), [className, unstyled]);
  const radius = Math.min(width, height) / 2 * 0.8;
  const cx = width / 2;
  const cy = height / 2;
  const arcGen = useMemo(() => d3arc(), []);
  if (labels.length === 0 || matrix.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: classes, children: /* @__PURE__ */ jsx("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Empty chord" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: classes, "data-bind-id": bindId, children: [
    /* @__PURE__ */ jsx(ChartHeader, { title, subtitle }),
    /* @__PURE__ */ jsxs("div", { className: BASE_CHART_CLASSES.container, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs("svg", { width, height, className: BASE_CHART_CLASSES.svg, role: "img", "aria-label": ariaLabel ?? "Chord diagram", children: [
        description && /* @__PURE__ */ jsx("desc", { children: description }),
        /* @__PURE__ */ jsx(Group, { top: cy, left: cx, children: /* @__PURE__ */ jsx(VisxChord, { matrix, padAngle, children: ({ chords }) => /* @__PURE__ */ jsxs("g", { children: [
          chords.groups.map((group, i) => {
            const pathStr = arcGen({
              startAngle: group.startAngle,
              endAngle: group.endAngle,
              innerRadius: radius - 10,
              outerRadius: radius
            }) ?? "";
            return /* @__PURE__ */ jsxs("g", { children: [
              /* @__PURE__ */ jsx("path", { d: pathStr, fill: colors[i], stroke: colors[i] }),
              showLabels && (() => {
                const angle = (group.startAngle + group.endAngle) / 2;
                const textR = radius + 14;
                const x = Math.cos(angle - Math.PI / 2) * textR;
                const y = Math.sin(angle - Math.PI / 2) * textR;
                return /* @__PURE__ */ jsx(
                  "text",
                  {
                    x,
                    y,
                    fontSize: 11,
                    fontWeight: 500,
                    fill: "var(--w3f-text, #333)",
                    textAnchor: angle > Math.PI ? "end" : "start",
                    dominantBaseline: "central",
                    pointerEvents: "none",
                    children: labels[i]
                  }
                );
              })()
            ] }, `group-${i}`);
          }),
          chords.map((chord, i) => {
            const isHovered = hoveredIndex === i;
            const opacity = hoveredIndex != null && !isHovered ? 0.15 : 0.65;
            const src = labels[chord.source.index];
            const tgt = labels[chord.target.index];
            const val = chord.source.value;
            const datum = { source: src, target: tgt, value: val };
            return /* @__PURE__ */ jsx(
              Ribbon,
              {
                chord,
                radius: radius - 10,
                fill: colors[chord.source.index],
                opacity,
                style: { transition: "opacity 120ms ease-out", cursor: onSelect ? "pointer" : void 0 },
                onMouseEnter: () => handleEnter(datum, i),
                onMouseLeave: handleLeave,
                onClick: onSelect ? () => handleClick(datum, i) : void 0
              },
              `ribbon-${i}`
            );
          })
        ] }) }) })
      ] }),
      showTooltip && hoveredDatum != null && /* @__PURE__ */ jsx(ChartTooltip, { left: cx, top: 10, visible: true, offsetY: 0, children: buildTooltipContent(hoveredDatum.source, hoveredDatum.target, hoveredDatum.value) })
    ] })
  ] });
};
ChordInner.displayName = "ChordInner";
var ChordInner_default = ChordInner;
export {
  ChordInner,
  ChordInner_default as default
};
//# sourceMappingURL=ChordInner.js.map

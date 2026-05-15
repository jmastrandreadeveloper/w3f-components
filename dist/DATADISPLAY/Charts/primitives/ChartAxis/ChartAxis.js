"use client";
import { jsx } from "react/jsx-runtime";
import { AxisBottom, AxisLeft, AxisRight, AxisTop } from "@visx/axis";
import { CHART_AXIS_DEFAULTS } from "./ChartAxis.constants";
import { buildAxisClasses } from "./ChartAxis.utils";
import { useTickFormat } from "./ChartAxis.hooks";
const ChartAxis = (props) => {
  const {
    scale,
    orientation,
    top,
    left,
    numTicks = CHART_AXIS_DEFAULTS.numTicks,
    tickFormat,
    label,
    labelOffset = CHART_AXIS_DEFAULTS.labelOffset,
    hideAxisLine = CHART_AXIS_DEFAULTS.hideAxisLine,
    hideTicks = CHART_AXIS_DEFAULTS.hideTicks,
    hideTickLabels = CHART_AXIS_DEFAULTS.hideTickLabels,
    tickRotate = 0,
    className
  } = props;
  const format = useTickFormat(tickFormat);
  const rootClass = buildAxisClasses(orientation, className);
  const commonProps = {
    scale,
    top,
    left,
    numTicks,
    tickFormat: format,
    label,
    labelOffset,
    hideAxisLine,
    hideTicks,
    hideZero: false,
    stroke: "var(--w3f-chart-axis-stroke)",
    tickStroke: "var(--w3f-chart-axis-tick-stroke)",
    tickLabelProps: () => ({
      fill: "var(--w3f-chart-axis-tick-label-color)",
      fontSize: 11,
      fontFamily: "inherit",
      textAnchor: tickRotate !== 0 && (orientation === "bottom" || orientation === "top") ? "end" : orientation === "left" ? "end" : orientation === "right" ? "start" : "middle",
      dy: orientation === "top" ? "-0.25em" : "0.25em",
      angle: tickRotate
    }),
    labelProps: {
      fill: "var(--w3f-chart-axis-label-color)",
      fontSize: 12,
      fontWeight: 500,
      textAnchor: "middle"
    }
  };
  const AxisComponent = orientation === "top" ? AxisTop : orientation === "right" ? AxisRight : orientation === "bottom" ? AxisBottom : AxisLeft;
  const finalTickFormat = hideTickLabels ? () => "" : format;
  return /* @__PURE__ */ jsx("g", { className: rootClass, children: /* @__PURE__ */ jsx(AxisComponent, { ...commonProps, tickFormat: finalTickFormat }) });
};
ChartAxis.displayName = "ChartAxis";
var ChartAxis_default = ChartAxis;
export {
  ChartAxis,
  ChartAxis_default as default
};
//# sourceMappingURL=ChartAxis.js.map

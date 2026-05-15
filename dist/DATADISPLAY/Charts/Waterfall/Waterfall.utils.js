import { WATERFALL_ROOT_CLASS } from "./Waterfall.constants";
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from "../_base/utils";
function buildWaterfallClasses(className, unstyled) {
  return buildChartRootClasses(WATERFALL_ROOT_CLASS, className, unstyled);
}
function computeWaterfallBars(data) {
  let cumulative = 0;
  return data.map((datum, index) => {
    if (datum.isTotal) {
      const bar = {
        datum,
        index,
        y0: 0,
        y1: cumulative,
        cumulative
      };
      return bar;
    }
    const start = cumulative;
    cumulative += datum.value;
    return {
      datum,
      index,
      y0: start,
      y1: cumulative,
      cumulative
    };
  });
}
function buildWaterfallScales(bars, data, innerWidth, innerHeight) {
  const labels = data.map((d) => d.label);
  const allValues = bars.flatMap((b) => [b.y0, b.y1]);
  const min = Math.min(0, ...allValues);
  const max = Math.max(0, ...allValues);
  const xScale = buildBandScale(labels, [0, innerWidth], 0.3);
  const yScale = buildLinearScale(min, max, [innerHeight, 0]);
  return { xScale, yScale };
}
function buildTooltipContent(bar) {
  const { datum } = bar;
  if (datum.isTotal) {
    return `${datum.label}: ${bar.cumulative.toLocaleString()} (total)`;
  }
  const sign = datum.value >= 0 ? "+" : "";
  return `${datum.label}: ${sign}${datum.value.toLocaleString()} \u2192 ${bar.cumulative.toLocaleString()}`;
}
export {
  buildTooltipContent,
  buildWaterfallClasses,
  buildWaterfallScales,
  computeWaterfallBars,
  formatTick
};
//# sourceMappingURL=Waterfall.utils.js.map

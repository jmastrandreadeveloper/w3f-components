import { BAR_STACKED_ROOT_CLASS } from "./BarStacked.constants";
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from "../_base/utils";
function buildBarStackedClasses(className, unstyled) {
  return buildChartRootClasses(BAR_STACKED_ROOT_CLASS, className, unstyled);
}
const defaultGetLabel = (d) => d.label;
function buildStackedScales(data, keys, innerWidth, innerHeight, getLabel, padding) {
  const labels = data.map((d) => String(getLabel(d)));
  let maxTotal = 0;
  for (const d of data) {
    let total = 0;
    for (const k of keys) total += Number(d[k]) || 0;
    if (total > maxTotal) maxTotal = total;
  }
  const xScale = buildBandScale(labels, [0, innerWidth], padding);
  const yScale = buildLinearScale(0, maxTotal, [innerHeight, 0]);
  return { xScale, yScale };
}
function computeStack(data, keys, getLabel) {
  return data.map((d) => {
    let cumulative = 0;
    const segments = keys.map((key) => {
      const value = Number(d[key]) || 0;
      const y0 = cumulative;
      cumulative += value;
      return { key, y0, y1: cumulative, value };
    });
    return { label: String(getLabel(d)), segments };
  });
}
export {
  buildBarStackedClasses,
  buildStackedScales,
  computeStack,
  defaultGetLabel,
  formatTick
};
//# sourceMappingURL=BarStacked.utils.js.map

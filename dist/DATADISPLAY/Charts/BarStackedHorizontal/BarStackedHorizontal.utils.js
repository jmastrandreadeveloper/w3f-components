import { BAR_SH_ROOT_CLASS } from "./BarStackedHorizontal.constants";
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from "../_base/utils";
function buildBarSHClasses(className, unstyled) {
  return buildChartRootClasses(BAR_SH_ROOT_CLASS, className, unstyled);
}
const defaultGetLabel = (d) => d.label;
function buildStackedHScales(data, keys, innerWidth, innerHeight, getLabel, padding) {
  const labels = data.map((d) => String(getLabel(d)));
  let maxTotal = 0;
  for (const d of data) {
    let total = 0;
    for (const k of keys) total += Number(d[k]) || 0;
    if (total > maxTotal) maxTotal = total;
  }
  const yScale = buildBandScale(labels, [0, innerHeight], padding);
  const xScale = buildLinearScale(0, maxTotal, [0, innerWidth]);
  return { xScale, yScale };
}
function computeStackH(data, keys, getLabel) {
  return data.map((d) => {
    let cumulative = 0;
    const segments = keys.map((key) => {
      const value = Number(d[key]) || 0;
      const x0 = cumulative;
      cumulative += value;
      return { key, x0, x1: cumulative, value };
    });
    return { label: String(getLabel(d)), segments };
  });
}
export {
  buildBarSHClasses,
  buildStackedHScales,
  computeStackH,
  defaultGetLabel,
  formatTick
};
//# sourceMappingURL=BarStackedHorizontal.utils.js.map

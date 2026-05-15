import { scaleBand } from "@visx/scale";
import { BAR_GH_ROOT_CLASS } from "./BarGroupedHorizontal.constants";
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from "../_base/utils";
function buildBarGHClasses(className, unstyled) {
  return buildChartRootClasses(BAR_GH_ROOT_CLASS, className, unstyled);
}
const defaultGetLabel = (d) => d.label;
function buildGroupedHScales(data, keys, innerWidth, innerHeight, getLabel, padding, xDomain) {
  const labels = data.map((d) => String(getLabel(d)));
  let max = 0;
  for (const d of data) {
    for (const k of keys) {
      const v = Number(d[k]) || 0;
      if (v > max) max = v;
    }
  }
  const [minVal, maxVal] = xDomain ?? [0, max];
  const y0Scale = buildBandScale(labels, [0, innerHeight], padding);
  const y1Scale = scaleBand({
    domain: [...keys],
    range: [0, y0Scale.bandwidth()],
    padding: 0.05
  });
  const xScale = buildLinearScale(minVal, maxVal, [0, innerWidth]);
  return { y0Scale, y1Scale, xScale };
}
export {
  buildBarGHClasses,
  buildGroupedHScales,
  defaultGetLabel,
  formatTick
};
//# sourceMappingURL=BarGroupedHorizontal.utils.js.map

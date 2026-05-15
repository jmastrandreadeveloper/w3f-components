import { scaleBand } from "@visx/scale";
import { BAR_GROUPED_ROOT_CLASS } from "./BarGrouped.constants";
import {
  buildChartRootClasses,
  buildBandScale,
  buildLinearScale,
  formatTick
} from "../_base/utils";
function buildBarGroupedClasses(className, unstyled) {
  return buildChartRootClasses(BAR_GROUPED_ROOT_CLASS, className, unstyled);
}
const defaultGetLabel = (d) => d.label;
function buildGroupedScales(data, keys, innerWidth, innerHeight, getLabel, padding, yDomain) {
  const labels = data.map((d) => String(getLabel(d)));
  let max = 0;
  for (const d of data) {
    for (const k of keys) {
      const v = Number(d[k]) || 0;
      if (v > max) max = v;
    }
  }
  const [minVal, maxVal] = yDomain ?? [0, max];
  const x0Scale = buildBandScale(labels, [0, innerWidth], padding);
  const x1Scale = scaleBand({
    domain: [...keys],
    range: [0, x0Scale.bandwidth()],
    padding: 0.05
  });
  const yScale = buildLinearScale(minVal, maxVal, [innerHeight, 0]);
  return { x0Scale, x1Scale, yScale };
}
export {
  buildBarGroupedClasses,
  buildGroupedScales,
  defaultGetLabel,
  formatTick
};
//# sourceMappingURL=BarGrouped.utils.js.map

import { VIOLIN_ROOT_CLASS } from "./Violin.constants";
import { buildChartRootClasses, buildBandScale, buildLinearScale, safeExtent, formatTick } from "../_base/utils";
function buildViolinClasses(className, unstyled) {
  return buildChartRootClasses(VIOLIN_ROOT_CLASS, className, unstyled);
}
function kde(values, min, max, resolution, bandwidthMul) {
  if (values.length === 0) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const std = Math.sqrt(sorted.reduce((s, v) => s + (v - sorted[n >> 1]) ** 2, 0) / n) || 1;
  const h = 1.06 * std * Math.pow(n, -0.2) * bandwidthMul;
  const step = (max - min) / resolution;
  const points = [];
  for (let i = 0; i <= resolution; i++) {
    const x = min + i * step;
    let sum = 0;
    for (const v of sorted) {
      const z = (x - v) / h;
      sum += Math.exp(-0.5 * z * z);
    }
    points.push({ value: x, density: sum / (n * h * Math.sqrt(2 * Math.PI)) });
  }
  return points;
}
function buildViolinScales(data, innerWidth, innerHeight, yDomain) {
  const groups = data.map((d) => d.group);
  const allValues = data.flatMap((d) => d.values);
  const [yMin, yMax] = yDomain ?? safeExtent(allValues);
  const xScale = buildBandScale(groups, [0, innerWidth], 0.2);
  const yScale = buildLinearScale(yMin, yMax, [innerHeight, 0]);
  return { xScale, yScale };
}
function buildTooltipContent(group) {
  const n = group.values.length;
  const mean = group.values.reduce((s, v) => s + v, 0) / n;
  return `${group.group}: n=${n}, mean=${mean.toFixed(1)}`;
}
export {
  buildTooltipContent,
  buildViolinClasses,
  buildViolinScales,
  formatTick,
  kde
};
//# sourceMappingURL=Violin.utils.js.map

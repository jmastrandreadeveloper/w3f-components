import { AREA_STACKED_ROOT_CLASS } from "./AreaStacked.constants";
import { buildChartRootClasses, formatTick } from "../_base/utils";
function buildAreaStackedClasses(className, unstyled) {
  return buildChartRootClasses(AREA_STACKED_ROOT_CLASS, className, unstyled);
}
function toDate(v) {
  return v instanceof Date ? v : new Date(v);
}
function computeAreaStack(data, keys) {
  const seriesMap = /* @__PURE__ */ new Map();
  for (const series of data) {
    seriesMap.set(series.id, series.data);
  }
  const refSeries = seriesMap.get(keys[0]);
  if (!refSeries || refSeries.length === 0) {
    return { dates: [], layers: keys.map((key) => ({ key, points: [] })) };
  }
  const dates = refSeries.map((pt) => toDate(pt.date));
  const numPoints = dates.length;
  const layers = [];
  for (const key of keys) {
    const seriesData = seriesMap.get(key);
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const value = seriesData ? seriesData[i]?.value ?? 0 : 0;
      let baseline = 0;
      for (const prevLayer of layers) {
        baseline += prevLayer.points[i]?.value ?? 0;
      }
      points.push({
        date: dates[i],
        y0: baseline,
        y1: baseline + value,
        value
      });
    }
    layers.push({ key, points });
  }
  return { dates, layers };
}
export {
  buildAreaStackedClasses,
  computeAreaStack,
  formatTick,
  toDate
};
//# sourceMappingURL=AreaStacked.utils.js.map

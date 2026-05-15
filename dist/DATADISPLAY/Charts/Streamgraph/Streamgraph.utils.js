import { STREAMGRAPH_ROOT_CLASS } from "./Streamgraph.constants";
import { buildChartRootClasses } from "../_base/utils";
function buildStreamgraphClasses(className, unstyled) {
  return buildChartRootClasses(STREAMGRAPH_ROOT_CLASS, className, unstyled);
}
function toDate(v) {
  return v instanceof Date ? v : new Date(v);
}
function computeStreamLayers(data, keys) {
  if (data.length === 0 || keys.length === 0) return { dates: [], layers: [] };
  const seriesMap = /* @__PURE__ */ new Map();
  for (const s of data) seriesMap.set(s.id, s.data);
  const firstSeries = seriesMap.get(keys[0]);
  if (!firstSeries || firstSeries.length === 0) return { dates: [], layers: [] };
  const dates = firstSeries.map((pt) => toDate(pt.date));
  const numDates = dates.length;
  const matrix = keys.map((key) => {
    const series = seriesMap.get(key);
    if (!series) return new Array(numDates).fill(0);
    return series.map((pt) => pt.value);
  });
  const layers = keys.map((key) => ({
    key,
    points: []
  }));
  for (let di = 0; di < numDates; di++) {
    let total = 0;
    for (let ki = 0; ki < keys.length; ki++) total += matrix[ki][di];
    let y0 = -total / 2;
    for (let ki = 0; ki < keys.length; ki++) {
      const value = matrix[ki][di];
      const y1 = y0 + value;
      layers[ki].points.push({ date: dates[di], y0, y1, value });
      y0 = y1;
    }
  }
  return { dates, layers };
}
export {
  buildStreamgraphClasses,
  computeStreamLayers,
  toDate
};
//# sourceMappingURL=Streamgraph.utils.js.map

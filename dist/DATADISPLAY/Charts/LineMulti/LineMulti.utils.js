import { scaleTime, scaleLinear } from "@visx/scale";
import { LINE_MULTI_ROOT_CLASS } from "./LineMulti.constants";
import { buildChartRootClasses, formatTick } from "../_base/utils";
function buildLineMultiClasses(className, unstyled) {
  return buildChartRootClasses(LINE_MULTI_ROOT_CLASS, className, unstyled);
}
function toDate(v) {
  return v instanceof Date ? v : new Date(v);
}
function buildMultiTimeScales(data, innerWidth, innerHeight) {
  let minDate = Infinity;
  let maxDate = -Infinity;
  let maxVal = 0;
  for (const series of data) {
    for (const pt of series.data) {
      const t = Number(toDate(pt.date));
      if (t < minDate) minDate = t;
      if (t > maxDate) maxDate = t;
      if (pt.value > maxVal) maxVal = pt.value;
    }
  }
  const xScale = scaleTime({ domain: [minDate, maxDate], range: [0, innerWidth] });
  const yScale = scaleLinear({ domain: [0, maxVal * 1.1], range: [innerHeight, 0], nice: true });
  return { xScale, yScale };
}
export {
  buildLineMultiClasses,
  buildMultiTimeScales,
  formatTick,
  toDate
};
//# sourceMappingURL=LineMulti.utils.js.map

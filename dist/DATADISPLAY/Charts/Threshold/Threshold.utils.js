import { scaleTime, scaleLinear } from "@visx/scale";
import { THRESHOLD_ROOT_CLASS } from "./Threshold.constants";
import { buildChartRootClasses, safeExtent, formatTick } from "../_base/utils";
function buildThresholdClasses(className, unstyled) {
  return buildChartRootClasses(THRESHOLD_ROOT_CLASS, className, unstyled);
}
const defaultGetDate = (d) => d.date;
const defaultGetValue0 = (d) => d.value0;
const defaultGetValue1 = (d) => d.value1;
function toDate(v) {
  return v instanceof Date ? v : new Date(v);
}
function buildThresholdScales(data, innerWidth, innerHeight, getDate, getValue0, getValue1, yDomain) {
  const dates = data.map((d) => toDate(getDate(d)));
  const allValues = [...data.map(getValue0), ...data.map(getValue1)];
  const [minVal, maxVal] = yDomain ?? safeExtent(allValues);
  const xScale = scaleTime({
    domain: [Math.min(...dates.map(Number)), Math.max(...dates.map(Number))],
    range: [0, innerWidth]
  });
  const yScale = scaleLinear({
    domain: [minVal, maxVal * 1.1],
    range: [innerHeight, 0],
    nice: true
  });
  return { xScale, yScale };
}
export {
  buildThresholdClasses,
  buildThresholdScales,
  defaultGetDate,
  defaultGetValue0,
  defaultGetValue1,
  formatTick,
  toDate
};
//# sourceMappingURL=Threshold.utils.js.map

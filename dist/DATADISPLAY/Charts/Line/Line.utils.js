import { scaleTime, scaleLinear } from "@visx/scale";
import { LINE_ROOT_CLASS } from "./Line.constants";
import { buildChartRootClasses, safeExtent, formatTick } from "../_base/utils";
function buildLineClasses(className, unstyled) {
  return buildChartRootClasses(LINE_ROOT_CLASS, className, unstyled);
}
const defaultGetDate = (d) => d.date;
const defaultGetValue = (d) => d.value;
function toDate(v) {
  return v instanceof Date ? v : new Date(v);
}
function buildTimeScales(data, innerWidth, innerHeight, getDate, getValue, yDomain) {
  const dates = data.map((d) => toDate(getDate(d)));
  const values = data.map(getValue);
  const [minVal, maxVal] = yDomain ?? safeExtent(values);
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
  buildLineClasses,
  buildTimeScales,
  defaultGetDate,
  defaultGetValue,
  formatTick,
  toDate
};
//# sourceMappingURL=Line.utils.js.map

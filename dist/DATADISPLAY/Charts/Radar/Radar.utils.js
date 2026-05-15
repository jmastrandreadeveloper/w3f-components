import { RADAR_ROOT_CLASS } from "./Radar.constants";
import { buildChartRootClasses } from "../_base/utils";
import { scaleLinear } from "@visx/scale";
function buildRadarClasses(className, unstyled) {
  return buildChartRootClasses(RADAR_ROOT_CLASS, className, unstyled);
}
const defaultGetLabel = (d) => String(d.label);
const defaultGetValue = (d) => d.value;
function axisAngle(i, n) {
  return Math.PI * 2 * i / n - Math.PI / 2;
}
function buildPolygon(data, getValue, rScale) {
  return data.map((d, i) => {
    const angle = axisAngle(i, data.length);
    const r = rScale(getValue(d));
    return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
  }).join(" ");
}
function buildGridPolygon(n, radius) {
  return Array.from({ length: n }, (_, i) => {
    const angle = axisAngle(i, n);
    return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
  }).join(" ");
}
function labelPosition(i, n, radius, offset = 14) {
  const angle = axisAngle(i, n);
  const r = radius + offset;
  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r;
  const anchor = Math.abs(x) < 1 ? "middle" : x > 0 ? "start" : "end";
  return { x, y, anchor };
}
function buildRadarScale(maxValue, radius) {
  return scaleLinear({ domain: [0, maxValue], range: [0, radius], clamp: true });
}
function buildTooltipContent(d, getLabel, getValue) {
  return `${getLabel(d)}: ${getValue(d).toLocaleString()}`;
}
export {
  axisAngle,
  buildGridPolygon,
  buildPolygon,
  buildRadarClasses,
  buildRadarScale,
  buildTooltipContent,
  defaultGetLabel,
  defaultGetValue,
  labelPosition
};
//# sourceMappingURL=Radar.utils.js.map

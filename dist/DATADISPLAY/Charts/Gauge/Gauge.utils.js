import { GAUGE_ROOT_CLASS } from "./Gauge.constants";
import { buildChartRootClasses } from "../_base/utils";
import { scaleLinear } from "@visx/scale";
function buildGaugeClasses(className, unstyled) {
  return buildChartRootClasses(GAUGE_ROOT_CLASS, className, unstyled);
}
function buildGaugeScale(min, max) {
  return scaleLinear({ domain: [min, max], range: [-Math.PI / 2, Math.PI / 2], clamp: true });
}
function getGaugeColor(value, color, thresholds) {
  if (!thresholds || thresholds.length === 0) return color;
  const sorted = [...thresholds].sort((a, b) => a.value - b.value);
  let result = color;
  for (const t of sorted) {
    if (value >= t.value) result = t.color;
  }
  return result;
}
function arcPath(cx, cy, outerR, innerR, startAngle, endAngle) {
  const toX = (r, a) => cx + r * Math.cos(a);
  const toY = (r, a) => cy + r * Math.sin(a);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  const ox1 = toX(outerR, startAngle);
  const oy1 = toY(outerR, startAngle);
  const ox2 = toX(outerR, endAngle);
  const oy2 = toY(outerR, endAngle);
  const ix1 = toX(innerR, endAngle);
  const iy1 = toY(innerR, endAngle);
  const ix2 = toX(innerR, startAngle);
  const iy2 = toY(innerR, startAngle);
  return [
    `M ${ox1} ${oy1}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${ox2} ${oy2}`,
    `L ${ix1} ${iy1}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`,
    "Z"
  ].join(" ");
}
function needlePath(cx, cy, length, angle) {
  const tipX = cx + Math.cos(angle) * length;
  const tipY = cy + Math.sin(angle) * length;
  const baseHalf = 4;
  const perpAngle = angle + Math.PI / 2;
  const bx1 = cx + Math.cos(perpAngle) * baseHalf;
  const by1 = cy + Math.sin(perpAngle) * baseHalf;
  const bx2 = cx - Math.cos(perpAngle) * baseHalf;
  const by2 = cy - Math.sin(perpAngle) * baseHalf;
  return `M ${tipX} ${tipY} L ${bx1} ${by1} L ${bx2} ${by2} Z`;
}
export {
  arcPath,
  buildGaugeClasses,
  buildGaugeScale,
  getGaugeColor,
  needlePath
};
//# sourceMappingURL=Gauge.utils.js.map

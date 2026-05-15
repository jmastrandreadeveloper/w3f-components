import { scaleLinear } from "@visx/scale";
import { GAUGE_CHART_CLASSES } from "./GaugeChart.constants";
function buildGaugeChartClasses(className, unstyled) {
  const base = unstyled ? GAUGE_CHART_CLASSES.unstyled : GAUGE_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildGaugeScale(min, max) {
  return scaleLinear({
    domain: [min, max],
    range: [-Math.PI / 2, Math.PI / 2],
    clamp: true
  });
}
function getGaugeColor(value, defaultColor, thresholds) {
  if (!thresholds || thresholds.length === 0) return defaultColor;
  const sorted = [...thresholds].sort((a, b) => a.value - b.value);
  let color = defaultColor;
  for (const t of sorted) {
    if (value >= t.value) {
      color = t.color;
    }
  }
  return color;
}
function arcPath(cx, cy, radius, startAngle, endAngle, innerRadius) {
  const startX = cx + innerRadius * Math.cos(startAngle - Math.PI);
  const startY = cy + innerRadius * Math.sin(startAngle - Math.PI);
  const outerStartX = cx + radius * Math.cos(startAngle - Math.PI);
  const outerStartY = cy + radius * Math.sin(startAngle - Math.PI);
  const outerEndX = cx + radius * Math.cos(endAngle - Math.PI);
  const outerEndY = cy + radius * Math.sin(endAngle - Math.PI);
  const innerEndX = cx + innerRadius * Math.cos(endAngle - Math.PI);
  const innerEndY = cy + innerRadius * Math.sin(endAngle - Math.PI);
  const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
  return [
    `M ${outerStartX} ${outerStartY}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${startX} ${startY}`,
    "Z"
  ].join(" ");
}
function needlePath(cx, cy, length, angle, baseWidth = 4) {
  const tipX = cx + length * Math.cos(angle - Math.PI);
  const tipY = cy + length * Math.sin(angle - Math.PI);
  const perpAngle = angle - Math.PI + Math.PI / 2;
  const baseX1 = cx + baseWidth * Math.cos(perpAngle);
  const baseY1 = cy + baseWidth * Math.sin(perpAngle);
  const baseX2 = cx - baseWidth * Math.cos(perpAngle);
  const baseY2 = cy - baseWidth * Math.sin(perpAngle);
  return `M ${baseX1} ${baseY1} L ${tipX} ${tipY} L ${baseX2} ${baseY2} Z`;
}
export {
  arcPath,
  buildGaugeChartClasses,
  buildGaugeScale,
  getGaugeColor,
  needlePath
};
//# sourceMappingURL=GaugeChart.utils.js.map

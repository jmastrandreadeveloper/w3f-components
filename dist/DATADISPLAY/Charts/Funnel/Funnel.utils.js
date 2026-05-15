import { FUNNEL_ROOT_CLASS } from "./Funnel.constants";
import { buildChartRootClasses } from "../_base/utils";
function buildFunnelClasses(className, unstyled) {
  return buildChartRootClasses(FUNNEL_ROOT_CLASS, className, unstyled);
}
function computeFunnelSegments(data, width, height, gap) {
  if (data.length === 0) return [];
  const maxValue = data[0].value;
  const totalGap = gap * (data.length - 1);
  const segmentHeight = (height - totalGap) / data.length;
  const centerX = width / 2;
  const maxHalfWidth = width * 0.45;
  return data.map((datum, i) => {
    const currentRatio = maxValue > 0 ? datum.value / maxValue : 0;
    const nextRatio = i < data.length - 1 && maxValue > 0 ? data[i + 1].value / maxValue : currentRatio * 0.7;
    const topHalf = currentRatio * maxHalfWidth;
    const bottomHalf = (i < data.length - 1 ? nextRatio : currentRatio * 0.7) * maxHalfWidth;
    const y = i * (segmentHeight + gap);
    return {
      datum,
      index: i,
      topLeft: centerX - topHalf,
      topRight: centerX + topHalf,
      bottomLeft: centerX - bottomHalf,
      bottomRight: centerX + bottomHalf,
      y,
      height: segmentHeight,
      percentage: maxValue > 0 ? datum.value / maxValue * 100 : 0
    };
  });
}
function buildSegmentPath(seg) {
  return [
    `M${seg.topLeft},${seg.y}`,
    `L${seg.topRight},${seg.y}`,
    `L${seg.bottomRight},${seg.y + seg.height}`,
    `L${seg.bottomLeft},${seg.y + seg.height}`,
    "Z"
  ].join(" ");
}
function buildTooltipContent(datum, percentage, formatValue) {
  const val = formatValue ? formatValue(datum.value) : datum.value.toLocaleString();
  return `${datum.label}: ${val} (${percentage.toFixed(1)}%)`;
}
export {
  buildFunnelClasses,
  buildSegmentPath,
  buildTooltipContent,
  computeFunnelSegments
};
//# sourceMappingURL=Funnel.utils.js.map

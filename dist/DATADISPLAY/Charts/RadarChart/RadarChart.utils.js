import { scaleLinear } from "@visx/scale";
import { RADAR_CHART_CLASSES } from "./RadarChart.constants";
function buildRadarChartClasses(className, unstyled) {
  const base = unstyled ? RADAR_CHART_CLASSES.unstyled : RADAR_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildRadarScale(data, radius) {
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  return scaleLinear({
    domain: [0, maxValue],
    range: [0, radius]
  });
}
function radarPoint(index, total, value, radius, maxValue) {
  const angle = Math.PI * 2 * index / total - Math.PI / 2;
  const r = value / maxValue * radius;
  return {
    x: r * Math.cos(angle),
    y: r * Math.sin(angle)
  };
}
function buildRadarPolygon(data, radius) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  return data.map((d, i) => {
    const pt = radarPoint(i, data.length, d.value, radius, maxValue);
    return `${pt.x},${pt.y}`;
  }).join(" ");
}
function buildGridPolygon(total, radius, level, levels) {
  const r = radius * level / levels;
  const points = [];
  for (let i = 0; i < total; i++) {
    const angle = Math.PI * 2 * i / total - Math.PI / 2;
    points.push(`${r * Math.cos(angle)},${r * Math.sin(angle)}`);
  }
  return points.join(" ");
}
function labelPosition(index, total, radius, offset = 16) {
  const angle = Math.PI * 2 * index / total - Math.PI / 2;
  const r = radius + offset;
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  let anchor = "middle";
  if (Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI) < 0.1 || Math.abs(angle + Math.PI) < 0.1) {
    anchor = "middle";
  } else if (Math.cos(angle) > 0.1) {
    anchor = "start";
  } else if (Math.cos(angle) < -0.1) {
    anchor = "end";
  }
  return { x, y, anchor };
}
export {
  buildGridPolygon,
  buildRadarChartClasses,
  buildRadarPolygon,
  buildRadarScale,
  labelPosition,
  radarPoint
};
//# sourceMappingURL=RadarChart.utils.js.map

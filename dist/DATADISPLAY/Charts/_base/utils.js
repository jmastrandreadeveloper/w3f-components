import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import {
  BASE_CHART_CLASSES,
  DEFAULT_BAND_PADDING,
  DEFAULT_CHART_MARGIN,
  DOMAIN_PADDING_RATIO
} from "./constants";
import { getColorScheme } from "../_theme/colorSchemes";
function buildChartRootClasses(chartRoot, className, unstyled) {
  const parts = [BASE_CHART_CLASSES.root, chartRoot];
  if (unstyled) {
    parts.push(`${BASE_CHART_CLASSES.root}--unstyled`);
    parts.push(`${chartRoot}--unstyled`);
  }
  if (className) parts.push(className);
  return parts.join(" ");
}
function computeInnerDims(width, height, margin = DEFAULT_CHART_MARGIN) {
  const innerWidth = Math.max(width - margin.left - margin.right, 0);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
  return { width, height, innerWidth, innerHeight, margin };
}
function resolveColorScheme(scheme) {
  if (!scheme) return getColorScheme("categorical-10");
  if (Array.isArray(scheme)) return scheme;
  return getColorScheme(scheme);
}
function buildBandScale(domain, range, padding = DEFAULT_BAND_PADDING) {
  return scaleBand({
    domain: [...domain],
    range,
    padding
  });
}
function buildLinearScale(domainMin, domainMax, range, opts = {}) {
  const { nice = true, padding = DOMAIN_PADDING_RATIO } = opts;
  const span = domainMax - domainMin;
  const paddedMax = domainMax + span * padding;
  const paddedMin = domainMin < 0 ? domainMin - span * padding : domainMin;
  return scaleLinear({
    domain: [paddedMin, paddedMax],
    range,
    nice
  });
}
function buildColorScale(domain, palette) {
  return scaleOrdinal({
    domain: [...domain],
    range: [...palette]
  });
}
function formatTick(value) {
  if (value instanceof Date) {
    return value.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
  }
  if (typeof value === "number") {
    if (value > 1e11) {
      return new Date(value).toLocaleDateString("es-AR", { day: "numeric", month: "short" });
    }
    const abs = Math.abs(value);
    if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}k`;
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  return String(value ?? "");
}
function safeExtent(values) {
  if (values.length === 0) return [0, 1];
  let min = values[0];
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    const v = values[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (min === max) {
    if (min === 0) return [0, 1];
    return [Math.min(0, min), max * 1.1];
  }
  return [Math.min(0, min), max];
}
function clamp(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
export {
  buildBandScale,
  buildChartRootClasses,
  buildColorScale,
  buildLinearScale,
  clamp,
  computeInnerDims,
  formatTick,
  resolveColorScheme,
  safeExtent
};
//# sourceMappingURL=utils.js.map

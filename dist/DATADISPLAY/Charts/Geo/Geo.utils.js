import { GEO_ROOT_CLASS } from "./Geo.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildGeoClasses(className, unstyled) {
  return buildChartRootClasses(GEO_ROOT_CLASS, className, unstyled);
}
function buildGeoColorScale(min, max, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  const lightColor = palette[0];
  const darkColor = palette[Math.min(palette.length - 1, palette.length > 2 ? palette.length - 2 : palette.length - 1)];
  const range = max - min || 1;
  return (value) => {
    const t = Math.max(0, Math.min(1, (value - min) / range));
    return interpolateColor(lightColor, darkColor, t);
  };
}
function interpolateColor(from, to, t) {
  const c1 = parseColor(from);
  const c2 = parseColor(to);
  if (!c1 || !c2) return to;
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  return `rgb(${r},${g},${b})`;
}
function parseColor(color) {
  const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16)
      ];
    }
    if (hex.length >= 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16)
      ];
    }
  }
  const rgbMatch = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])];
  }
  return null;
}
function buildTooltipContent(datum) {
  const name = datum.label ?? datum.id;
  return `${name}: ${datum.value.toLocaleString()}`;
}
export {
  buildGeoClasses,
  buildGeoColorScale,
  buildTooltipContent
};
//# sourceMappingURL=Geo.utils.js.map

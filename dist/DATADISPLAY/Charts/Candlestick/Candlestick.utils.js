import { CANDLESTICK_ROOT_CLASS } from "./Candlestick.constants";
import { buildChartRootClasses, buildBandScale, buildLinearScale, formatTick } from "../_base/utils";
function buildCandlestickClasses(className, unstyled) {
  return buildChartRootClasses(CANDLESTICK_ROOT_CLASS, className, unstyled);
}
function toDate(d) {
  if (d instanceof Date) return d;
  return new Date(d);
}
function buildCandlestickScales(data, innerWidth, innerHeight, volumeHeight) {
  const labels = data.map((_, i) => String(i));
  const allPrices = data.flatMap((d) => [d.open, d.high, d.low, d.close]);
  const priceMin = Math.min(...allPrices);
  const priceMax = Math.max(...allPrices);
  const priceChartHeight = volumeHeight > 0 ? innerHeight - volumeHeight - 8 : innerHeight;
  const xScale = buildBandScale(labels, [0, innerWidth], 0.2);
  const yScale = buildLinearScale(priceMin, priceMax, [priceChartHeight, 0], { padding: 0.05 });
  let volumeScale = null;
  if (volumeHeight > 0) {
    const volumes = data.map((d) => d.volume ?? 0);
    const maxVol = Math.max(...volumes, 1);
    volumeScale = buildLinearScale(0, maxVol, [volumeHeight, 0], { padding: 0 });
  }
  return { xScale, yScale, volumeScale, priceChartHeight };
}
function buildTooltipContent(datum) {
  const d = toDate(datum.date);
  const dateStr = d.toLocaleDateString();
  const lines = [
    dateStr,
    `O: ${datum.open.toLocaleString()}`,
    `H: ${datum.high.toLocaleString()}`,
    `L: ${datum.low.toLocaleString()}`,
    `C: ${datum.close.toLocaleString()}`
  ];
  if (datum.volume != null) {
    lines.push(`Vol: ${datum.volume.toLocaleString()}`);
  }
  return lines.join(" | ");
}
function defaultFormatX(d) {
  const date = toDate(d);
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
}
export {
  buildCandlestickClasses,
  buildCandlestickScales,
  buildTooltipContent,
  defaultFormatX,
  formatTick,
  toDate
};
//# sourceMappingURL=Candlestick.utils.js.map

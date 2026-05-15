import { WAFFLE_ROOT_CLASS } from "./Waffle.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildWaffleClasses(className, unstyled) {
  return buildChartRootClasses(WAFFLE_ROOT_CLASS, className, unstyled);
}
function buildWaffleColors(count, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
function buildCellMap(data, totalCells) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return Array(totalCells).fill(-1);
  const cells = [];
  let remaining = totalCells;
  data.forEach((d, sliceIndex) => {
    const proportion = d.value / total;
    const count = sliceIndex === data.length - 1 ? remaining : Math.round(proportion * totalCells);
    for (let j = 0; j < count && cells.length < totalCells; j++) {
      cells.push(sliceIndex);
    }
    remaining -= count;
  });
  while (cells.length < totalCells) {
    cells.push(data.length - 1);
  }
  return cells;
}
function buildTooltipContent(d, total) {
  const pct = total > 0 ? (d.value / total * 100).toFixed(1) : "0";
  return `${d.label}: ${d.value.toLocaleString()} (${pct}%)`;
}
export {
  buildCellMap,
  buildTooltipContent,
  buildWaffleClasses,
  buildWaffleColors
};
//# sourceMappingURL=Waffle.utils.js.map

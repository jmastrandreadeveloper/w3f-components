import { HEATMAP_ROOT_CLASS } from "./Heatmap.constants";
import { buildChartRootClasses, formatTick } from "../_base/utils";
import { scaleBand, scaleLinear } from "@visx/scale";
function buildHeatmapClasses(className, unstyled) {
  return buildChartRootClasses(HEATMAP_ROOT_CLASS, className, unstyled);
}
function extractAxes(data, getRow, getCol) {
  const rowSet = /* @__PURE__ */ new Set();
  const colSet = /* @__PURE__ */ new Set();
  for (const d of data) {
    rowSet.add(String(getRow(d)));
    colSet.add(String(getCol(d)));
  }
  return { rows: [...rowSet], cols: [...colSet] };
}
function buildHeatmapScales(rows, cols, data, getValue, innerWidth, innerHeight, colorRange) {
  const xScale = scaleBand({ domain: [...cols], range: [0, innerWidth], padding: 0.05 });
  const yScale = scaleBand({ domain: [...rows], range: [0, innerHeight], padding: 0.05 });
  const values = data.map(getValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const colorScale = scaleLinear({
    domain: [min, max],
    range: colorRange
  });
  return { xScale, yScale, colorScale };
}
function lookupValue(data, row, col, getRow, getCol, getValue) {
  const d = data.find((item) => String(getRow(item)) === row && String(getCol(item)) === col);
  return d ? getValue(d) : void 0;
}
const defaultGetRow = (d) => d.row;
const defaultGetCol = (d) => d.col;
const defaultGetValue = (d) => d.value;
function buildTooltipContent(row, col, value) {
  return `${row} \xD7 ${col}: ${value.toLocaleString()}`;
}
export {
  buildHeatmapClasses,
  buildHeatmapScales,
  buildTooltipContent,
  defaultGetCol,
  defaultGetRow,
  defaultGetValue,
  extractAxes,
  formatTick,
  lookupValue
};
//# sourceMappingURL=Heatmap.utils.js.map

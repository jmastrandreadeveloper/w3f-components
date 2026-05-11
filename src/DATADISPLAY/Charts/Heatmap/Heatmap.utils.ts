import type { HeatmapDatum } from './Heatmap.types';
import { HEATMAP_ROOT_CLASS } from './Heatmap.constants';
import { buildChartRootClasses, formatTick } from '../_base/utils';
import { scaleBand, scaleLinear } from '@visx/scale';

export function buildHeatmapClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(HEATMAP_ROOT_CLASS, className, unstyled);
}

export function extractAxes(
    data: readonly HeatmapDatum[],
    getRow: (d: HeatmapDatum) => string | number,
    getCol: (d: HeatmapDatum) => string | number,
) {
    const rowSet = new Set<string>();
    const colSet = new Set<string>();
    for (const d of data) {
        rowSet.add(String(getRow(d)));
        colSet.add(String(getCol(d)));
    }
    return { rows: [...rowSet], cols: [...colSet] };
}

export function buildHeatmapScales(
    rows: readonly string[],
    cols: readonly string[],
    data: readonly HeatmapDatum[],
    getValue: (d: HeatmapDatum) => number,
    innerWidth: number,
    innerHeight: number,
    colorRange: [string, string],
) {
    const xScale = scaleBand<string>({ domain: [...cols], range: [0, innerWidth], padding: 0.05 });
    const yScale = scaleBand<string>({ domain: [...rows], range: [0, innerHeight], padding: 0.05 });

    const values = data.map(getValue);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const colorScale = scaleLinear<string>({
        domain: [min, max],
        range: colorRange,
    });

    return { xScale, yScale, colorScale };
}

export function lookupValue(
    data: readonly HeatmapDatum[],
    row: string,
    col: string,
    getRow: (d: HeatmapDatum) => string | number,
    getCol: (d: HeatmapDatum) => string | number,
    getValue: (d: HeatmapDatum) => number,
): number | undefined {
    const d = data.find((item) => String(getRow(item)) === row && String(getCol(item)) === col);
    return d ? getValue(d) : undefined;
}

export const defaultGetRow = (d: HeatmapDatum) => d.row;
export const defaultGetCol = (d: HeatmapDatum) => d.col;
export const defaultGetValue = (d: HeatmapDatum) => d.value;

export { formatTick };

export function buildTooltipContent(row: string, col: string, value: number): string {
    return `${row} × ${col}: ${value.toLocaleString()}`;
}

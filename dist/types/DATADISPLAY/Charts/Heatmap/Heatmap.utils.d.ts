import type { HeatmapDatum } from './Heatmap.types';
import { formatTick } from '../_base/utils';
export declare function buildHeatmapClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function extractAxes(data: readonly HeatmapDatum[], getRow: (d: HeatmapDatum) => string | number, getCol: (d: HeatmapDatum) => string | number): {
    rows: string[];
    cols: string[];
};
export declare function buildHeatmapScales(rows: readonly string[], cols: readonly string[], data: readonly HeatmapDatum[], getValue: (d: HeatmapDatum) => number, innerWidth: number, innerHeight: number, colorRange: [string, string]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleBand<string>;
    colorScale: import("d3-scale").ScaleLinear<string, string, never>;
};
export declare function lookupValue(data: readonly HeatmapDatum[], row: string, col: string, getRow: (d: HeatmapDatum) => string | number, getCol: (d: HeatmapDatum) => string | number, getValue: (d: HeatmapDatum) => number): number | undefined;
export declare const defaultGetRow: (d: HeatmapDatum) => string | number;
export declare const defaultGetCol: (d: HeatmapDatum) => string | number;
export declare const defaultGetValue: (d: HeatmapDatum) => number;
export { formatTick };
export declare function buildTooltipContent(row: string, col: string, value: number): string;
//# sourceMappingURL=Heatmap.utils.d.ts.map
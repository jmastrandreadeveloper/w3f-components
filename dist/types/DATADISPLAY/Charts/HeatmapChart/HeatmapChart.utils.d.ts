import type { HeatmapDataPoint } from './HeatmapChart.types';
export declare function buildHeatmapChartClasses(className: string | undefined, unstyled: boolean | undefined): string;
/** Extract unique rows and columns from data. */
export declare function extractAxes(data: HeatmapDataPoint[]): {
    rows: string[];
    cols: string[];
};
/** Build band scales for rows and columns, plus a linear color scale. */
export declare function buildHeatmapScales(data: HeatmapDataPoint[], innerWidth: number, innerHeight: number, colors: [string, string]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleBand<string>;
    colorScale: import("d3-scale").ScaleLinear<string, string, never>;
};
/** Look up value for a specific row/col in the data array. */
export declare function getValue(data: HeatmapDataPoint[], row: string, col: string): number | undefined;
//# sourceMappingURL=HeatmapChart.utils.d.ts.map
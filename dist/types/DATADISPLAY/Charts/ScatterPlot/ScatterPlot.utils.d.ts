import type { ScatterPlotDataPoint } from './ScatterPlot.types';
export declare function buildScatterPlotClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildScatterScales(data: ScatterPlotDataPoint[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function formatTick(value: unknown): string;
//# sourceMappingURL=ScatterPlot.utils.d.ts.map
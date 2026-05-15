import type { BarChartDataPoint } from './BarChart.types';
export declare function buildBarChartClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildBarScales(data: BarChartDataPoint[], innerWidth: number, innerHeight: number, horizontal: boolean): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleBand<string>;
} | {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function formatTick(value: unknown): string;
//# sourceMappingURL=BarChart.utils.d.ts.map
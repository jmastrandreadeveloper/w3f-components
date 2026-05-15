import type { LineChartDataPoint } from './LineChart.types';
export declare function buildLineChartClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildLineScales(data: LineChartDataPoint[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function formatTick(value: unknown): string;
//# sourceMappingURL=LineChart.utils.d.ts.map
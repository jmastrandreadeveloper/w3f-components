import type { AreaChartDataPoint } from './AreaChart.types';
export declare function buildAreaChartClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildAreaScales(data: AreaChartDataPoint[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function formatTick(value: unknown): string;
//# sourceMappingURL=AreaChart.utils.d.ts.map
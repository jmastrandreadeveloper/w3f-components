export declare function buildSparklineClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildSparklineScales(data: readonly number[], width: number, height: number, padding?: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
    min: number;
    max: number;
};
export declare function buildSparklinePath(data: readonly number[], xScale: (v: number) => number, yScale: (v: number) => number): string;
export declare function buildAreaPath(data: readonly number[], xScale: (v: number) => number, yScale: (v: number) => number, height: number, padding: number): string;
//# sourceMappingURL=Sparkline.utils.d.ts.map
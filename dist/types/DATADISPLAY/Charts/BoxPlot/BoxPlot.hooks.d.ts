import type { BoxPlotGroup, BoxPlotStats } from './BoxPlot.types';
export declare function useBoxPlotStats(data: readonly BoxPlotGroup[]): BoxPlotStats[];
export declare function useBoxPlotScales(stats: readonly BoxPlotStats[], innerWidth: number, innerHeight: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useBoxPlotColors(stats: readonly BoxPlotStats[], colorScheme: unknown): string[];
export declare function useBoxPlotInteraction(onHover?: (datum: BoxPlotStats | null, index: number | null) => void, onSelect?: (datum: BoxPlotStats, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: BoxPlotStats, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: BoxPlotStats, i: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=BoxPlot.hooks.d.ts.map
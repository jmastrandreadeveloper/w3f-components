import type { HistogramBin } from './Histogram.types';
export declare function useHistogramBins(data: readonly number[], binCount: number, xDomain?: [number, number]): HistogramBin[];
export declare function useHistogramScales(bins: readonly HistogramBin[], innerWidth: number, innerHeight: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useHistogramColor(colorScheme: unknown): string;
export declare function useHistogramInteraction(onHover?: (bin: HistogramBin | null, index: number | null) => void, onSelect?: (bin: HistogramBin, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (b: HistogramBin, i: number) => void;
    handleLeave: () => void;
    handleClick: (b: HistogramBin, i: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Histogram.hooks.d.ts.map
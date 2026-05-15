import type { DotPlotDatum } from './DotPlot.types';
export declare function useDotPlotAccessors(getX?: (d: DotPlotDatum) => number, getCategory?: (d: DotPlotDatum) => number): {
    getX: (d: DotPlotDatum) => number;
    getCategory: (d: DotPlotDatum) => number;
};
export declare function useDotPlotScales(data: readonly DotPlotDatum[], categories: readonly string[], innerWidth: number, innerHeight: number, getX: (d: DotPlotDatum) => number, xDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleBand<string>;
};
export declare function useDotPlotColors(categories: readonly string[], colorScheme: unknown): string[];
export declare function useDotPlotInteraction(onHover?: (datum: DotPlotDatum | null, index: number | null) => void, onSelect?: (datum: DotPlotDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: DotPlotDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: DotPlotDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=DotPlot.hooks.d.ts.map
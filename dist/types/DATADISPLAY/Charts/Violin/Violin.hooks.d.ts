import type { ViolinGroup } from './Violin.types';
export declare function useViolinScales(data: readonly ViolinGroup[], innerWidth: number, innerHeight: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useViolinKDE(data: readonly ViolinGroup[], yMin: number, yMax: number, resolution: number, bandwidth: number): {
    value: number;
    density: number;
}[][];
export declare function useViolinColors(data: readonly ViolinGroup[], colorScheme: unknown): string[];
export declare function useViolinInteraction(onHover?: (datum: ViolinGroup | null, index: number | null) => void, onSelect?: (datum: ViolinGroup, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: ViolinGroup, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: ViolinGroup, i: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Violin.hooks.d.ts.map
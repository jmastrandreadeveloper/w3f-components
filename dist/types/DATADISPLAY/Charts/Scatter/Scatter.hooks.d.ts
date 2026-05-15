import type { ScatterDatum, ScatterInnerProps } from './Scatter.types';
export declare function useScatterAccessors(getX?: (d: ScatterDatum) => number, getY?: (d: ScatterDatum) => number, getR?: (d: ScatterDatum) => number, getLabel?: (d: ScatterDatum) => string): {
    getX: (d: ScatterDatum) => number;
    getY: (d: ScatterDatum) => number;
    getR: (d: ScatterDatum) => number;
    getLabel: (d: ScatterDatum) => string;
};
export declare function useScatterScales(data: readonly ScatterDatum[], innerWidth: number, innerHeight: number, getX: (d: ScatterDatum) => number, getY: (d: ScatterDatum) => number, xDomain?: [number, number], yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useScatterColors(data: readonly ScatterDatum[], colorScheme: ScatterInnerProps['colorScheme']): string[];
export declare function useScatterInteraction(onHover?: (datum: ScatterDatum | null, index: number | null) => void, onSelect?: (datum: ScatterDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: ScatterDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: ScatterDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Scatter.hooks.d.ts.map
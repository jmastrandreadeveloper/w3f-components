import type { BubbleDatum, BubbleInnerProps } from './Bubble.types';
export declare function useBubbleAccessors(getX?: (d: BubbleDatum) => number, getY?: (d: BubbleDatum) => number, getR?: (d: BubbleDatum) => number, getLabel?: (d: BubbleDatum) => string): {
    getX: (d: BubbleDatum) => number;
    getY: (d: BubbleDatum) => number;
    getR: (d: BubbleDatum) => number;
    getLabel: (d: BubbleDatum) => string;
};
export declare function useBubbleScales(data: readonly BubbleDatum[], innerWidth: number, innerHeight: number, getX: (d: BubbleDatum) => number, getY: (d: BubbleDatum) => number, getR: (d: BubbleDatum) => number, minRadius: number, maxRadius: number, xDomain?: [number, number], yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
    rScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useBubbleColors(data: readonly BubbleDatum[], colorScheme: BubbleInnerProps['colorScheme']): string[];
export declare function useBubbleInteraction(onHover?: (datum: BubbleDatum | null, index: number | null) => void, onSelect?: (datum: BubbleDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: BubbleDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BubbleDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Bubble.hooks.d.ts.map
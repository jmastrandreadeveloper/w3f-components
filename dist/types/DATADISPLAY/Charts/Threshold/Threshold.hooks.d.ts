import type { ThresholdDatum, ThresholdInnerProps } from './Threshold.types';
export declare function useThresholdAccessors(getDate?: (d: ThresholdDatum) => Date | number | string, getValue0?: (d: ThresholdDatum) => number, getValue1?: (d: ThresholdDatum) => number): {
    getDate: (d: ThresholdDatum) => string | number | Date;
    getValue0: (d: ThresholdDatum) => number;
    getValue1: (d: ThresholdDatum) => number;
};
export declare function useThresholdScales(data: readonly ThresholdDatum[], innerWidth: number, innerHeight: number, getDate: (d: ThresholdDatum) => Date | number | string, getValue0: (d: ThresholdDatum) => number, getValue1: (d: ThresholdDatum) => number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleTime<number, number, never>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useThresholdColors(aboveColor: string | undefined, belowColor: string | undefined, colorScheme: ThresholdInnerProps['colorScheme']): {
    above: string;
    below: string;
    line0: string;
    line1: string;
};
export declare function useThresholdInteraction(onHover?: (datum: ThresholdDatum | null, index: number | null) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: ThresholdDatum, i: number) => void;
    handleLeave: () => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Threshold.hooks.d.ts.map
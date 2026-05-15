import type { BarGroupedDatum, BarGroupedInnerProps } from './BarGrouped.types';
export declare function useBarGroupedAccessors(getLabel?: (d: BarGroupedDatum) => string | number): {
    getLabel: (d: BarGroupedDatum) => string | number;
};
export declare function useBarGroupedScales(data: readonly BarGroupedDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarGroupedDatum) => string | number, padding?: number, yDomain?: [number, number]): {
    x0Scale: import("d3-scale").ScaleBand<string>;
    x1Scale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useBarGroupedColors(keys: readonly string[], colorScheme: BarGroupedInnerProps['colorScheme']): Record<string, string>;
export declare function useBarGroupedInteraction(onHover?: (datum: BarGroupedDatum | null, index: number | null) => void, onSelect?: (datum: BarGroupedDatum, index: number) => void): {
    hovered: {
        groupIdx: number;
        keyIdx: number;
    } | null;
    handleEnter: (datum: BarGroupedDatum, groupIdx: number, keyIdx: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BarGroupedDatum, groupIdx: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=BarGrouped.hooks.d.ts.map
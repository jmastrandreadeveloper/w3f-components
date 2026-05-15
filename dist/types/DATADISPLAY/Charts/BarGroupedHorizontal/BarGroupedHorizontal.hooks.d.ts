import type { BarGroupedHDatum, BarGroupedHInnerProps } from './BarGroupedHorizontal.types';
export declare function useBarGHAccessors(getLabel?: (d: BarGroupedHDatum) => string | number): {
    getLabel: (d: BarGroupedHDatum) => string | number;
};
export declare function useBarGHScales(data: readonly BarGroupedHDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarGroupedHDatum) => string | number, padding?: number, xDomain?: [number, number]): {
    y0Scale: import("d3-scale").ScaleBand<string>;
    y1Scale: import("d3-scale").ScaleBand<string>;
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useBarGHColors(keys: readonly string[], colorScheme: BarGroupedHInnerProps['colorScheme']): Record<string, string>;
export declare function useBarGHInteraction(onHover?: (datum: BarGroupedHDatum | null, index: number | null) => void, onSelect?: (datum: BarGroupedHDatum, index: number) => void): {
    hovered: {
        groupIdx: number;
        keyIdx: number;
    } | null;
    handleEnter: (datum: BarGroupedHDatum, groupIdx: number, keyIdx: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BarGroupedHDatum, groupIdx: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=BarGroupedHorizontal.hooks.d.ts.map
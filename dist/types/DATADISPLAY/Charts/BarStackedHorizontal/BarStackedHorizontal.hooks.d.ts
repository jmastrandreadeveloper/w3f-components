import type { BarStackedHDatum, BarStackedHInnerProps } from './BarStackedHorizontal.types';
export declare function useBarSHAccessors(getLabel?: (d: BarStackedHDatum) => string | number): {
    getLabel: (d: BarStackedHDatum) => string | number;
};
export declare function useBarSHScales(data: readonly BarStackedHDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarStackedHDatum) => string | number, padding?: number): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleBand<string>;
};
export declare function useStackHData(data: readonly BarStackedHDatum[], keys: readonly string[], getLabel: (d: BarStackedHDatum) => string | number): import("./BarStackedHorizontal.utils").StackedHRow[];
export declare function useBarSHColors(keys: readonly string[], colorScheme: BarStackedHInnerProps['colorScheme']): Record<string, string>;
export declare function useBarSHInteraction(onHover?: (datum: BarStackedHDatum | null, index: number | null) => void, onSelect?: (datum: BarStackedHDatum, index: number) => void): {
    hovered: {
        groupIdx: number;
        keyIdx: number;
    } | null;
    handleEnter: (datum: BarStackedHDatum, groupIdx: number, keyIdx: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BarStackedHDatum, groupIdx: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=BarStackedHorizontal.hooks.d.ts.map
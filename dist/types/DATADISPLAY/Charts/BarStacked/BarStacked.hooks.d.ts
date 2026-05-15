import type { BarStackedDatum, BarStackedInnerProps } from './BarStacked.types';
export declare function useBarStackedAccessors(getLabel?: (d: BarStackedDatum) => string | number): {
    getLabel: (d: BarStackedDatum) => string | number;
};
export declare function useBarStackedScales(data: readonly BarStackedDatum[], keys: readonly string[], innerWidth: number, innerHeight: number, getLabel: (d: BarStackedDatum) => string | number, padding?: number): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
export declare function useStackData(data: readonly BarStackedDatum[], keys: readonly string[], getLabel: (d: BarStackedDatum) => string | number): import("./BarStacked.utils").StackedRow[];
export declare function useBarStackedColors(keys: readonly string[], colorScheme: BarStackedInnerProps['colorScheme']): Record<string, string>;
export declare function useBarStackedInteraction(onHover?: (datum: BarStackedDatum | null, index: number | null) => void, onSelect?: (datum: BarStackedDatum, index: number) => void): {
    hovered: {
        groupIdx: number;
        keyIdx: number;
    } | null;
    handleEnter: (datum: BarStackedDatum, groupIdx: number, keyIdx: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BarStackedDatum, groupIdx: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=BarStacked.hooks.d.ts.map
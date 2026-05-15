import type { BarHorizontalDatum, BarHorizontalInnerProps } from './BarHorizontal.types';
export declare function useBarHAccessors(getLabel?: (d: BarHorizontalDatum) => string | number, getValue?: (d: BarHorizontalDatum) => number): {
    getLabel: (d: BarHorizontalDatum) => string | number;
    getValue: (d: BarHorizontalDatum) => number;
};
export declare function useBarHScales(data: readonly BarHorizontalDatum[], innerWidth: number, innerHeight: number, getLabel: (d: BarHorizontalDatum) => string | number, getValue: (d: BarHorizontalDatum) => number, padding?: number, xDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleLinear<number, number, never>;
    yScale: import("d3-scale").ScaleBand<string>;
};
export declare function useBarHColors(data: readonly BarHorizontalDatum[], colorScheme: BarHorizontalInnerProps['colorScheme']): string[];
export declare function useBarHInteraction(onHover?: (datum: BarHorizontalDatum | null, index: number | null) => void, onSelect?: (datum: BarHorizontalDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: BarHorizontalDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BarHorizontalDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=BarHorizontal.hooks.d.ts.map
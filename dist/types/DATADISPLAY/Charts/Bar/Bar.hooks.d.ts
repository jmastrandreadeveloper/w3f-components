import type { BarDatum, BarInnerProps } from './Bar.types';
/**
 * Resolves accessors from props — always returns stable functions.
 */
export declare function useBarAccessors(getLabel?: (d: BarDatum) => string | number, getValue?: (d: BarDatum) => number): {
    getLabel: (d: BarDatum) => string | number;
    getValue: (d: BarDatum) => number;
};
/**
 * Builds the band + linear scales from data and dimensions.
 */
export declare function useBarScales(data: readonly BarDatum[], innerWidth: number, innerHeight: number, getLabel: (d: BarDatum) => string | number, getValue: (d: BarDatum) => number, padding?: number, yDomain?: [number, number]): {
    xScale: import("d3-scale").ScaleBand<string>;
    yScale: import("d3-scale").ScaleLinear<number, number, never>;
};
/**
 * Returns the color for each bar, based on the color scheme.
 */
export declare function useBarColors(data: readonly BarDatum[], getLabel: (d: BarDatum) => string | number, colorScheme: BarInnerProps['colorScheme']): string[];
/**
 * Hover + event callbacks for each bar.
 */
export declare function useBarInteraction(onHover?: (datum: BarDatum | null, index: number | null) => void, onSelect?: (datum: BarDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: BarDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BarDatum, index: number) => void;
};
export { useChartDimensions, useInnerDims } from '../_base/hooks';
//# sourceMappingURL=Bar.hooks.d.ts.map
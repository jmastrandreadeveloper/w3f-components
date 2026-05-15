import type { Datum1D } from '../_base/types';
export declare function usePolarBarColors(count: number, colorScheme: unknown): string[];
export declare function usePolarBarInteraction(onHover?: (datum: Datum1D | null, index: number | null) => void, onSelect?: (datum: Datum1D, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: Datum1D, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: Datum1D, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=PolarBar.hooks.d.ts.map
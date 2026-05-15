import type { DatumSlice } from '../_base/types';
export declare function useWaffleColors(count: number, colorScheme: unknown): string[];
export declare function useWaffleCellMap(data: readonly DatumSlice[], totalCells: number): number[];
export declare function useWaffleInteraction(onHover?: (datum: DatumSlice | null, index: number | null) => void, onSelect?: (datum: DatumSlice, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: DatumSlice, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: DatumSlice, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Waffle.hooks.d.ts.map
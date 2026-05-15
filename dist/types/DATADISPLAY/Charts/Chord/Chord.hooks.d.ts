import type { ChordRibbonInfo } from './Chord.types';
export declare function useChordColors(count: number, colorScheme: unknown): string[];
export declare function useChordInteraction(onHover?: (datum: ChordRibbonInfo | null, index: number | null) => void, onSelect?: (datum: ChordRibbonInfo, index: number) => void): {
    hoveredIndex: number | null;
    hoveredDatum: ChordRibbonInfo | null;
    handleEnter: (d: ChordRibbonInfo, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: ChordRibbonInfo, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Chord.hooks.d.ts.map
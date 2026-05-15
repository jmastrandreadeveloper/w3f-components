import type { DatumHierarchy } from '../_base/types';
export declare function usePackColors(leafCount: number, colorScheme: unknown): string[];
export declare function usePackInteraction(onHover?: (datum: DatumHierarchy | null, index: number | null) => void, onSelect?: (datum: DatumHierarchy, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: DatumHierarchy, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: DatumHierarchy, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Pack.hooks.d.ts.map
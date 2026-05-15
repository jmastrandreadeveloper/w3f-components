import type { DatumHierarchy } from '../_base/types';
export declare function useSunburstColors(count: number, colorScheme: unknown): string[];
export declare function useSunburstInteraction(onHover?: (datum: DatumHierarchy | null, index: number | null) => void, onSelect?: (datum: DatumHierarchy, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: DatumHierarchy, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: DatumHierarchy, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Sunburst.hooks.d.ts.map
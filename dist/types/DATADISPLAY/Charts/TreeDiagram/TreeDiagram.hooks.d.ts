import type { DatumHierarchy } from '../_base/types';
export declare function useTreeDiagramColors(count: number, colorScheme: unknown): string[];
export declare function useTreeDiagramInteraction(onHover?: (datum: DatumHierarchy | null, index: number | null) => void, onSelect?: (datum: DatumHierarchy, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: DatumHierarchy, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: DatumHierarchy, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=TreeDiagram.hooks.d.ts.map
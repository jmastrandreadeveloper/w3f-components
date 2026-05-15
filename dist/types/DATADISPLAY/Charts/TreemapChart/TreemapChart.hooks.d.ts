/**
 * Responsive chart sizing hook.
 */
export declare function useChartDimensions(containerRef: React.RefObject<HTMLDivElement | null>, propWidth?: number, propHeight?: number, defaultWidth?: number, defaultHeight?: number): {
    width: number;
    height: number;
};
export declare function useHoveredIndex(): {
    hoveredIndex: number | null;
    onEnter: (i: number) => void;
    onLeave: () => void;
};
//# sourceMappingURL=TreemapChart.hooks.d.ts.map
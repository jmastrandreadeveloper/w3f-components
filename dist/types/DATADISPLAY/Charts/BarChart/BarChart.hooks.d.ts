/**
 * Responsive chart sizing hook.
 * If explicit width/height are given, uses those.
 * Otherwise observes the container element for resize.
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
//# sourceMappingURL=BarChart.hooks.d.ts.map
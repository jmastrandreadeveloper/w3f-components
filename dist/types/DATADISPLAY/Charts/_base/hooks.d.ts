import type { ChartMargin, ColorSchemeName, InnerDims } from './types';
/**
 * Observe a ref'd element's box and return its current width.
 * Falls back to an explicit `propWidth` if provided.
 * The height is either `propHeight` or `defaultHeight` — charts are
 * normally width-responsive and height-fixed.
 */
export declare function useChartDimensions(containerRef: React.RefObject<HTMLDivElement | null>, propWidth?: number, propHeight?: number, defaultWidth?: number, defaultHeight?: number): {
    width: number;
    height: number;
};
/**
 * Memoize the `InnerDims` (outer size minus margin) for a chart.
 */
export declare function useInnerDims(width: number, height: number, margin: ChartMargin | undefined): InnerDims;
/**
 * Returns a color scale that maps an ordered list of keys to a palette.
 */
export declare function useColorScale<T extends string>(keys: readonly T[], scheme: ColorSchemeName | readonly string[] | undefined): import("d3-scale").ScaleOrdinal<T, string, never>;
/**
 * Tiny state machine for hover index tracking — re-used by most charts.
 */
export declare function useHoveredIndex(): {
    hoveredIndex: number | null;
    enter: (i: number) => void;
    leave: () => void;
};
/**
 * Stable ref factory that exposes the same ref API as `forwardRef`
 * without pulling `forwardRef` into every chart.
 */
export declare function useMergedRef<T>(externalRef: React.Ref<T> | undefined): React.RefObject<T | null>;
//# sourceMappingURL=hooks.d.ts.map
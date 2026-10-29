import type { ChartMargin, ColorSchemeName, InnerDims } from './types';
/** 0022 B47 (w3f-data-analysis): un gráfico dentro de una caja con esta clase usa todo el alto que la caja le deja
 *  (descontando la leyenda, los títulos de los ejes y lo demás que haya adentro): nunca desborda ni deja barra de
 *  desplazamiento (las tarjetas del tablero). Sin la clase, el alto es el de siempre (`height` o 300). */
export declare const CHART_FILL_CLASS = "w3f-chart-fill";
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
export declare function useInnerDims(width: number, height: number, margin: ChartMargin | undefined, axis?: {
    xLabelRotate?: number;
    plotAspect?: number;
    secondaryYFactor?: number;
    secondaryXFactor?: number;
    twinSeries?: string;
    labelWrap?: boolean;
}): InnerDims;
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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChartMargin, ColorSchemeName, InnerDims } from './types';
import { buildColorScale, computeInnerDims, resolveColorScheme } from './utils';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_MARGIN, DEFAULT_CHART_WIDTH } from './constants';

/**
 * Observe a ref'd element's box and return its current width.
 * Falls back to an explicit `propWidth` if provided.
 * The height is either `propHeight` or `defaultHeight` — charts are
 * normally width-responsive and height-fixed.
 */
export function useChartDimensions(
    containerRef: React.RefObject<HTMLDivElement | null>,
    propWidth?: number,
    propHeight?: number,
    defaultWidth: number = DEFAULT_CHART_WIDTH,
    defaultHeight: number = DEFAULT_CHART_HEIGHT,
) {
    const [dims, setDims] = useState(() => ({
        width: propWidth ?? defaultWidth,
        height: propHeight ?? defaultHeight,
    }));

    const recompute = useCallback(() => {
        if (propWidth && propHeight) return;
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setDims({
            width: propWidth ?? Math.max(rect.width, 100),
            height: propHeight ?? defaultHeight,
        });
    }, [propWidth, propHeight, defaultHeight, containerRef]);

    useEffect(() => {
        if (propWidth && propHeight) {
            setDims({ width: propWidth, height: propHeight });
            return;
        }
        recompute();
        const el = containerRef.current;
        if (!el || typeof ResizeObserver === 'undefined') return;
        const ro = new ResizeObserver(recompute);
        ro.observe(el);
        return () => ro.disconnect();
    }, [propWidth, propHeight, recompute, containerRef]);

    return dims;
}

/**
 * Memoize the `InnerDims` (outer size minus margin) for a chart.
 */
export function useInnerDims(
    width: number,
    height: number,
    margin: ChartMargin | undefined,
): InnerDims {
    return useMemo(
        () => computeInnerDims(width, height, margin ?? DEFAULT_CHART_MARGIN),
        [width, height, margin],
    );
}

/**
 * Returns a color scale that maps an ordered list of keys to a palette.
 */
export function useColorScale<T extends string>(
    keys: readonly T[],
    scheme: ColorSchemeName | readonly string[] | undefined,
) {
    return useMemo(() => {
        const palette = resolveColorScheme(scheme);
        return buildColorScale<T>(keys, palette);
    }, [keys, scheme]);
}

/**
 * Tiny state machine for hover index tracking — re-used by most charts.
 */
export function useHoveredIndex() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const enter = useCallback((i: number) => setHoveredIndex(i), []);
    const leave = useCallback(() => setHoveredIndex(null), []);
    return { hoveredIndex, enter, leave };
}

/**
 * Stable ref factory that exposes the same ref API as `forwardRef`
 * without pulling `forwardRef` into every chart.
 */
export function useMergedRef<T>(
    externalRef: React.Ref<T> | undefined,
): React.RefObject<T | null> {
    const internalRef = useRef<T | null>(null);
    useEffect(() => {
        if (!externalRef) return;
        if (typeof externalRef === 'function') {
            externalRef(internalRef.current);
        } else {
            (externalRef as React.MutableRefObject<T | null>).current = internalRef.current;
        }
    }, [externalRef]);
    return internalRef;
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildColorScale, computeInnerDims, resolveColorScheme } from "./utils";
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_MARGIN, DEFAULT_CHART_WIDTH } from "./constants";
function useChartDimensions(containerRef, propWidth, propHeight, defaultWidth = DEFAULT_CHART_WIDTH, defaultHeight = DEFAULT_CHART_HEIGHT) {
  const [dims, setDims] = useState(() => ({
    width: propWidth ?? defaultWidth,
    height: propHeight ?? defaultHeight
  }));
  const recompute = useCallback(() => {
    if (propWidth && propHeight) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDims({
      width: propWidth ?? Math.max(rect.width, 100),
      height: propHeight ?? defaultHeight
    });
  }, [propWidth, propHeight, defaultHeight, containerRef]);
  useEffect(() => {
    if (propWidth && propHeight) {
      setDims({ width: propWidth, height: propHeight });
      return;
    }
    recompute();
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [propWidth, propHeight, recompute, containerRef]);
  return dims;
}
function useInnerDims(width, height, margin) {
  return useMemo(
    () => computeInnerDims(width, height, margin ?? DEFAULT_CHART_MARGIN),
    [width, height, margin]
  );
}
function useColorScale(keys, scheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(scheme);
    return buildColorScale(keys, palette);
  }, [keys, scheme]);
}
function useHoveredIndex() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const enter = useCallback((i) => setHoveredIndex(i), []);
  const leave = useCallback(() => setHoveredIndex(null), []);
  return { hoveredIndex, enter, leave };
}
function useMergedRef(externalRef) {
  const internalRef = useRef(null);
  useEffect(() => {
    if (!externalRef) return;
    if (typeof externalRef === "function") {
      externalRef(internalRef.current);
    } else {
      externalRef.current = internalRef.current;
    }
  }, [externalRef]);
  return internalRef;
}
export {
  useChartDimensions,
  useColorScale,
  useHoveredIndex,
  useInnerDims,
  useMergedRef
};
//# sourceMappingURL=hooks.js.map

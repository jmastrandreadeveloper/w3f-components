import { useState, useEffect, useCallback } from 'react';

/**
 * Responsive chart sizing hook.
 */
export function useChartDimensions(
  containerRef: React.RefObject<HTMLDivElement | null>,
  propWidth?: number,
  propHeight?: number,
  defaultWidth = 300,
  defaultHeight = 200,
) {
  const [dimensions, setDimensions] = useState({
    width: propWidth ?? defaultWidth,
    height: propHeight ?? defaultHeight,
  });

  const updateDimensions = useCallback(() => {
    if (propWidth && propHeight) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDimensions({
      width: propWidth ?? Math.max(rect.width, 100),
      height: propHeight ?? defaultHeight,
    });
  }, [propWidth, propHeight, defaultWidth, defaultHeight, containerRef]);

  useEffect(() => {
    if (propWidth && propHeight) {
      setDimensions({ width: propWidth, height: propHeight });
      return;
    }
    updateDimensions();
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(updateDimensions);
    ro.observe(el);
    return () => ro.disconnect();
  }, [propWidth, propHeight, updateDimensions, containerRef]);

  return dimensions;
}

export function useHoveredIndex() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const onEnter = useCallback((i: number) => setHoveredIndex(i), []);
  const onLeave = useCallback(() => setHoveredIndex(null), []);
  return { hoveredIndex, onEnter, onLeave };
}

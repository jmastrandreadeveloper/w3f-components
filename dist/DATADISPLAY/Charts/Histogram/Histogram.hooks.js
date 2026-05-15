import { useMemo, useCallback } from "react";
import { computeBins, buildHistogramScales } from "./Histogram.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useHistogramBins(data, binCount, xDomain) {
  return useMemo(() => computeBins(data, binCount, xDomain), [data, binCount, xDomain]);
}
function useHistogramScales(bins, innerWidth, innerHeight) {
  return useMemo(
    () => buildHistogramScales(bins, innerWidth, innerHeight),
    [bins, innerWidth, innerHeight]
  );
}
function useHistogramColor(colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return palette[0];
  }, [colorScheme]);
}
function useHistogramInteraction(onHover, onSelect) {
  const { hoveredIndex, enter, leave } = useHoveredIndex();
  const handleEnter = useCallback((b, i) => {
    enter(i);
    onHover?.(b, i);
  }, [enter, onHover]);
  const handleLeave = useCallback(() => {
    leave();
    onHover?.(null, null);
  }, [leave, onHover]);
  const handleClick = useCallback((b, i) => {
    onSelect?.(b, i);
  }, [onSelect]);
  return { hoveredIndex, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useHistogramBins,
  useHistogramColor,
  useHistogramInteraction,
  useHistogramScales,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=Histogram.hooks.js.map

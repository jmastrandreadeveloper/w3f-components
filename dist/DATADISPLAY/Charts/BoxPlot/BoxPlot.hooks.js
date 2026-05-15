import { useMemo, useCallback } from "react";
import { computeStats, buildBoxPlotScales } from "./BoxPlot.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useBoxPlotStats(data) {
  return useMemo(() => data.map(computeStats), [data]);
}
function useBoxPlotScales(stats, innerWidth, innerHeight, yDomain) {
  return useMemo(
    () => buildBoxPlotScales(stats, innerWidth, innerHeight, yDomain),
    [stats, innerWidth, innerHeight, yDomain]
  );
}
function useBoxPlotColors(stats, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return stats.map((_, i) => palette[i % palette.length]);
  }, [stats, colorScheme]);
}
function useBoxPlotInteraction(onHover, onSelect) {
  const { hoveredIndex, enter, leave } = useHoveredIndex();
  const handleEnter = useCallback((d, i) => {
    enter(i);
    onHover?.(d, i);
  }, [enter, onHover]);
  const handleLeave = useCallback(() => {
    leave();
    onHover?.(null, null);
  }, [leave, onHover]);
  const handleClick = useCallback((d, i) => {
    onSelect?.(d, i);
  }, [onSelect]);
  return { hoveredIndex, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useBoxPlotColors,
  useBoxPlotInteraction,
  useBoxPlotScales,
  useBoxPlotStats,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=BoxPlot.hooks.js.map

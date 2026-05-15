import { useMemo, useCallback } from "react";
import { buildDotPlotScales, defaultGetX, defaultGetCategory } from "./DotPlot.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useDotPlotAccessors(getX, getCategory) {
  return useMemo(() => ({
    getX: getX ?? defaultGetX,
    getCategory: getCategory ?? defaultGetCategory
  }), [getX, getCategory]);
}
function useDotPlotScales(data, categories, innerWidth, innerHeight, getX, xDomain) {
  return useMemo(
    () => buildDotPlotScales(data, categories, innerWidth, innerHeight, getX, xDomain),
    [data, categories, innerWidth, innerHeight, getX, xDomain]
  );
}
function useDotPlotColors(categories, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return categories.map((_, i) => palette[i % palette.length]);
  }, [categories, colorScheme]);
}
function useDotPlotInteraction(onHover, onSelect) {
  const { hoveredIndex, enter, leave } = useHoveredIndex();
  const handleEnter = useCallback((datum, index) => {
    enter(index);
    onHover?.(datum, index);
  }, [enter, onHover]);
  const handleLeave = useCallback(() => {
    leave();
    onHover?.(null, null);
  }, [leave, onHover]);
  const handleClick = useCallback((datum, index) => {
    onSelect?.(datum, index);
  }, [onSelect]);
  return { hoveredIndex, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useDotPlotAccessors,
  useDotPlotColors,
  useDotPlotInteraction,
  useDotPlotScales,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=DotPlot.hooks.js.map

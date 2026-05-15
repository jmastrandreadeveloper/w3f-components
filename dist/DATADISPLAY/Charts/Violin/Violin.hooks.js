import { useMemo, useCallback } from "react";
import { buildViolinScales, kde } from "./Violin.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useViolinScales(data, innerWidth, innerHeight, yDomain) {
  return useMemo(
    () => buildViolinScales(data, innerWidth, innerHeight, yDomain),
    [data, innerWidth, innerHeight, yDomain]
  );
}
function useViolinKDE(data, yMin, yMax, resolution, bandwidth) {
  return useMemo(
    () => data.map((g) => kde(g.values, yMin, yMax, resolution, bandwidth)),
    [data, yMin, yMax, resolution, bandwidth]
  );
}
function useViolinColors(data, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return data.map((_, i) => palette[i % palette.length]);
  }, [data, colorScheme]);
}
function useViolinInteraction(onHover, onSelect) {
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
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useViolinColors,
  useViolinInteraction,
  useViolinKDE,
  useViolinScales
};
//# sourceMappingURL=Violin.hooks.js.map

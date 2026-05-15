import { useMemo, useCallback } from "react";
import { buildBubbleScales, defaultGetX, defaultGetY, defaultGetR, defaultGetLabel } from "./Bubble.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useBubbleAccessors(getX, getY, getR, getLabel) {
  return useMemo(() => ({
    getX: getX ?? defaultGetX,
    getY: getY ?? defaultGetY,
    getR: getR ?? defaultGetR,
    getLabel: getLabel ?? defaultGetLabel
  }), [getX, getY, getR, getLabel]);
}
function useBubbleScales(data, innerWidth, innerHeight, getX, getY, getR, minRadius, maxRadius, xDomain, yDomain) {
  return useMemo(
    () => buildBubbleScales(data, innerWidth, innerHeight, getX, getY, getR, minRadius, maxRadius, xDomain, yDomain),
    [data, innerWidth, innerHeight, getX, getY, getR, minRadius, maxRadius, xDomain, yDomain]
  );
}
function useBubbleColors(data, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return data.map((_, i) => palette[i % palette.length]);
  }, [data, colorScheme]);
}
function useBubbleInteraction(onHover, onSelect) {
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
  useBubbleAccessors,
  useBubbleColors,
  useBubbleInteraction,
  useBubbleScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=Bubble.hooks.js.map

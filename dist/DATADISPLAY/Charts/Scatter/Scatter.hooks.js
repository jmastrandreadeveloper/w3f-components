import { useMemo, useCallback } from "react";
import { buildScatterScales, defaultGetX, defaultGetY, defaultGetR, defaultGetLabel } from "./Scatter.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useScatterAccessors(getX, getY, getR, getLabel) {
  return useMemo(() => ({
    getX: getX ?? defaultGetX,
    getY: getY ?? defaultGetY,
    getR: getR ?? defaultGetR,
    getLabel: getLabel ?? defaultGetLabel
  }), [getX, getY, getR, getLabel]);
}
function useScatterScales(data, innerWidth, innerHeight, getX, getY, xDomain, yDomain) {
  return useMemo(
    () => buildScatterScales(data, innerWidth, innerHeight, getX, getY, xDomain, yDomain),
    [data, innerWidth, innerHeight, getX, getY, xDomain, yDomain]
  );
}
function useScatterColors(data, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return data.map((_, i) => palette[i % palette.length]);
  }, [data, colorScheme]);
}
function useScatterInteraction(onHover, onSelect) {
  const { hoveredIndex, enter, leave } = useHoveredIndex();
  const handleEnter = useCallback(
    (datum, index) => {
      enter(index);
      onHover?.(datum, index);
    },
    [enter, onHover]
  );
  const handleLeave = useCallback(() => {
    leave();
    onHover?.(null, null);
  }, [leave, onHover]);
  const handleClick = useCallback(
    (datum, index) => {
      onSelect?.(datum, index);
    },
    [onSelect]
  );
  return { hoveredIndex, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useScatterAccessors,
  useScatterColors,
  useScatterInteraction,
  useScatterScales
};
//# sourceMappingURL=Scatter.hooks.js.map

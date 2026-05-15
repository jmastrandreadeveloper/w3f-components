import { useMemo, useCallback } from "react";
import { BAR_H_DEFAULTS } from "./BarHorizontal.constants";
import { buildBarHScales, defaultGetLabel, defaultGetValue } from "./BarHorizontal.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useBarHAccessors(getLabel, getValue) {
  return useMemo(() => ({
    getLabel: getLabel ?? defaultGetLabel,
    getValue: getValue ?? defaultGetValue
  }), [getLabel, getValue]);
}
function useBarHScales(data, innerWidth, innerHeight, getLabel, getValue, padding = BAR_H_DEFAULTS.padding, xDomain) {
  return useMemo(
    () => buildBarHScales(data, innerWidth, innerHeight, getLabel, getValue, padding, xDomain),
    [data, innerWidth, innerHeight, getLabel, getValue, padding, xDomain]
  );
}
function useBarHColors(data, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return data.map((_, i) => palette[i % palette.length]);
  }, [data, colorScheme]);
}
function useBarHInteraction(onHover, onSelect) {
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
  useBarHAccessors,
  useBarHColors,
  useBarHInteraction,
  useBarHScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=BarHorizontal.hooks.js.map

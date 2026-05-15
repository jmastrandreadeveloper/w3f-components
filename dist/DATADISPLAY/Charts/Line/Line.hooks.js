import { useMemo, useCallback } from "react";
import { buildTimeScales, defaultGetDate, defaultGetValue } from "./Line.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useLineAccessors(getDate, getValue) {
  return useMemo(() => ({
    getDate: getDate ?? defaultGetDate,
    getValue: getValue ?? defaultGetValue
  }), [getDate, getValue]);
}
function useLineScales(data, innerWidth, innerHeight, getDate, getValue, yDomain) {
  return useMemo(
    () => buildTimeScales(data, innerWidth, innerHeight, getDate, getValue, yDomain),
    [data, innerWidth, innerHeight, getDate, getValue, yDomain]
  );
}
function useLineColor(colorScheme) {
  return useMemo(() => resolveColorScheme(colorScheme)[0], [colorScheme]);
}
function useLineInteraction(onHover, onSelect) {
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
  useInnerDims2 as useInnerDims,
  useLineAccessors,
  useLineColor,
  useLineInteraction,
  useLineScales
};
//# sourceMappingURL=Line.hooks.js.map

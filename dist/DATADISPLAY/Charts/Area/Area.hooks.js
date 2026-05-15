import { useMemo, useCallback } from "react";
import { buildAreaScales, defaultGetDate, defaultGetValue } from "./Area.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useAreaAccessors(getDate, getValue) {
  return useMemo(() => ({
    getDate: getDate ?? defaultGetDate,
    getValue: getValue ?? defaultGetValue
  }), [getDate, getValue]);
}
function useAreaScales(data, innerWidth, innerHeight, getDate, getValue, yDomain) {
  return useMemo(
    () => buildAreaScales(data, innerWidth, innerHeight, getDate, getValue, yDomain),
    [data, innerWidth, innerHeight, getDate, getValue, yDomain]
  );
}
function useAreaColor(colorScheme) {
  return useMemo(() => resolveColorScheme(colorScheme)[0], [colorScheme]);
}
function useAreaInteraction(onHover, onSelect) {
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
  useAreaAccessors,
  useAreaColor,
  useAreaInteraction,
  useAreaScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=Area.hooks.js.map

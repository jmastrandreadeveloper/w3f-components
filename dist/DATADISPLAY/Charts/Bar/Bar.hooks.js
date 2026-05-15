import { useMemo, useCallback } from "react";
import { BAR_DEFAULTS } from "./Bar.constants";
import { buildBarScales, defaultGetLabel, defaultGetValue } from "./Bar.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useBarAccessors(getLabel, getValue) {
  return useMemo(
    () => ({
      getLabel: getLabel ?? defaultGetLabel,
      getValue: getValue ?? defaultGetValue
    }),
    [getLabel, getValue]
  );
}
function useBarScales(data, innerWidth, innerHeight, getLabel, getValue, padding = BAR_DEFAULTS.padding, yDomain) {
  return useMemo(
    () => buildBarScales(data, innerWidth, innerHeight, getLabel, getValue, padding, yDomain),
    [data, innerWidth, innerHeight, getLabel, getValue, padding, yDomain]
  );
}
function useBarColors(data, getLabel, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return data.map((_, i) => palette[i % palette.length]);
  }, [data, colorScheme]);
}
function useBarInteraction(onHover, onSelect) {
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
  useBarAccessors,
  useBarColors,
  useBarInteraction,
  useBarScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=Bar.hooks.js.map

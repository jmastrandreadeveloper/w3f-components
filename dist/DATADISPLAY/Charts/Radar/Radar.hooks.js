import { useMemo, useCallback } from "react";
import { defaultGetLabel, defaultGetValue, buildRadarScale } from "./Radar.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useRadarAccessors(getLabel, getValue) {
  return useMemo(() => ({
    getLabel: getLabel ?? defaultGetLabel,
    getValue: getValue ?? defaultGetValue
  }), [getLabel, getValue]);
}
function useRadarScale(data, getValue, radius, maxValue) {
  return useMemo(() => {
    const max = maxValue ?? Math.max(...data.map(getValue), 1);
    return buildRadarScale(max, radius);
  }, [data, getValue, radius, maxValue]);
}
function useRadarColor(colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return palette[0];
  }, [colorScheme]);
}
function useRadarInteraction(onHover, onSelect) {
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
import { useChartDimensions } from "../_base/hooks";
export {
  useChartDimensions,
  useRadarAccessors,
  useRadarColor,
  useRadarInteraction,
  useRadarScale
};
//# sourceMappingURL=Radar.hooks.js.map

import { useMemo, useCallback } from "react";
import { buildThresholdScales, defaultGetDate, defaultGetValue0, defaultGetValue1 } from "./Threshold.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useThresholdAccessors(getDate, getValue0, getValue1) {
  return useMemo(() => ({
    getDate: getDate ?? defaultGetDate,
    getValue0: getValue0 ?? defaultGetValue0,
    getValue1: getValue1 ?? defaultGetValue1
  }), [getDate, getValue0, getValue1]);
}
function useThresholdScales(data, innerWidth, innerHeight, getDate, getValue0, getValue1, yDomain) {
  return useMemo(
    () => buildThresholdScales(data, innerWidth, innerHeight, getDate, getValue0, getValue1, yDomain),
    [data, innerWidth, innerHeight, getDate, getValue0, getValue1, yDomain]
  );
}
function useThresholdColors(aboveColor, belowColor, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return {
      above: aboveColor ?? palette[0],
      below: belowColor ?? palette[1],
      line0: aboveColor ?? palette[0],
      line1: belowColor ?? palette[1]
    };
  }, [aboveColor, belowColor, colorScheme]);
}
function useThresholdInteraction(onHover) {
  const { hoveredIndex, enter, leave } = useHoveredIndex();
  const handleEnter = useCallback((d, i) => {
    enter(i);
    onHover?.(d, i);
  }, [enter, onHover]);
  const handleLeave = useCallback(() => {
    leave();
    onHover?.(null, null);
  }, [leave, onHover]);
  return { hoveredIndex, handleEnter, handleLeave };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useThresholdAccessors,
  useThresholdColors,
  useThresholdInteraction,
  useThresholdScales
};
//# sourceMappingURL=Threshold.hooks.js.map

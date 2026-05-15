import { useMemo, useCallback } from "react";
import { defaultGetValue, defaultGetLabel, buildPieColors } from "./Pie.utils";
import { useHoveredIndex } from "../_base/hooks";
function usePieAccessors(getValue, getLabel) {
  return useMemo(() => ({
    getValue: getValue ?? defaultGetValue,
    getLabel: getLabel ?? defaultGetLabel
  }), [getValue, getLabel]);
}
function usePieColors(data, colorScheme) {
  return useMemo(() => buildPieColors(data, colorScheme), [data, colorScheme]);
}
function usePieInteraction(onHover, onSelect) {
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
  usePieAccessors,
  usePieColors,
  usePieInteraction
};
//# sourceMappingURL=Pie.hooks.js.map

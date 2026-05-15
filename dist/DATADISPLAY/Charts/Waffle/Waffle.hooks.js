import { useMemo, useCallback } from "react";
import { buildWaffleColors, buildCellMap } from "./Waffle.utils";
import { useHoveredIndex } from "../_base/hooks";
function useWaffleColors(count, colorScheme) {
  return useMemo(() => buildWaffleColors(count, colorScheme), [count, colorScheme]);
}
function useWaffleCellMap(data, totalCells) {
  return useMemo(() => buildCellMap(data, totalCells), [data, totalCells]);
}
function useWaffleInteraction(onHover, onSelect) {
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
  useWaffleCellMap,
  useWaffleColors,
  useWaffleInteraction
};
//# sourceMappingURL=Waffle.hooks.js.map

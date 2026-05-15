import { useMemo, useCallback } from "react";
import { buildPolarBarColors } from "./PolarBar.utils";
import { useHoveredIndex } from "../_base/hooks";
function usePolarBarColors(count, colorScheme) {
  return useMemo(() => buildPolarBarColors(count, colorScheme), [count, colorScheme]);
}
function usePolarBarInteraction(onHover, onSelect) {
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
  usePolarBarColors,
  usePolarBarInteraction
};
//# sourceMappingURL=PolarBar.hooks.js.map

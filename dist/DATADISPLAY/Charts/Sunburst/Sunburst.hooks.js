import { useMemo, useCallback } from "react";
import { buildSunburstColors } from "./Sunburst.utils";
import { useHoveredIndex } from "../_base/hooks";
function useSunburstColors(count, colorScheme) {
  return useMemo(() => buildSunburstColors(count, colorScheme), [count, colorScheme]);
}
function useSunburstInteraction(onHover, onSelect) {
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
  useSunburstColors,
  useSunburstInteraction
};
//# sourceMappingURL=Sunburst.hooks.js.map

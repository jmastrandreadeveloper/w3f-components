import { useMemo, useCallback } from "react";
import { buildPackColors } from "./Pack.utils";
import { useHoveredIndex } from "../_base/hooks";
function usePackColors(leafCount, colorScheme) {
  return useMemo(() => buildPackColors(leafCount, colorScheme), [leafCount, colorScheme]);
}
function usePackInteraction(onHover, onSelect) {
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
  usePackColors,
  usePackInteraction
};
//# sourceMappingURL=Pack.hooks.js.map

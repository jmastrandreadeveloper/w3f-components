import { useMemo, useCallback } from "react";
import { buildTreemapColors } from "./Treemap.utils";
import { useHoveredIndex } from "../_base/hooks";
function useTreemapColors(leafCount, colorScheme) {
  return useMemo(() => buildTreemapColors(leafCount, colorScheme), [leafCount, colorScheme]);
}
function useTreemapInteraction(onHover, onSelect) {
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
  useTreemapColors,
  useTreemapInteraction
};
//# sourceMappingURL=Treemap.hooks.js.map

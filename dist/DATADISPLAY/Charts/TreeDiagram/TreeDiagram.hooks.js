import { useMemo, useCallback } from "react";
import { buildTreeDiagramColors } from "./TreeDiagram.utils";
import { useHoveredIndex } from "../_base/hooks";
function useTreeDiagramColors(count, colorScheme) {
  return useMemo(() => buildTreeDiagramColors(count, colorScheme), [count, colorScheme]);
}
function useTreeDiagramInteraction(onHover, onSelect) {
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
  useTreeDiagramColors,
  useTreeDiagramInteraction
};
//# sourceMappingURL=TreeDiagram.hooks.js.map

import { useMemo, useCallback } from "react";
import { buildGanttColors } from "./Gantt.utils";
import { useHoveredIndex } from "../_base/hooks";
function useGanttColors(groups, colorScheme) {
  return useMemo(
    () => buildGanttColors(groups, colorScheme),
    [groups, colorScheme]
  );
}
function useGanttInteraction(onHover, onSelect) {
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
import { useChartDimensions, useInnerDims } from "../_base/hooks";
export {
  useChartDimensions,
  useGanttColors,
  useGanttInteraction,
  useInnerDims
};
//# sourceMappingURL=Gantt.hooks.js.map

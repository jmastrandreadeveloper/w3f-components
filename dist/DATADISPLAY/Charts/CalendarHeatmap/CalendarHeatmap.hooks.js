import { useMemo, useCallback, useState } from "react";
import { buildCalendarCells } from "./CalendarHeatmap.utils";
function useCalendarCells(data) {
  return useMemo(() => buildCalendarCells(data), [data]);
}
function useCalendarInteraction(onHover, onSelect) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleEnter = useCallback(
    (datum, index) => {
      setHoveredIndex(index);
      onHover?.(datum, index);
    },
    [onHover]
  );
  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
    onHover?.(null, null);
  }, [onHover]);
  const handleClick = useCallback(
    (datum, index) => {
      onSelect?.(datum, index);
    },
    [onSelect]
  );
  return { hoveredIndex, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions } from "../_base/hooks";
export {
  useCalendarCells,
  useCalendarInteraction,
  useChartDimensions
};
//# sourceMappingURL=CalendarHeatmap.hooks.js.map

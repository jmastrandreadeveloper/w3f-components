import { useMemo, useCallback } from "react";
import { buildWordCloudColors } from "./WordCloud.utils";
import { useHoveredIndex } from "../_base/hooks";
function useWordCloudColors(count, colorScheme) {
  return useMemo(() => buildWordCloudColors(count, colorScheme), [count, colorScheme]);
}
function useWordCloudInteraction(onHover, onSelect) {
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
  useWordCloudColors,
  useWordCloudInteraction
};
//# sourceMappingURL=WordCloud.hooks.js.map

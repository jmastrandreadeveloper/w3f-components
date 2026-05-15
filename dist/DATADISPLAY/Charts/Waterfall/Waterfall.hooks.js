import { useMemo, useCallback } from "react";
import { computeWaterfallBars, buildWaterfallScales } from "./Waterfall.utils";
import { useHoveredIndex } from "../_base/hooks";
function useWaterfallBars(data) {
  return useMemo(() => computeWaterfallBars(data), [data]);
}
function useWaterfallScales(bars, data, innerWidth, innerHeight) {
  return useMemo(
    () => buildWaterfallScales(bars, data, innerWidth, innerHeight),
    [bars, data, innerWidth, innerHeight]
  );
}
function useWaterfallInteraction(onHover, onSelect) {
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
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useWaterfallBars,
  useWaterfallInteraction,
  useWaterfallScales
};
//# sourceMappingURL=Waterfall.hooks.js.map

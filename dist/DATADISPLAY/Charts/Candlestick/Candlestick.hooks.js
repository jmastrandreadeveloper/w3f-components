import { useMemo, useCallback } from "react";
import { buildCandlestickScales } from "./Candlestick.utils";
import { useHoveredIndex } from "../_base/hooks";
function useCandlestickScales(data, innerWidth, innerHeight, volumeHeight) {
  return useMemo(
    () => buildCandlestickScales(data, innerWidth, innerHeight, volumeHeight),
    [data, innerWidth, innerHeight, volumeHeight]
  );
}
function useCandlestickInteraction(onHover, onSelect) {
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
  useCandlestickInteraction,
  useCandlestickScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=Candlestick.hooks.js.map

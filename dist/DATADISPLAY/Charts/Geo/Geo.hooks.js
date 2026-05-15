import { useMemo, useCallback } from "react";
import { buildGeoColorScale } from "./Geo.utils";
import { useHoveredIndex } from "../_base/hooks";
function useGeoColorScale(values, colorScheme) {
  return useMemo(() => {
    if (values.length === 0) return (_v) => "#ccc";
    const min = Math.min(...values);
    const max = Math.max(...values);
    return buildGeoColorScale(min, max, colorScheme);
  }, [values, colorScheme]);
}
function useGeoInteraction(onHover, onSelect) {
  const { hoveredIndex, enter, leave } = useHoveredIndex();
  const handleEnter = useCallback(
    (d, i) => {
      enter(i);
      onHover?.(d, i);
    },
    [enter, onHover]
  );
  const handleLeave = useCallback(
    () => {
      leave();
      onHover?.(null, null);
    },
    [leave, onHover]
  );
  const handleClick = useCallback(
    (d, i) => {
      onSelect?.(d, i);
    },
    [onSelect]
  );
  return { hoveredIndex, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions } from "../_base/hooks";
export {
  useChartDimensions,
  useGeoColorScale,
  useGeoInteraction
};
//# sourceMappingURL=Geo.hooks.js.map

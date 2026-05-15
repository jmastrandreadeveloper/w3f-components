import { useMemo, useCallback, useState } from "react";
import { buildMultiTimeScales } from "./LineMulti.utils";
import { resolveColorScheme } from "../_base/utils";
function useLineMultiScales(data, innerWidth, innerHeight) {
  return useMemo(() => buildMultiTimeScales(data, innerWidth, innerHeight), [data, innerWidth, innerHeight]);
}
function useLineMultiColors(seriesIds, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const map = {};
    seriesIds.forEach((id, i) => {
      map[id] = palette[i % palette.length];
    });
    return map;
  }, [seriesIds, colorScheme]);
}
function useLineMultiHover(onHover) {
  const [hovered, setHovered] = useState(null);
  const enter = useCallback((seriesId) => {
    setHovered(seriesId);
    onHover?.(seriesId, null);
  }, [onHover]);
  const leave = useCallback(() => {
    setHovered(null);
    onHover?.(null, null);
  }, [onHover]);
  return { hovered, enter, leave };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useLineMultiColors,
  useLineMultiHover,
  useLineMultiScales
};
//# sourceMappingURL=LineMulti.hooks.js.map

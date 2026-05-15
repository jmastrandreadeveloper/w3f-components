import { useMemo, useCallback, useState } from "react";
import { BAR_GROUPED_DEFAULTS } from "./BarGrouped.constants";
import { buildGroupedScales, defaultGetLabel } from "./BarGrouped.utils";
import { resolveColorScheme } from "../_base/utils";
function useBarGroupedAccessors(getLabel) {
  return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}
function useBarGroupedScales(data, keys, innerWidth, innerHeight, getLabel, padding = BAR_GROUPED_DEFAULTS.padding, yDomain) {
  return useMemo(
    () => buildGroupedScales(data, keys, innerWidth, innerHeight, getLabel, padding, yDomain),
    [data, keys, innerWidth, innerHeight, getLabel, padding, yDomain]
  );
}
function useBarGroupedColors(keys, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const map = {};
    keys.forEach((k, i) => {
      map[k] = palette[i % palette.length];
    });
    return map;
  }, [keys, colorScheme]);
}
function useBarGroupedInteraction(onHover, onSelect) {
  const [hovered, setHovered] = useState(null);
  const handleEnter = useCallback((datum, groupIdx, keyIdx) => {
    setHovered({ groupIdx, keyIdx });
    onHover?.(datum, groupIdx);
  }, [onHover]);
  const handleLeave = useCallback(() => {
    setHovered(null);
    onHover?.(null, null);
  }, [onHover]);
  const handleClick = useCallback((datum, groupIdx) => {
    onSelect?.(datum, groupIdx);
  }, [onSelect]);
  return { hovered, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useBarGroupedAccessors,
  useBarGroupedColors,
  useBarGroupedInteraction,
  useBarGroupedScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=BarGrouped.hooks.js.map

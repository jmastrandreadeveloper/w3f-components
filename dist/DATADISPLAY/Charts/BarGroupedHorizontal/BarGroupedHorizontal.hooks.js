import { useMemo, useCallback, useState } from "react";
import { BAR_GH_DEFAULTS } from "./BarGroupedHorizontal.constants";
import { buildGroupedHScales, defaultGetLabel } from "./BarGroupedHorizontal.utils";
import { resolveColorScheme } from "../_base/utils";
function useBarGHAccessors(getLabel) {
  return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}
function useBarGHScales(data, keys, innerWidth, innerHeight, getLabel, padding = BAR_GH_DEFAULTS.padding, xDomain) {
  return useMemo(
    () => buildGroupedHScales(data, keys, innerWidth, innerHeight, getLabel, padding, xDomain),
    [data, keys, innerWidth, innerHeight, getLabel, padding, xDomain]
  );
}
function useBarGHColors(keys, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const map = {};
    keys.forEach((k, i) => {
      map[k] = palette[i % palette.length];
    });
    return map;
  }, [keys, colorScheme]);
}
function useBarGHInteraction(onHover, onSelect) {
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
  useBarGHAccessors,
  useBarGHColors,
  useBarGHInteraction,
  useBarGHScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=BarGroupedHorizontal.hooks.js.map

import { useMemo, useCallback, useState } from "react";
import { BAR_SH_DEFAULTS } from "./BarStackedHorizontal.constants";
import { buildStackedHScales, computeStackH, defaultGetLabel } from "./BarStackedHorizontal.utils";
import { resolveColorScheme } from "../_base/utils";
function useBarSHAccessors(getLabel) {
  return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}
function useBarSHScales(data, keys, innerWidth, innerHeight, getLabel, padding = BAR_SH_DEFAULTS.padding) {
  return useMemo(
    () => buildStackedHScales(data, keys, innerWidth, innerHeight, getLabel, padding),
    [data, keys, innerWidth, innerHeight, getLabel, padding]
  );
}
function useStackHData(data, keys, getLabel) {
  return useMemo(() => computeStackH(data, keys, getLabel), [data, keys, getLabel]);
}
function useBarSHColors(keys, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const map = {};
    keys.forEach((k, i) => {
      map[k] = palette[i % palette.length];
    });
    return map;
  }, [keys, colorScheme]);
}
function useBarSHInteraction(onHover, onSelect) {
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
  useBarSHAccessors,
  useBarSHColors,
  useBarSHInteraction,
  useBarSHScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useStackHData
};
//# sourceMappingURL=BarStackedHorizontal.hooks.js.map

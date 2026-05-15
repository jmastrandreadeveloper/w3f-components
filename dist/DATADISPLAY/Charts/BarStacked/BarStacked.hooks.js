import { useMemo, useCallback, useState } from "react";
import { BAR_STACKED_DEFAULTS } from "./BarStacked.constants";
import { buildStackedScales, computeStack, defaultGetLabel } from "./BarStacked.utils";
import { resolveColorScheme } from "../_base/utils";
function useBarStackedAccessors(getLabel) {
  return useMemo(() => ({ getLabel: getLabel ?? defaultGetLabel }), [getLabel]);
}
function useBarStackedScales(data, keys, innerWidth, innerHeight, getLabel, padding = BAR_STACKED_DEFAULTS.padding) {
  return useMemo(
    () => buildStackedScales(data, keys, innerWidth, innerHeight, getLabel, padding),
    [data, keys, innerWidth, innerHeight, getLabel, padding]
  );
}
function useStackData(data, keys, getLabel) {
  return useMemo(() => computeStack(data, keys, getLabel), [data, keys, getLabel]);
}
function useBarStackedColors(keys, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const map = {};
    keys.forEach((k, i) => {
      map[k] = palette[i % palette.length];
    });
    return map;
  }, [keys, colorScheme]);
}
function useBarStackedInteraction(onHover, onSelect) {
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
  useBarStackedAccessors,
  useBarStackedColors,
  useBarStackedInteraction,
  useBarStackedScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useStackData
};
//# sourceMappingURL=BarStacked.hooks.js.map

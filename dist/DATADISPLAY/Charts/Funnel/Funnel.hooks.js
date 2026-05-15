import { useMemo, useCallback } from "react";
import { computeFunnelSegments } from "./Funnel.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useFunnelSegments(data, width, height, gap) {
  return useMemo(
    () => computeFunnelSegments(data, width, height, gap),
    [data, width, height, gap]
  );
}
function useFunnelColors(data, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    return data.map((_, i) => palette[i % palette.length]);
  }, [data, colorScheme]);
}
function useFunnelInteraction(onHover, onSelect) {
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
  useFunnelColors,
  useFunnelInteraction,
  useFunnelSegments,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=Funnel.hooks.js.map

import { useMemo, useCallback } from "react";
import { computeForceLayout } from "./Network.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useNetworkLayout(data, width, height, iterations) {
  return useMemo(
    () => computeForceLayout(data, width, height, iterations),
    [data, width, height, iterations]
  );
}
function useNetworkColors(nodes, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const groups = [...new Set(nodes.map((n) => n.group ?? n.id))];
    const groupMap = new Map(groups.map((g, i) => [g, palette[i % palette.length]]));
    return nodes.map((n) => groupMap.get(n.group ?? n.id) ?? palette[0]);
  }, [nodes, colorScheme]);
}
function useNetworkInteraction(onHover, onSelect) {
  const { hoveredIndex, enter, leave } = useHoveredIndex();
  const handleEnter = useCallback(
    (node, index) => {
      enter(index);
      onHover?.(node, index);
    },
    [enter, onHover]
  );
  const handleLeave = useCallback(() => {
    leave();
    onHover?.(null, null);
  }, [leave, onHover]);
  const handleClick = useCallback(
    (node, index) => {
      onSelect?.(node, index);
    },
    [onSelect]
  );
  return { hoveredIndex, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useNetworkColors,
  useNetworkInteraction,
  useNetworkLayout
};
//# sourceMappingURL=Network.hooks.js.map

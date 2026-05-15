import { useMemo, useCallback } from "react";
import { computeSankeyLayout } from "./Sankey.utils";
import { useHoveredIndex } from "../_base/hooks";
import { resolveColorScheme } from "../_base/utils";
function useSankeyLayout(data, width, height, nodeWidth, nodePadding) {
  return useMemo(
    () => computeSankeyLayout(data, width, height, nodeWidth, nodePadding),
    [data, width, height, nodeWidth, nodePadding]
  );
}
function useSankeyColors(nodes, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const groups = [...new Set(nodes.map((n) => n.group ?? n.id))];
    const groupMap = new Map(groups.map((g, i) => [g, palette[i % palette.length]]));
    return new Map(nodes.map((n) => [n.id, groupMap.get(n.group ?? n.id) ?? palette[0]]));
  }, [nodes, colorScheme]);
}
function useSankeyInteraction(onHover, onSelect) {
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
  useSankeyColors,
  useSankeyInteraction,
  useSankeyLayout
};
//# sourceMappingURL=Sankey.hooks.js.map

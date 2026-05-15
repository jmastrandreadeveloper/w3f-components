import { useMemo, useCallback } from "react";
import { extractAxes, buildHeatmapScales, defaultGetRow, defaultGetCol, defaultGetValue } from "./Heatmap.utils";
import { useHoveredIndex } from "../_base/hooks";
function useHeatmapAccessors(getRow, getCol, getValue) {
  return useMemo(() => ({
    getRow: getRow ?? defaultGetRow,
    getCol: getCol ?? defaultGetCol,
    getValue: getValue ?? defaultGetValue
  }), [getRow, getCol, getValue]);
}
function useHeatmapAxes(data, getRow, getCol) {
  return useMemo(() => extractAxes(data, getRow, getCol), [data, getRow, getCol]);
}
function useHeatmapScales(rows, cols, data, getValue, innerWidth, innerHeight, colorRange) {
  return useMemo(
    () => buildHeatmapScales(rows, cols, data, getValue, innerWidth, innerHeight, colorRange),
    [rows, cols, data, getValue, innerWidth, innerHeight, colorRange]
  );
}
function useHeatmapInteraction(onHover, onSelect) {
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
  useHeatmapAccessors,
  useHeatmapAxes,
  useHeatmapInteraction,
  useHeatmapScales,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=Heatmap.hooks.js.map

import { useMemo, useState, useCallback } from "react";
import { buildSparklineScales } from "./Sparkline.utils";
function useSparklineScales(data, width, height) {
  return useMemo(
    () => buildSparklineScales(data, width, height),
    [data, width, height]
  );
}
function useSparklineHover(onHover) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMove = useCallback(
    (index, datum) => {
      setHoveredIndex(index);
      onHover?.(datum, index);
    },
    [onHover]
  );
  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
    onHover?.(null, null);
  }, [onHover]);
  return { hoveredIndex, handleMove, handleLeave };
}
import { useChartDimensions } from "../_base/hooks";
export {
  useChartDimensions,
  useSparklineHover,
  useSparklineScales
};
//# sourceMappingURL=Sparkline.hooks.js.map

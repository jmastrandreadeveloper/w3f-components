import { useMemo, useCallback, useState } from "react";
import { buildChordColors } from "./Chord.utils";
function useChordColors(count, colorScheme) {
  return useMemo(() => buildChordColors(count, colorScheme), [count, colorScheme]);
}
function useChordInteraction(onHover, onSelect) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredDatum, setHoveredDatum] = useState(null);
  const handleEnter = useCallback((d, i) => {
    setHoveredIndex(i);
    setHoveredDatum(d);
    onHover?.(d, i);
  }, [onHover]);
  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
    setHoveredDatum(null);
    onHover?.(null, null);
  }, [onHover]);
  const handleClick = useCallback((d, i) => {
    onSelect?.(d, i);
  }, [onSelect]);
  return { hoveredIndex, hoveredDatum, handleEnter, handleLeave, handleClick };
}
import { useChartDimensions } from "../_base/hooks";
export {
  useChartDimensions,
  useChordColors,
  useChordInteraction
};
//# sourceMappingURL=Chord.hooks.js.map

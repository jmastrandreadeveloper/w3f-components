import { useCallback } from "react";
import { useHoveredIndex } from "../_base/hooks";
function useBulletInteraction(onHover, onSelect) {
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
import { useChartDimensions } from "../_base/hooks";
export {
  useBulletInteraction,
  useChartDimensions
};
//# sourceMappingURL=Bullet.hooks.js.map

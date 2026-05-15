import { useState, useCallback, useEffect, useRef } from "react";
const useTooltipVisibility = (showDelay, hideDelay) => {
  const [isVisible, setIsVisible] = useState(false);
  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const handleMouseEnter = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    showTimerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);
  }, [showDelay]);
  const handleMouseLeave = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  }, [hideDelay]);
  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);
  return { isVisible, handleMouseEnter, handleMouseLeave };
};
export {
  useTooltipVisibility
};
//# sourceMappingURL=Tooltip.hooks.js.map

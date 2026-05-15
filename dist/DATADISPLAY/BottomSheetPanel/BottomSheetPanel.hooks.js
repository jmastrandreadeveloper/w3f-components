import { useState, useEffect, useCallback, useRef } from "react";
function useBottomSheetAnimation(isOpen) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const previousFocusRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      previousFocusRef.current = document.activeElement;
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (previousFocusRef.current && previousFocusRef.current.focus) {
          previousFocusRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  return { isAnimating, shouldRender };
}
function useScrollLock(isOpen) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}
function useEscapeKey(isOpen, onClose, enabled) {
  const handleEscape = useCallback((e) => {
    if (enabled && e.key === "Escape" && isOpen) {
      onClose();
    }
  }, [isOpen, onClose, enabled]);
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);
}
export {
  useBottomSheetAnimation,
  useEscapeKey,
  useScrollLock
};
//# sourceMappingURL=BottomSheetPanel.hooks.js.map

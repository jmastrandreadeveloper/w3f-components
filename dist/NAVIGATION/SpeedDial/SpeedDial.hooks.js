import { useState, useCallback, useEffect, useRef } from "react";
import { HOVER_CLOSE_DELAY } from "./SpeedDial.constants";
function useSpeedDialOpen(openProp, defaultOpen, onOpen, onClose) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== void 0;
  const isOpen = isControlled ? openProp : internalOpen;
  const handleOpen = useCallback(
    (event, reason) => {
      if (!isControlled) setInternalOpen(true);
      if (onOpen) onOpen(event, reason);
    },
    [isControlled, onOpen]
  );
  const handleClose = useCallback(
    (event, reason) => {
      if (!isControlled) setInternalOpen(false);
      if (onClose) onClose(event, reason);
    },
    [isControlled, onClose]
  );
  const handleToggle = useCallback(
    (event) => {
      if (isOpen) {
        handleClose(event, "toggle");
      } else {
        handleOpen(event, "toggle");
      }
    },
    [isOpen, handleClose, handleOpen]
  );
  const handleActionClick = useCallback(
    (event) => {
      handleClose(event, "toggle");
    },
    [handleClose]
  );
  return { isOpen, handleOpen, handleClose, handleToggle, handleActionClick };
}
function useSpeedDialHover(openOnHover, handleOpen, handleClose, containerRef) {
  const hoverTimerRef = useRef(null);
  const handleMouseEnter = useCallback(
    (event) => {
      if (!openOnHover) return;
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      handleOpen(event, "hover");
    },
    [openOnHover, handleOpen]
  );
  const handleMouseLeave = useCallback(
    (event) => {
      if (!openOnHover) return;
      hoverTimerRef.current = setTimeout(() => {
        handleClose(event, "hover");
      }, HOVER_CLOSE_DELAY);
    },
    [openOnHover, handleClose]
  );
  const handleFocus = useCallback(
    (event) => {
      if (openOnHover) handleOpen(event, "focus");
    },
    [openOnHover, handleOpen]
  );
  const handleBlur = useCallback(
    (event) => {
      if (openOnHover && containerRef.current && !containerRef.current.contains(event.relatedTarget)) {
        handleClose(event, "blur");
      }
    },
    [openOnHover, handleClose, containerRef]
  );
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);
  return { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur };
}
function useSpeedDialEscKey(isOpen, handleClose) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose(event, "escapeKeyDown");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);
}
export {
  useSpeedDialEscKey,
  useSpeedDialHover,
  useSpeedDialOpen
};
//# sourceMappingURL=SpeedDial.hooks.js.map

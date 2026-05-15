import { useState, useEffect } from "react";
import { DRAWER_DEFAULTS } from "./Drawer.constants";
function useDrawerAnimation(open, variant) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      if (variant === "temporary") {
        const timer = setTimeout(
          () => setMounted(false),
          DRAWER_DEFAULTS.animationDuration
        );
        return () => clearTimeout(timer);
      }
    }
  }, [open, variant]);
  return { mounted, visible };
}
function useDrawerEscKey(open, closeOnEsc, variant, onClose) {
  useEffect(() => {
    if (!open || !closeOnEsc || variant === "permanent") return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) onClose(e, "escapeKeyDown");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, onClose, variant]);
}
function useDrawerBodyScroll(open, variant) {
  useEffect(() => {
    if (variant !== "temporary") return;
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open, variant]);
}
function useDrawerFocusTrap(open, variant, drawerRef) {
  useEffect(() => {
    if (!open || variant !== "temporary" || !drawerRef.current) return;
    const prev = document.activeElement;
    drawerRef.current.focus();
    return () => {
      if (prev?.focus) prev.focus();
    };
  }, [open, variant, drawerRef]);
}
export {
  useDrawerAnimation,
  useDrawerBodyScroll,
  useDrawerEscKey,
  useDrawerFocusTrap
};
//# sourceMappingURL=Drawer.hooks.js.map

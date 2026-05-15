import { useState, useCallback, useRef, useEffect } from "react";
import { SUBMENU_CLOSE_DELAY } from "./Menu.constants";
function useMenuOpen() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);
  return { isOpen, toggle, close, containerRef };
}
function useMenuItemSubmenu() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const timeoutRef = useRef(null);
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowSubmenu(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setShowSubmenu(false), SUBMENU_CLOSE_DELAY);
  }, []);
  return { showSubmenu, setShowSubmenu, handleMouseEnter, handleMouseLeave };
}
export {
  useMenuItemSubmenu,
  useMenuOpen
};
//# sourceMappingURL=Menu.hooks.js.map

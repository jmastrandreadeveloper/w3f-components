import { useState, useCallback, useEffect, useRef } from "react";
function useContextMenu(wrapperRef) {
  const [menuState, setMenuState] = useState({
    visible: false,
    x: 0,
    y: 0
  });
  const menuRef = useRef(null);
  const showMenu = useCallback((x, y) => {
    setMenuState({ visible: true, x, y });
  }, []);
  const hideMenu = useCallback(() => {
    setMenuState((prev) => ({ ...prev, visible: false }));
  }, []);
  useEffect(() => {
    if (!menuState.visible) return;
    const handleClose = (e) => {
      if (e.key === "Escape") {
        hideMenu();
        return;
      }
      const target = e.target;
      if (e.type === "click" && !menuRef.current?.contains(target)) {
        hideMenu();
        return;
      }
      if (e.type === "contextmenu" && !menuRef.current?.contains(target) && !wrapperRef?.current?.contains(target)) {
        hideMenu();
      }
    };
    document.addEventListener("click", handleClose);
    document.addEventListener("contextmenu", handleClose);
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
      document.removeEventListener("contextmenu", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, [menuState.visible, hideMenu, wrapperRef]);
  return { menuState, menuRef, showMenu, hideMenu };
}
function useContextMenuItemSubmenu(hasSubItems) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const timeoutRef = useRef(null);
  const itemRef = useRef(null);
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hasSubItems) setShowSubmenu(true);
  }, [hasSubItems]);
  const handleMouseLeave = useCallback(() => {
    if (hasSubItems) {
      timeoutRef.current = setTimeout(() => setShowSubmenu(false), 200);
    }
  }, [hasSubItems]);
  return { showSubmenu, setShowSubmenu, itemRef, handleMouseEnter, handleMouseLeave };
}
export {
  useContextMenu,
  useContextMenuItemSubmenu
};
//# sourceMappingURL=ContextMenu.hooks.js.map

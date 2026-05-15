"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useCallback, useEffect, useState } from "react";
import Button from "../../INPUTS/Button/Button";
import { CONTEXT_MENU_CLASSES, CONTEXT_MENU_DEFAULTS, SUBMENU_CLOSE_DELAY } from "./ContextMenu.constants";
import { calculateMenuPosition, calculateSubmenuPosition, buildContextMenuClasses } from "./ContextMenu.utils";
import { useContextMenu } from "./ContextMenu.hooks";
const ContextMenuItem = ({
  item,
  onClose,
  onSelect,
  level = 0,
  path = []
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPos, setSubmenuPos] = useState({
    left: "100%",
    top: 0
  });
  const timeoutRef = useRef(null);
  const itemRef = useRef(null);
  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
  const recalcSubmenu = useCallback(() => {
    if (!itemRef.current || !hasSubItems) return;
    const rect = itemRef.current.getBoundingClientRect();
    const pos = calculateSubmenuPosition(rect, item.subItems?.length ?? 0);
    setSubmenuPos(pos);
  }, [hasSubItems, item.subItems]);
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hasSubItems) {
      setShowSubmenu(true);
      setTimeout(recalcSubmenu, 0);
    }
  };
  const handleMouseLeave = () => {
    if (hasSubItems) {
      timeoutRef.current = setTimeout(() => setShowSubmenu(false), SUBMENU_CLOSE_DELAY);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (hasSubItems) {
      setShowSubmenu((prev) => !prev);
      recalcSubmenu();
    } else {
      const navData = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        selectedItem: {
          label: item.label,
          link: item.link ?? null,
          hasSubItems: false
        },
        navigationPath: path,
        level
      };
      if (onSelect) onSelect(navData);
      if (item.onClick) item.onClick(navData);
      onClose();
    }
  };
  useEffect(() => {
    if (showSubmenu && hasSubItems) recalcSubmenu();
  }, [showSubmenu, hasSubItems, recalcSubmenu]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: itemRef,
      className: [
        CONTEXT_MENU_CLASSES.item,
        showSubmenu && CONTEXT_MENU_CLASSES.isActive
      ].filter(Boolean).join(" "),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: { position: "relative" },
      children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: [
              CONTEXT_MENU_CLASSES.button,
              hasSubItems ? CONTEXT_MENU_CLASSES.buttonParent : CONTEXT_MENU_CLASSES.buttonLeaf
            ].filter(Boolean).join(" "),
            onClick: handleClick,
            variant: "text",
            style: {
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              justifyContent: "flex-start",
              padding: "8px 12px",
              height: "auto",
              textTransform: "none"
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: CONTEXT_MENU_CLASSES.label, style: { flex: 1 }, children: item.label }),
              hasSubItems && /* @__PURE__ */ jsx("span", { className: CONTEXT_MENU_CLASSES.arrow, children: "\u25B8" })
            ]
          }
        ),
        hasSubItems && showSubmenu && /* @__PURE__ */ jsx(
          "div",
          {
            className: CONTEXT_MENU_CLASSES.submenu,
            style: {
              display: "block",
              position: "absolute",
              left: submenuPos.left,
              top: submenuPos.top,
              overflow: "visible"
            },
            children: item.subItems.map((subItem, index) => /* @__PURE__ */ jsx(
              ContextMenuItem,
              {
                item: subItem,
                onClose,
                onSelect,
                level: level + 1,
                path: [...path, index]
              },
              subItem.id ?? index
            ))
          }
        )
      ]
    }
  );
};
ContextMenuItem.displayName = "ContextMenuItem";
const ContextMenu = forwardRef(({
  children,
  items,
  onMenuAction,
  unstyled = CONTEXT_MENU_DEFAULTS.unstyled,
  className = CONTEXT_MENU_DEFAULTS.className
}, ref) => {
  const wrapperRef = useRef(null);
  const { menuState, menuRef, showMenu, hideMenu } = useContextMenu(wrapperRef);
  const handleContextMenu = (e) => {
    e.preventDefault();
    const pos = calculateMenuPosition(e.clientX, e.clientY);
    showMenu(pos.x, pos.y);
  };
  return /* @__PURE__ */ jsxs("div", { ref: (node) => {
    wrapperRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, onContextMenu: handleContextMenu, className: buildContextMenuClasses(className, unstyled), style: { position: "relative" }, children: [
    children,
    menuState.visible && /* @__PURE__ */ jsx(
      "div",
      {
        ref: menuRef,
        className: CONTEXT_MENU_CLASSES.dropdown,
        style: { position: "fixed", left: menuState.x, top: menuState.y },
        children: items.map((item, index) => /* @__PURE__ */ jsx(
          ContextMenuItem,
          {
            item,
            onClose: hideMenu,
            onSelect: onMenuAction,
            path: [index]
          },
          item.id ?? index
        ))
      }
    )
  ] });
});
ContextMenu.displayName = "ContextMenu";
var ContextMenu_default = ContextMenu;
export {
  ContextMenu,
  ContextMenuItem,
  ContextMenu_default as default
};
//# sourceMappingURL=ContextMenu.js.map

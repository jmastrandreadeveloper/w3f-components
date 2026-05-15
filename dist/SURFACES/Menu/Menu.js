"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useEffect } from "react";
import Button from "../../INPUTS/Button/Button";
import { MENU_CLASSES, MENU_BAR_CATEGORY_DEFAULTS } from "./Menu.constants";
import { buildDropdownClasses, buildMenuClasses } from "./Menu.utils";
import { useMenuOpen, useMenuItemSubmenu } from "./Menu.hooks";
const MenuItem = ({ item, onClose, onSelect }) => {
  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
  const { showSubmenu, setShowSubmenu, handleMouseEnter, handleMouseLeave } = useMenuItemSubmenu();
  const handleClick = (e) => {
    e.stopPropagation();
    if (hasSubItems) {
      setShowSubmenu((prev) => !prev);
    } else {
      if (onSelect) onSelect(item.label);
      if (item.onClick) item.onClick(item.label);
      onClose();
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [MENU_CLASSES.item, showSubmenu && MENU_CLASSES.isActive].filter(Boolean).join(" "),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: { position: "relative" },
      children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: [
              MENU_CLASSES.button,
              hasSubItems ? MENU_CLASSES.buttonParent : MENU_CLASSES.buttonLeaf
            ].filter(Boolean).join(" "),
            onClick: handleClick,
            variant: "none",
            children: [
              /* @__PURE__ */ jsx("span", { className: MENU_CLASSES.label, children: item.label }),
              hasSubItems && /* @__PURE__ */ jsx("span", { className: MENU_CLASSES.arrow, children: "\u25B8" })
            ]
          }
        ),
        hasSubItems && showSubmenu && /* @__PURE__ */ jsx(
          "div",
          {
            className: MENU_CLASSES.submenu,
            style: {
              display: "block",
              position: "absolute",
              left: "100%",
              top: 0,
              overflow: "visible"
            },
            children: item.subItems.map((subItem, index) => /* @__PURE__ */ jsx(
              MenuItem,
              {
                item: subItem,
                onClose,
                onSelect
              },
              subItem.id ?? index
            ))
          }
        )
      ]
    }
  );
};
MenuItem.displayName = "MenuItem";
const MenuBarCategory = forwardRef(({
  label,
  items,
  onSelect,
  position = MENU_BAR_CATEGORY_DEFAULTS.position,
  unstyled = MENU_BAR_CATEGORY_DEFAULTS.unstyled
}, ref) => {
  const { isOpen, toggle, close, containerRef } = useMenuOpen();
  const dropdownCls = buildDropdownClasses(position);
  const containerCls = buildMenuClasses(position, void 0, unstyled);
  const [anchorRect, setAnchorRect] = useState(null);
  useEffect(() => {
    if (isOpen && containerRef.current) {
      setAnchorRect(containerRef.current.getBoundingClientRect());
    }
  }, [isOpen, containerRef]);
  const DROPDOWN_MIN_WIDTH = 200;
  const dropdownStyle = isOpen && anchorRect ? {
    display: "block",
    overflow: "visible",
    position: "fixed",
    top: position === "top" ? anchorRect.top - 4 : anchorRect.bottom + 4,
    left: position === "right" ? Math.max(0, anchorRect.right - DROPDOWN_MIN_WIDTH) : position === "center" ? anchorRect.left + anchorRect.width / 2 : anchorRect.left,
    transform: position === "center" ? "translateX(-50%)" : void 0
  } : { display: "block", overflow: "visible" };
  return /* @__PURE__ */ jsxs("div", { className: containerCls, ref: (node) => {
    containerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        className: [MENU_CLASSES.trigger, isOpen && MENU_CLASSES.isActive].filter(Boolean).join(" "),
        onClick: toggle,
        variant: "none",
        children: label
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: dropdownCls, style: dropdownStyle, children: items.map((item, index) => /* @__PURE__ */ jsx(
      MenuItem,
      {
        item,
        onClose: close,
        onSelect
      },
      item.id ?? index
    )) })
  ] });
});
MenuBarCategory.displayName = "MenuBarCategory";
var Menu_default = MenuBarCategory;
export {
  MenuBarCategory,
  MenuItem,
  Menu_default as default
};
//# sourceMappingURL=Menu.js.map

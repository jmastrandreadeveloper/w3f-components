import { MENU_WIDTH, CONTEXT_MENU_CLASSES } from "./ContextMenu.constants";
function calculateMenuPosition(clientX, clientY) {
  let x = clientX;
  const y = clientY;
  if (x + MENU_WIDTH > window.innerWidth) x -= MENU_WIDTH;
  return { x, y };
}
function calculateSubmenuPosition(itemRect, subItemCount) {
  const submenuWidth = MENU_WIDTH;
  const submenuHeight = subItemCount * 40;
  let left = "100%";
  let top = 0;
  if (itemRect.right + submenuWidth > window.innerWidth) {
    left = "-100%";
  }
  if (itemRect.top + submenuHeight > window.innerHeight) {
    top = -(submenuHeight - itemRect.height);
    if (itemRect.top + top < 0) {
      top = -itemRect.top + 10;
    }
  }
  return { left, top };
}
function buildContextMenuClasses(className, unstyled) {
  const base = CONTEXT_MENU_CLASSES.wrapper;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
export {
  buildContextMenuClasses,
  calculateMenuPosition,
  calculateSubmenuPosition
};
//# sourceMappingURL=ContextMenu.utils.js.map

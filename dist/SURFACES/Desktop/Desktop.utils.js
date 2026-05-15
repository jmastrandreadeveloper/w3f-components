import { BASE_Z_INDEX, DESKTOP_CLASSES } from "./Desktop.constants";
function getWindowZIndex(windowOrder, key) {
  const index = windowOrder.indexOf(key);
  return index !== -1 ? BASE_Z_INDEX + index : BASE_Z_INDEX;
}
function bringToFront(order, key) {
  if (order[order.length - 1] === key) return order;
  return [...order.filter((k) => k !== key), key];
}
function syncWindowOrder(prevOrder, currentKeys) {
  const filtered = prevOrder.filter((key) => currentKeys.includes(key));
  currentKeys.forEach((key) => {
    if (!filtered.includes(key)) filtered.push(key);
  });
  return filtered;
}
function buildDesktopClasses(className, unstyled) {
  const base = DESKTOP_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
export {
  bringToFront,
  buildDesktopClasses,
  getWindowZIndex,
  syncWindowOrder
};
//# sourceMappingURL=Desktop.utils.js.map

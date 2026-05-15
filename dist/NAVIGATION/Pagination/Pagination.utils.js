import { PAGINATION_CLASSES } from "./Pagination.constants";
function range(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}
function buildPages(count, current, siblingCount, boundaryCount) {
  const totalSlots = boundaryCount * 2 + siblingCount * 2 + 3;
  if (count <= totalSlots) return range(1, count);
  const leftBound = Math.max(current - siblingCount, boundaryCount + 2);
  const rightBound = Math.min(current + siblingCount, count - boundaryCount - 1);
  const showLeftEllipsis = leftBound > boundaryCount + 2;
  const showRightEllipsis = rightBound < count - boundaryCount - 1;
  const items = [];
  for (let i = 1; i <= Math.min(boundaryCount, count); i++) items.push(i);
  if (showLeftEllipsis) {
    items.push("ellipsis-left");
  } else {
    for (let i = boundaryCount + 1; i < leftBound; i++) items.push(i);
  }
  for (let i = leftBound; i <= rightBound; i++) items.push(i);
  if (showRightEllipsis) {
    items.push("ellipsis-right");
  } else {
    for (let i = rightBound + 1; i <= count - boundaryCount; i++) items.push(i);
  }
  for (let i = Math.max(count - boundaryCount + 1, rightBound + 1); i <= count; i++)
    items.push(i);
  return items;
}
function buildPaginationClasses(variant, shape, size, color, disabled, className, unstyled) {
  if (unstyled) {
    return [PAGINATION_CLASSES.nav, "w3f-pagination--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    PAGINATION_CLASSES.nav,
    `w3f-pagination--${variant}`,
    `w3f-pagination--${shape}`,
    `w3f-pagination--${size}`,
    `w3f-pagination--${color}`,
    disabled && "w3f-pagination--disabled",
    className
  ].filter(Boolean).join(" ");
}
function buildPageItemClasses(isActive) {
  return [
    PAGINATION_CLASSES.item,
    PAGINATION_CLASSES.page,
    isActive && PAGINATION_CLASSES.pageActive
  ].filter(Boolean).join(" ");
}
export {
  buildPageItemClasses,
  buildPages,
  buildPaginationClasses,
  range
};
//# sourceMappingURL=Pagination.utils.js.map

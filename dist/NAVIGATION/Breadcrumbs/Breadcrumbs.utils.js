import { BREADCRUMBS_CLASSES, BREADCRUMBS_VARIANT_CLASSES, ELLIPSIS_KEY } from "./Breadcrumbs.constants";
function buildBreadcrumbsClasses(size, color, className, unstyled, variant) {
  if (unstyled) {
    return [BREADCRUMBS_CLASSES.nav, "w3f-breadcrumbs--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    BREADCRUMBS_CLASSES.nav,
    `w3f-breadcrumbs--${size}`,
    color !== "default" && `w3f-breadcrumbs--${color}`,
    variant && BREADCRUMBS_VARIANT_CLASSES[variant],
    className
  ].filter(Boolean).join(" ");
}
function buildBreadcrumbItemClasses(active, disabled, className) {
  return [
    BREADCRUMBS_CLASSES.crumb,
    active && BREADCRUMBS_CLASSES.crumbActive,
    disabled && BREADCRUMBS_CLASSES.crumbDisabled,
    className
  ].filter(Boolean).join(" ");
}
function computeVisibleItems(items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse) {
  const shouldCollapse = maxItems > 0 && items.length > maxItems && !expanded;
  if (!shouldCollapse) return items;
  const before = items.slice(0, itemsBeforeCollapse);
  const after = items.slice(items.length - itemsAfterCollapse);
  return [...before, ELLIPSIS_KEY, ...after];
}
export {
  buildBreadcrumbItemClasses,
  buildBreadcrumbsClasses,
  computeVisibleItems
};
//# sourceMappingURL=Breadcrumbs.utils.js.map

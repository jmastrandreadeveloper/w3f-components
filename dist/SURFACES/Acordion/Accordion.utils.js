import { ACCORDION_CLASSES } from "./Accordion.constants";
function buildAccordionClasses(variant, size, className, unstyled) {
  if (unstyled) {
    return [ACCORDION_CLASSES.container, "w3f-accordion--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    ACCORDION_CLASSES.container,
    variant === "outlined" && ACCORDION_CLASSES.outlined,
    variant === "borderless" && ACCORDION_CLASSES.borderless,
    variant === "elevated" && ACCORDION_CLASSES.elevated,
    size === "sm" && ACCORDION_CLASSES.sm,
    size === "lg" && ACCORDION_CLASSES.lg,
    className
  ].filter(Boolean).join(" ");
}
function buildAccordionItemClasses(disabled, color, className) {
  return [
    ACCORDION_CLASSES.item,
    disabled && ACCORDION_CLASSES.itemDisabled,
    color && `w3f-accordion-item-${color}`,
    className
  ].filter(Boolean).join(" ");
}
function buildContentContainerClasses(isExpanded) {
  return [
    ACCORDION_CLASSES.contentContainer,
    isExpanded && ACCORDION_CLASSES.contentShow
  ].filter(Boolean).join(" ");
}
export {
  buildAccordionClasses,
  buildAccordionItemClasses,
  buildContentContainerClasses
};
//# sourceMappingURL=Accordion.utils.js.map

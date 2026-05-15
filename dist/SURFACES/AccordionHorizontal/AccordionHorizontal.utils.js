import { ACCORDION_H_CLASSES } from "./AccordionHorizontal.constants";
function buildAccordionHClasses(variant, size, className, unstyled) {
  const base = ACCORDION_H_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    variant === "outlined" && ACCORDION_H_CLASSES.outlined,
    variant === "elevated" && ACCORDION_H_CLASSES.elevated,
    variant === "borderless" && ACCORDION_H_CLASSES.borderless,
    size === "sm" && ACCORDION_H_CLASSES.sm,
    size === "lg" && ACCORDION_H_CLASSES.lg,
    className
  ].filter(Boolean).join(" ");
}
function buildAccordionItemHClasses(isExpanded, disabled, color, className) {
  return [
    ACCORDION_H_CLASSES.item,
    isExpanded && ACCORDION_H_CLASSES.itemExpanded,
    disabled && ACCORDION_H_CLASSES.itemDisabled,
    color && `w3f-color-${color}`,
    className
  ].filter(Boolean).join(" ");
}
function buildAccordionHContentClasses(isExpanded) {
  return [
    ACCORDION_H_CLASSES.contentContainer,
    isExpanded && ACCORDION_H_CLASSES.contentShow
  ].filter(Boolean).join(" ");
}
export {
  buildAccordionHClasses,
  buildAccordionHContentClasses,
  buildAccordionItemHClasses
};
//# sourceMappingURL=AccordionHorizontal.utils.js.map

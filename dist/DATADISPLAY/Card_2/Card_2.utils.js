import { CARD2_CLASSES } from "./Card_2.constants";
function buildCard2Classes(variant, size, hoverable, clickable, hasClick, fullWidth, layoutName, unstyled, className) {
  const base = CARD2_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    CARD2_CLASSES.layout,
    `w3f-card--${variant}`,
    `w3f-card--${size}`,
    hoverable ? CARD2_CLASSES.hoverable : "",
    clickable || hasClick ? CARD2_CLASSES.clickable : "",
    fullWidth ? CARD2_CLASSES.fullWidth : "",
    layoutName ? `w3f-card-layout--${layoutName}` : "",
    className
  ].filter(Boolean).join(" ");
}
function buildCard2ActionsClasses(actionsAlign) {
  return [CARD2_CLASSES.slotActions, `w3f-card-actions--${actionsAlign}`].filter(Boolean).join(" ");
}
export {
  buildCard2ActionsClasses,
  buildCard2Classes
};
//# sourceMappingURL=Card_2.utils.js.map

import { POPUP_CLASSES } from "./PopUp.constants";
function buildPopUpOverlayClasses(isOpen) {
  return [POPUP_CLASSES.overlay, isOpen && POPUP_CLASSES.overlayOpen].filter(Boolean).join(" ");
}
function buildPopUpContainerClasses(className, size, unstyled) {
  const base = POPUP_CLASSES.container;
  const sizeClass = `${base}--${size}`;
  if (unstyled) return [base, sizeClass, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, sizeClass, className].filter(Boolean).join(" ");
}
export {
  buildPopUpContainerClasses,
  buildPopUpOverlayClasses
};
//# sourceMappingURL=PopUp.utils.js.map

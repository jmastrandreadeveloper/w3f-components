import { BUTTON_CLASSES } from "./Button.constants";
function buildButtonClasses(variant, color, size, fullWidth, className, unstyled) {
  if (unstyled) {
    return [
      BUTTON_CLASSES.base,
      "w3f-button--unstyled",
      fullWidth && BUTTON_CLASSES.full,
      className
    ].filter(Boolean).join(" ");
  }
  return [
    BUTTON_CLASSES.base,
    BUTTON_CLASSES.variants[variant],
    BUTTON_CLASSES.colors[color],
    BUTTON_CLASSES.sizes[size],
    fullWidth && BUTTON_CLASSES.full,
    className
  ].filter(Boolean).join(" ");
}
export {
  buildButtonClasses
};
//# sourceMappingURL=Button.utils.js.map

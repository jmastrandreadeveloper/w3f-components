import { LINK_CLASSES } from "./Link.constants";
function buildLinkClasses(color, underline, variant, disabled, isButton, className, unstyled) {
  if (unstyled) {
    return [LINK_CLASSES.base, "w3f-link--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    LINK_CLASSES.base,
    `w3f-link--${color}`,
    `w3f-link--underline-${underline}`,
    `w3f-link--${variant}`,
    disabled && LINK_CLASSES.disabled,
    isButton && LINK_CLASSES.button,
    className
  ].filter(Boolean).join(" ");
}
function buildExternalProps(external, isButton) {
  return external && !isButton ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
export {
  buildExternalProps,
  buildLinkClasses
};
//# sourceMappingURL=Link.utils.js.map

const VARIANT_CLASSES = {
  dark: "w3f-tooltip-dark",
  light: "w3f-tooltip-light",
  primary: "w3f-tooltip-primary",
  success: "w3f-tooltip-success",
  warning: "w3f-tooltip-warning",
  danger: "w3f-tooltip-danger",
  info: "w3f-tooltip-info"
};
const buildTooltipClasses = (position, variant, isVisible, unstyled) => {
  if (unstyled) {
    return ["w3f-tooltip-content", "w3f-tooltip--unstyled", isVisible && "w3f-tooltip-visible"].filter(Boolean).join(" ");
  }
  const classes = [
    "w3f-tooltip-content",
    `w3f-tooltip-${position}`,
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.dark
  ];
  if (isVisible) classes.push("w3f-tooltip-visible");
  return classes.filter(Boolean).join(" ");
};
const buildArrowClasses = (position) => {
  return `w3f-tooltip-arrow w3f-tooltip-arrow-${position}`;
};
export {
  buildArrowClasses,
  buildTooltipClasses
};
//# sourceMappingURL=Tooltip.utils.js.map

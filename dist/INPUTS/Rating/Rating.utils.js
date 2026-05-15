import { RATING_CLASSES, RATING_VARIANT_CLASSES } from "./Rating.constants";
function buildContainerClasses(size, hasError, disabled, className, unstyled, variant) {
  if (unstyled) {
    return [
      RATING_CLASSES.container,
      "w3f-rating--unstyled",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    RATING_CLASSES.container,
    RATING_CLASSES.sizes[size],
    hasError && RATING_CLASSES.error,
    disabled && RATING_CLASSES.disabled,
    variant && RATING_VARIANT_CLASSES[variant],
    className
  ].filter(Boolean).join(" ");
}
function getIconColor(index, ratingVal, iconType, precision, disabled, hasError) {
  if (disabled) return "var(--w3f-gray-400)";
  if (hasError && ratingVal === 0) return "var(--w3f-danger-500)";
  if (iconType === "smiley") {
    if (index < ratingVal) {
      const colorMap = [
        "var(--w3f-danger-500)",
        "var(--w3f-secondary-500)",
        "var(--w3f-warning-500)",
        "var(--w3f-success-400)",
        "var(--w3f-success-600)"
      ];
      return colorMap[index] || "var(--w3f-gray-500)";
    }
    return "var(--w3f-gray-400)";
  }
  const isFilled = index < ratingVal;
  const isHalf = precision === 0.5 && index + 0.5 === ratingVal;
  if (isFilled || isHalf) {
    return iconType === "heart" ? "var(--w3f-danger-500)" : "var(--w3f-warning-500)";
  }
  return "var(--w3f-gray-400)";
}
function getFillPercentage(index, ratingVal) {
  if (index + 1 <= ratingVal) return 100;
  if (index < ratingVal && ratingVal < index + 1) return (ratingVal - index) * 100;
  return 0;
}
export {
  buildContainerClasses,
  getFillPercentage,
  getIconColor
};
//# sourceMappingURL=Rating.utils.js.map

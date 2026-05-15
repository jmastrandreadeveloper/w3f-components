import {
  BADGE_COLORS,
  BADGE_POSITIONS,
  BADGE_SIZES,
  BADGE_VARIANTS
} from "./Badge.constants";
function buildBadgeClasses(color, size, variant, position, pulse, animate, className, unstyled) {
  if (unstyled) {
    return [
      "w3f-badge",
      "w3f-badge--unstyled",
      position ? BADGE_POSITIONS[position] : "",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    "w3f-badge",
    BADGE_COLORS[color] || BADGE_COLORS.primary,
    BADGE_SIZES[size] || BADGE_SIZES.md,
    BADGE_VARIANTS[variant] || "",
    position ? BADGE_POSITIONS[position] : "",
    pulse ? "w3f-badge-pulse" : "",
    animate ? "w3f-badge-animate" : "",
    className
  ].filter(Boolean).join(" ");
}
function processContent(children, max, variant) {
  if (variant === "dot") return null;
  if (typeof children === "number" && children > max) return `${max}+`;
  return children;
}
function getAriaLabel(ariaLabel, variant, children, processedContent) {
  if (ariaLabel) return ariaLabel;
  if (variant === "dot") return "Notification indicator";
  if (typeof children === "number") return `${processedContent} notifications`;
  return void 0;
}
export {
  buildBadgeClasses,
  getAriaLabel,
  processContent
};
//# sourceMappingURL=Badge.utils.js.map

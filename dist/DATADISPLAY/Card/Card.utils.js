function buildCardClasses(variant, size, imagePosition, hoverable, clickable, onClick, fullWidth, layoutMode, className, unstyled) {
  if (unstyled) {
    return [
      "w3f-card",
      "w3f-card--unstyled",
      imagePosition === "left" || imagePosition === "right" ? "w3f-card--horizontal" : "",
      fullWidth ? "w3f-card--full-width" : "",
      layoutMode ? "w3f-card--layout" : "",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    "w3f-card",
    `w3f-card--${variant}`,
    `w3f-card--${size}`,
    imagePosition === "left" || imagePosition === "right" ? "w3f-card--horizontal" : "",
    hoverable ? "w3f-card--hoverable" : "",
    clickable || onClick ? "w3f-card--clickable" : "",
    fullWidth ? "w3f-card--full-width" : "",
    layoutMode ? "w3f-card--layout" : "",
    className
  ].filter(Boolean).join(" ");
}
function buildHeaderClasses(headerClassName) {
  return ["w3f-card-header", headerClassName].filter(Boolean).join(" ");
}
function buildContentClasses(contentClassName) {
  return ["w3f-card-content", contentClassName].filter(Boolean).join(" ");
}
function buildActionsClasses(actionsAlign, actionsClassName) {
  return [
    "w3f-card-actions",
    `w3f-card-actions--${actionsAlign}`,
    actionsClassName
  ].filter(Boolean).join(" ");
}
export {
  buildActionsClasses,
  buildCardClasses,
  buildContentClasses,
  buildHeaderClasses
};
//# sourceMappingURL=Card.utils.js.map

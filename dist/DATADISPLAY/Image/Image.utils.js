const buildImageClasses = (circle, rounded, border, shadow, filter, hoverEffect, unstyled, className) => {
  const base = "w3f-image-base";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const classes = [base];
  if (circle) {
    classes.push("w3f-rounded-full");
  } else if (rounded) {
    classes.push(`w3f-rounded-${rounded}`);
  }
  if (border) {
    classes.push("w3f-image-border");
  }
  if (shadow) {
    classes.push(`w3f-shadow-${shadow}`);
  }
  if (filter) {
    classes.push(`w3f-image-filter-${filter}`);
  }
  if (hoverEffect) {
    classes.push(`w3f-image-hover-${hoverEffect}`);
  }
  if (className) {
    classes.push(className);
  }
  return classes.filter(Boolean).join(" ");
};
export {
  buildImageClasses
};
//# sourceMappingURL=Image.utils.js.map

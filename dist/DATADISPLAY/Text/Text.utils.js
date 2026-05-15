const ALIGNMENT_MAP = {
  left: "w3f-text-left",
  center: "w3f-text-center",
  right: "w3f-text-right",
  justify: "w3f-text-justify"
};
const LEADING_MAP = {
  none: "w3f-leading-none",
  tight: "w3f-leading-tight",
  snug: "w3f-leading-snug",
  normal: "w3f-leading-normal",
  relaxed: "w3f-leading-relaxed",
  loose: "w3f-leading-loose"
};
const buildTextClasses = (customClasses, align, leading, unstyled) => {
  const base = "w3f-text";
  if (unstyled) return [base, `${base}--unstyled`, customClasses].filter(Boolean).join(" ");
  const classes = [base];
  if (customClasses) classes.push(customClasses);
  if (align && ALIGNMENT_MAP[align]) classes.push(ALIGNMENT_MAP[align]);
  if (leading && LEADING_MAP[leading]) classes.push(LEADING_MAP[leading]);
  return classes.filter(Boolean).join(" ");
};
const buildTextDirectionStyle = (direction, writingMode, existingStyle) => {
  if (!direction && !writingMode) return existingStyle;
  const dirStyle = { ...existingStyle };
  if (direction) dirStyle.direction = direction;
  if (writingMode) dirStyle.writingMode = writingMode;
  return dirStyle;
};
export {
  ALIGNMENT_MAP,
  LEADING_MAP,
  buildTextClasses,
  buildTextDirectionStyle
};
//# sourceMappingURL=Text.utils.js.map

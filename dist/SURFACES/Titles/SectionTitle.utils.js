import { SECTION_TITLE_CLASSES } from "./SectionTitle.constants";
const ALIGN_CLASS = {
  left: SECTION_TITLE_CLASSES.alignLeft,
  center: SECTION_TITLE_CLASSES.alignCenter,
  right: SECTION_TITLE_CLASSES.alignRight,
  justify: SECTION_TITLE_CLASSES.alignJustify
};
function buildSectionTitleClasses(align, className, unstyled) {
  const base = SECTION_TITLE_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    ALIGN_CLASS[align],
    className
  ].filter(Boolean).join(" ");
}
function buildSectionTitleStyle(borderColor, style) {
  return {
    ...borderColor ? { "--w3f-section-title-border": borderColor } : {},
    ...style
  };
}
export {
  buildSectionTitleClasses,
  buildSectionTitleStyle
};
//# sourceMappingURL=SectionTitle.utils.js.map

import { SECTION_CLASSES } from "./Section.constants";
function buildSectionPanelClassName(className, unstyled) {
  const base = SECTION_CLASSES.marginBottom;
  if (unstyled) return [`${base}--unstyled`, className].filter(Boolean).join(" ");
  return `${base} ${className}`.trim();
}
export {
  buildSectionPanelClassName
};
//# sourceMappingURL=Section.utils.js.map

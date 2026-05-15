import { SECTION_CLASSES, SUBSECTION_CLASSES } from "./Section.constants";
function buildSectionClasses(className) {
  return [SECTION_CLASSES.base, className].filter(Boolean).join(" ");
}
function buildSubSectionClasses(className) {
  return [SUBSECTION_CLASSES.base, className].filter(Boolean).join(" ");
}
export {
  buildSectionClasses,
  buildSubSectionClasses
};
//# sourceMappingURL=Section.utils.js.map

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { SECTION_CLASSES } from "./Section.constants";
import { buildSectionClasses } from "./Section.utils";
const Section = ({
  children,
  title,
  as: Element = "section",
  className,
  style,
  ...rest
}) => {
  const classes = buildSectionClasses(className);
  return /* @__PURE__ */ jsxs(Element, { className: classes, style, ...rest, children: [
    title && /* @__PURE__ */ jsx("h2", { className: SECTION_CLASSES.title, children: title }),
    children
  ] });
};
Section.displayName = "Section";
var Section_default = Section;
export {
  Section,
  Section_default as default
};
//# sourceMappingURL=Section.js.map

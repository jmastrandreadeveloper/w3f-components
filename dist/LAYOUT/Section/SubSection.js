"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { SUBSECTION_CLASSES } from "./Section.constants";
import { buildSubSectionClasses } from "./Section.utils";
const SubSection = ({
  children,
  title,
  className,
  style,
  ...rest
}) => {
  const classes = buildSubSectionClasses(className);
  return /* @__PURE__ */ jsxs("div", { className: classes, style, ...rest, children: [
    title && /* @__PURE__ */ jsx("h3", { className: SUBSECTION_CLASSES.title, children: title }),
    children
  ] });
};
SubSection.displayName = "SubSection";
var SubSection_default = SubSection;
export {
  SubSection,
  SubSection_default as default
};
//# sourceMappingURL=SubSection.js.map

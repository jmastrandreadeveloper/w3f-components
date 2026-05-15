"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { SECTION_TITLE_DEFAULTS, SECTION_TITLE_CLASSES } from "./SectionTitle.constants";
import { buildSectionTitleClasses, buildSectionTitleStyle } from "./SectionTitle.utils";
const SectionTitle = ({
  title,
  subtitle,
  align = SECTION_TITLE_DEFAULTS.align,
  borderColor = SECTION_TITLE_DEFAULTS.borderColor,
  unstyled = SECTION_TITLE_DEFAULTS.unstyled,
  className = SECTION_TITLE_DEFAULTS.className,
  style = {}
}) => {
  const cls = buildSectionTitleClasses(align, className, unstyled);
  const computedStyle = buildSectionTitleStyle(borderColor, style);
  return /* @__PURE__ */ jsxs("div", { className: cls, style: computedStyle, children: [
    title && /* @__PURE__ */ jsx("h3", { className: SECTION_TITLE_CLASSES.title, children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: SECTION_TITLE_CLASSES.subtitle, children: subtitle })
  ] });
};
SectionTitle.displayName = "SectionTitle";
var SectionTitle_default = SectionTitle;
export {
  SectionTitle,
  SectionTitle_default as default
};
//# sourceMappingURL=SectionTitle.js.map

"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Panel } from "../../LAYOUT/Panels/Panel";
import { SECTION_DEFAULTS, SECTION_CLASSES } from "./Section.constants";
import { buildSectionPanelClassName } from "./Section.utils";
const Section = forwardRef(({
  title,
  description,
  children,
  unstyled = SECTION_DEFAULTS.unstyled,
  className = SECTION_DEFAULTS.className,
  card = SECTION_DEFAULTS.card,
  round,
  color,
  border,
  ...rest
}, ref) => {
  const panelClassName = buildSectionPanelClassName(className, unstyled);
  return /* @__PURE__ */ jsxs(
    Panel,
    {
      ref,
      card,
      round,
      color,
      border,
      className: panelClassName,
      padding: false,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("div", { className: SECTION_CLASSES.header, children: /* @__PURE__ */ jsx("h3", { className: SECTION_CLASSES.title, children: title }) }),
        /* @__PURE__ */ jsxs("div", { className: SECTION_CLASSES.body, children: [
          description && /* @__PURE__ */ jsx("p", { className: SECTION_CLASSES.description, children: description }),
          /* @__PURE__ */ jsx("div", { className: SECTION_CLASSES.content, children })
        ] })
      ]
    }
  );
});
Section.displayName = "Section";
var Section_default = Section;
export {
  Section,
  Section_default as default
};
//# sourceMappingURL=Section.js.map

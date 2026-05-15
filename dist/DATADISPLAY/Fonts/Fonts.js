"use client";
import { jsx } from "react/jsx-runtime";
import { FONTS_DEFAULTS } from "./Fonts.constants";
import { buildFontsClasses, buildFontsStyle } from "./Fonts.utils";
const Fonts = ({
  text = FONTS_DEFAULTS.text,
  customClasses = FONTS_DEFAULTS.customClasses,
  size = FONTS_DEFAULTS.size,
  family = FONTS_DEFAULTS.family,
  weight = FONTS_DEFAULTS.weight,
  italic = FONTS_DEFAULTS.italic,
  underline = FONTS_DEFAULTS.underline,
  writingMode = FONTS_DEFAULTS.writingMode,
  transform = FONTS_DEFAULTS.transform,
  unstyled = FONTS_DEFAULTS.unstyled,
  element: Element = "span"
}) => {
  const finalClasses = buildFontsClasses(size, family, weight, italic, underline, unstyled, customClasses);
  const style = buildFontsStyle(writingMode, transform);
  if (writingMode === "vertical-stacked" || writingMode === "vertical-stacked-up") {
    const stackStyle = {
      display: "inline-flex",
      flexDirection: writingMode === "vertical-stacked-up" ? "column-reverse" : "column",
      alignItems: "center",
      // only forward the transform prop, not any writing-mode CSS
      ...style?.transform ? { transform: style.transform } : {}
    };
    return /* @__PURE__ */ jsx(Element, { className: finalClasses, style: stackStyle, children: [...text].map((char, i) => /* @__PURE__ */ jsx("span", { children: char }, i)) });
  }
  return /* @__PURE__ */ jsx(Element, { className: finalClasses, style, children: text });
};
Fonts.displayName = "Fonts";
var Fonts_default = Fonts;
export {
  Fonts,
  Fonts_default as default
};
//# sourceMappingURL=Fonts.js.map

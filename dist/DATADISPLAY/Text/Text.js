"use client";
import { jsx } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import { TEXT_DEFAULTS } from "./Text.constants";
import { buildTextClasses, buildTextDirectionStyle } from "./Text.utils";
import { useBridgeBind } from "@w3f/bridge";
const Text = forwardRef(({
  content,
  element: Element = "p",
  customClasses = TEXT_DEFAULTS.customClasses,
  align,
  leading,
  direction,
  writingMode,
  children,
  style,
  unstyled = TEXT_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  useBridgeBind({ bindId });
  const hasContentProp = content !== void 0 && content !== null;
  const contentToRender = hasContentProp ? Array.isArray(content) ? content : [content] : children;
  const finalClasses = buildTextClasses(customClasses, align, leading, unstyled);
  const finalStyle = buildTextDirectionStyle(direction, writingMode, style);
  return /* @__PURE__ */ jsx(Element, { ref, className: finalClasses || void 0, style: finalStyle, ...props, children: hasContentProp ? contentToRender.map((item, index) => /* @__PURE__ */ jsx(React.Fragment, { children: item }, index)) : contentToRender });
});
Text.displayName = "Text";
var Text_default = Text;
export {
  Text,
  Text_default as default
};
//# sourceMappingURL=Text.js.map

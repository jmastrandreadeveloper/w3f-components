"use client";
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { TAG_DEFAULTS } from "./Tag.constants";
import { buildTagClasses } from "./Tag.utils";
import { useBridgeBind } from "@w3f/bridge";
const Tag = forwardRef(({
  color,
  light = TAG_DEFAULTS.light,
  variant,
  children,
  className = TAG_DEFAULTS.className,
  style = {},
  unstyled = TAG_DEFAULTS.unstyled,
  bindId,
  ...rest
}, ref) => {
  useBridgeBind({ bindId });
  const classes = buildTagClasses(color, light, className, unstyled, variant);
  return /* @__PURE__ */ jsx("span", { ref, className: classes, style, ...rest, children });
});
Tag.displayName = "Tag";
var Tag_default = Tag;
export {
  Tag,
  Tag_default as default
};
//# sourceMappingURL=Tag.js.map

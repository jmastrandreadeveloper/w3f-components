"use client";
import { jsx } from "react/jsx-runtime";
import { STACK_DEFAULTS } from "./Stack.constants";
import { buildStackClasses, buildStackStyles } from "./Stack.utils";
const Stack = ({
  as: Tag = "div",
  children,
  horizontal = STACK_DEFAULTS.horizontal,
  size = STACK_DEFAULTS.size,
  spacing,
  gap,
  align,
  justify,
  className,
  style,
  ...rest
}) => {
  const classes = buildStackClasses(horizontal, size, spacing, gap, className);
  const inlineStyle = buildStackStyles(gap, align, justify, style);
  return /* @__PURE__ */ jsx(Tag, { className: classes, style: inlineStyle, ...rest, children });
};
Stack.displayName = "Stack";
var Stack_default = Stack;
export {
  Stack,
  Stack_default as default
};
//# sourceMappingURL=Stack.js.map

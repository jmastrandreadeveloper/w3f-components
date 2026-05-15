"use client";
import { jsx } from "react/jsx-runtime";
import { VERTICAL_PADDING_DEFAULTS } from "./VerticalPadding.constants";
import { buildVerticalPaddingClassNames } from "./VerticalPadding.utils";
const VerticalPadding = ({
  children,
  size = VERTICAL_PADDING_DEFAULTS.size,
  utilityClass,
  className,
  ...rest
}) => {
  const classNames = buildVerticalPaddingClassNames({
    size,
    utilityClass,
    className
  });
  return /* @__PURE__ */ jsx("div", { className: classNames, ...rest, children });
};
VerticalPadding.displayName = "VerticalPadding";
var VerticalPadding_default = VerticalPadding;
export {
  VerticalPadding,
  VerticalPadding_default as default
};
//# sourceMappingURL=VerticalPadding.js.map

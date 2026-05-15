"use client";
import { jsx } from "react/jsx-runtime";
const Divider = ({
  onMouseDown,
  isDragging,
  orientation = "vertical",
  className
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className,
      onMouseDown
    }
  );
};
Divider.displayName = "Divider";
var Divider_default = Divider;
export {
  Divider,
  Divider_default as default
};
//# sourceMappingURL=Divider.js.map

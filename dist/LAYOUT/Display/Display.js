"use client";
import { jsx } from "react/jsx-runtime";
import { W3F_POSITION_CLASSES } from "./Display.constants";
import { useDisplayStyles } from "./Display.hooks";
const {
  TOPLEFT,
  TOPRIGHT,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  MIDDLE,
  TOP,
  BOTTOM,
  LEFT,
  RIGHT
} = W3F_POSITION_CLASSES;
const DisplayPositions = W3F_POSITION_CLASSES;
const DisplayContainer = ({
  children,
  className = "",
  style
}) => {
  const { containerClass } = useDisplayStyles();
  const finalClassName = `${containerClass} ${className}`.trim();
  return /* @__PURE__ */ jsx("div", { className: finalClassName, style, children });
};
DisplayContainer.displayName = "DisplayContainer";
const DisplayItem = ({
  children,
  position,
  className = "",
  style
}) => {
  const { itemClass } = useDisplayStyles();
  const positionClass = itemClass(position);
  const finalClassName = `${positionClass} ${className}`.trim();
  return /* @__PURE__ */ jsx("div", { className: finalClassName, style, children });
};
DisplayItem.displayName = "DisplayItem";
var Display_default = DisplayContainer;
export {
  BOTTOM,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  DisplayContainer,
  DisplayItem,
  DisplayPositions,
  LEFT,
  MIDDLE,
  RIGHT,
  TOP,
  TOPLEFT,
  TOPRIGHT,
  Display_default as default
};
//# sourceMappingURL=Display.js.map

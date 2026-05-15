"use client";
import { jsx } from "react/jsx-runtime";
import { FLEX_CONTAINER_DEFAULTS, FLEX_BOX_ITEM_DEFAULTS } from "./Flexbox.constants";
import {
  buildFlexContainerClassNames,
  buildFlexContainerInlineStyles,
  buildFlexItemClassNames,
  buildFlexItemInlineStyles
} from "./Flexbox.utils";
const FlexContainer = ({
  children,
  direction = FLEX_CONTAINER_DEFAULTS.direction,
  wrap = FLEX_CONTAINER_DEFAULTS.wrap,
  justifyContent = FLEX_CONTAINER_DEFAULTS.justifyContent,
  alignItems = FLEX_CONTAINER_DEFAULTS.alignItems,
  alignContent = FLEX_CONTAINER_DEFAULTS.alignContent,
  gap,
  rowGap,
  columnGap,
  width,
  height,
  padding,
  margin,
  inline = FLEX_CONTAINER_DEFAULTS.inline,
  className = "",
  style = {},
  ...rest
}) => {
  const classNames = buildFlexContainerClassNames({
    direction,
    wrap,
    justifyContent,
    alignItems,
    alignContent,
    inline,
    className
  });
  const flexStyle = buildFlexContainerInlineStyles({
    direction,
    wrap,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    rowGap,
    columnGap,
    width,
    height,
    padding,
    margin,
    style
  });
  return /* @__PURE__ */ jsx("div", { className: classNames, style: flexStyle, ...rest, children });
};
FlexContainer.displayName = "FlexContainer";
const FlexItem = ({
  children,
  grow,
  shrink,
  order,
  mlAuto,
  mrAuto,
  basis,
  alignSelf,
  className = "",
  style = {},
  ...rest
}) => {
  const classNames = buildFlexItemClassNames({
    grow,
    shrink,
    order,
    mlAuto,
    mrAuto,
    className
  });
  const itemStyle = buildFlexItemInlineStyles({
    grow,
    shrink,
    order,
    basis,
    alignSelf,
    style
  });
  return /* @__PURE__ */ jsx("div", { className: classNames, style: itemStyle, ...rest, children });
};
FlexItem.displayName = "FlexItem";
const FlexBoxItem = ({
  children,
  bgColor = FLEX_BOX_ITEM_DEFAULTS.bgColor,
  style = {},
  className = "",
  ...rest
}) => {
  const boxStyles = {
    backgroundColor: bgColor,
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minHeight: "50px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style
  };
  return /* @__PURE__ */ jsx(FlexItem, { style: boxStyles, className, ...rest, children });
};
FlexBoxItem.displayName = "FlexBoxItem";
var Flexbox_default = FlexContainer;
export {
  FlexBoxItem,
  FlexContainer,
  FlexItem,
  Flexbox_default as default
};
//# sourceMappingURL=Flexbox.js.map

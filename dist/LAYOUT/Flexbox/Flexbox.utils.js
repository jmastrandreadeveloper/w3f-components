import {
  STANDARD_DIRECTIONS,
  STANDARD_JUSTIFY,
  STANDARD_ALIGN,
  STANDARD_ALIGN_CONTENT
} from "./Flexbox.constants";
const mapGrowToClass = (grow) => {
  if (grow === true || grow === 1) return "w3f-flex-grow";
  if (grow === false || grow === 0) return "w3f-flex-grow-0";
  return "";
};
const mapShrinkToClass = (shrink) => {
  if (shrink === true || shrink === 1) return "w3f-flex-shrink";
  if (shrink === false || shrink === 0) return "w3f-flex-shrink-0";
  return "";
};
const mapOrderToClass = (order) => {
  const orderStr = String(order);
  if (orderStr === "first") return "w3f-order-first";
  if (orderStr === "last") return "w3f-order-last";
  if (["0", "none"].includes(orderStr)) return "w3f-order-none";
  if (["1", "2", "3"].includes(orderStr)) return `w3f-order-${orderStr}`;
  return "";
};
const mapAutoMarginsToClass = ({ mlAuto, mrAuto }) => {
  const classes = [];
  if (mlAuto) classes.push("w3f-ml-auto");
  if (mrAuto) classes.push("w3f-mr-auto");
  return classes.join(" ");
};
const buildFlexItemClassNames = ({
  grow,
  shrink,
  order,
  mlAuto,
  mrAuto,
  className
}) => {
  return [
    mapGrowToClass(grow),
    mapShrinkToClass(shrink),
    mapOrderToClass(order),
    mapAutoMarginsToClass({ mlAuto, mrAuto }),
    className
  ].filter(Boolean).join(" ");
};
const mapDirectionToClass = (dir) => {
  if (dir === "row") return "w3f-flex-row";
  if (dir === "row-reverse") return "w3f-flex-row-reverse";
  if (dir === "column") return "w3f-flex-col";
  if (dir === "column-reverse") return "w3f-flex-col-reverse";
  return "";
};
const mapWrapToClass = (wrap) => {
  if (wrap === true || wrap === "wrap") return "w3f-flex-wrap";
  if (wrap === false || wrap === "nowrap") return "w3f-flex-nowrap";
  if (wrap === "wrap-reverse") return "w3f-flex-wrap-reverse";
  return "";
};
const mapJustifyToClass = (justify) => {
  if (justify && STANDARD_JUSTIFY.includes(justify)) {
    return `w3f-justify-${justify}`;
  }
  return "";
};
const mapAlignItemsToClass = (align) => {
  if (align && STANDARD_ALIGN.includes(align)) {
    return `w3f-items-${align}`;
  }
  return "";
};
const mapAlignContentToClass = (alignContent) => {
  if (alignContent && STANDARD_ALIGN_CONTENT.includes(alignContent)) {
    return `w3f-content-${alignContent}`;
  }
  return "";
};
const buildFlexContainerClassNames = ({
  direction,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  inline,
  className
}) => {
  return [
    inline ? "w3f-inline-flex" : "w3f-flex",
    mapDirectionToClass(direction),
    mapWrapToClass(wrap),
    mapJustifyToClass(justifyContent),
    mapAlignItemsToClass(alignItems),
    mapAlignContentToClass(alignContent),
    className
  ].filter(Boolean).join(" ");
};
const buildFlexContainerInlineStyles = ({
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
}) => {
  const isStandardDir = STANDARD_DIRECTIONS.includes(direction || "");
  const isStandardJustify = STANDARD_JUSTIFY.includes(justifyContent || "");
  const isStandardAlign = STANDARD_ALIGN.includes(alignItems || "");
  const isStandardAlignContent = STANDARD_ALIGN_CONTENT.includes(alignContent || "");
  const flexStyle = {
    flexDirection: !isStandardDir ? direction : void 0,
    justifyContent: !isStandardJustify ? justifyContent : void 0,
    alignItems: !isStandardAlign ? alignItems : void 0,
    alignContent: !isStandardAlignContent ? alignContent : void 0,
    gap,
    rowGap,
    columnGap,
    width,
    height,
    padding,
    margin,
    ...style
  };
  Object.keys(flexStyle).forEach((key) => {
    if (flexStyle[key] === void 0) delete flexStyle[key];
  });
  return flexStyle;
};
const buildFlexItemInlineStyles = ({
  grow,
  shrink,
  order,
  basis,
  alignSelf,
  style
}) => {
  const itemStyle = {
    flexGrow: typeof grow === "number" && grow !== 0 && grow !== 1 ? grow : void 0,
    flexShrink: typeof shrink === "number" && shrink !== 0 && shrink !== 1 ? shrink : void 0,
    order: typeof order === "number" && ![0, 1, 2, 3].includes(order) ? order : void 0,
    flexBasis: basis,
    alignSelf,
    ...style
  };
  Object.keys(itemStyle).forEach((key) => {
    if (itemStyle[key] === void 0) delete itemStyle[key];
  });
  return itemStyle;
};
export {
  buildFlexContainerClassNames,
  buildFlexContainerInlineStyles,
  buildFlexItemClassNames,
  buildFlexItemInlineStyles
};
//# sourceMappingURL=Flexbox.utils.js.map

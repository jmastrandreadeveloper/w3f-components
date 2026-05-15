const FLEX_CONTAINER_DEFAULTS = {
  direction: "row",
  wrap: "nowrap",
  justifyContent: "start",
  alignItems: "stretch",
  alignContent: "stretch",
  inline: false
};
const FLEX_BOX_ITEM_DEFAULTS = {
  bgColor: "#3498db"
};
const STANDARD_DIRECTIONS = ["row", "row-reverse", "column", "column-reverse"];
const STANDARD_WRAPS = [true, false, "wrap", "nowrap", "wrap-reverse"];
const STANDARD_JUSTIFY = ["start", "end", "center", "between", "around", "evenly"];
const STANDARD_ALIGN = ["start", "end", "center", "baseline", "stretch"];
const STANDARD_ALIGN_CONTENT = ["start", "end", "center", "between", "around", "stretch"];
export {
  FLEX_BOX_ITEM_DEFAULTS,
  FLEX_CONTAINER_DEFAULTS,
  STANDARD_ALIGN,
  STANDARD_ALIGN_CONTENT,
  STANDARD_DIRECTIONS,
  STANDARD_JUSTIFY,
  STANDARD_WRAPS
};
//# sourceMappingURL=Flexbox.constants.js.map

import { STACK_CLASSES, ALIGN_MAP, JUSTIFY_MAP } from "./Stack.constants";
function buildStackClasses(horizontal, size, spacing, gap, className) {
  const classes = [];
  if (horizontal) {
    classes.push(STACK_CLASSES.horizontal);
  } else {
    classes.push(size === "sm" ? STACK_CLASSES.verticalSm : STACK_CLASSES.vertical);
  }
  if (spacing && !gap) {
    classes.push(`w3f-gap-${spacing}`);
  }
  if (className) classes.push(className);
  return classes.join(" ");
}
function buildStackStyles(gap, align, justify, style) {
  const result = { ...style };
  if (gap) result.gap = gap;
  if (align) result.alignItems = ALIGN_MAP[align] ?? align;
  if (justify) result.justifyContent = JUSTIFY_MAP[justify] ?? justify;
  return Object.keys(result).length ? result : void 0;
}
export {
  buildStackClasses,
  buildStackStyles
};
//# sourceMappingURL=Stack.utils.js.map

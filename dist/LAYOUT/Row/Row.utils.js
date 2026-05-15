import { ROW_CLASSES, COL_CLASSES } from "./Row.constants";
function buildRowClasses(className) {
  return [ROW_CLASSES.base, className].filter(Boolean).join(" ");
}
function buildColClasses({
  col,
  sm,
  md,
  lg,
  className
}) {
  const classes = [COL_CLASSES.base];
  if (col) classes.push(`w3f-col-${col}`);
  if (sm) classes.push(`w3f-sm:col-${sm}`);
  if (md) classes.push(`w3f-md:col-${md}`);
  if (lg) classes.push(`w3f-lg:col-${lg}`);
  if (className) classes.push(className);
  return classes.join(" ");
}
export {
  buildColClasses,
  buildRowClasses
};
//# sourceMappingURL=Row.utils.js.map

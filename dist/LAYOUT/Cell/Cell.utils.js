import { CELL_CLASSES } from "./Cell.constants";
const buildCellClassNames = ({
  content,
  center,
  vCenter,
  className
}) => {
  const classes = [CELL_CLASSES.base];
  if (content) classes.push(CELL_CLASSES.content);
  if (center) classes.push(CELL_CLASSES.center);
  if (vCenter && !center) classes.push(CELL_CLASSES.vCenter);
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
const buildCellRowClassNames = ({ className }) => {
  return className || "";
};
export {
  buildCellClassNames,
  buildCellRowClassNames
};
//# sourceMappingURL=Cell.utils.js.map

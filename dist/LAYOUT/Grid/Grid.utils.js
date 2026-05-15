import { GRID_CLASSES, VALID_GRID_COLS, VALID_COL_SPANS } from "./Grid.constants";
const mapColsToClass = (cols) => {
  if (cols) {
    const colsStr = String(cols);
    if (VALID_GRID_COLS.includes(colsStr)) {
      return `w3f-grid-cols-${colsStr}`;
    }
  }
  return "";
};
const buildGridClassNames = ({
  cols,
  className
}) => {
  const classes = [GRID_CLASSES.base];
  classes.push(mapColsToClass(cols));
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
const buildGridItemClassNames = ({
  colSpan,
  className
}) => {
  const classes = [];
  if (colSpan) {
    const spanStr = String(colSpan);
    if (VALID_COL_SPANS.includes(spanStr)) {
      classes.push(`w3f-col-span-${spanStr}`);
    }
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
const buildGridInlineStyles = (props) => {
  const {
    grid,
    gridTemplate,
    templateColumns,
    templateRows,
    templateAreas,
    gap,
    rowGap,
    columnGap,
    autoColumns,
    autoRows,
    autoFlow,
    justifyContent,
    alignContent,
    placeContent,
    justifyItems,
    alignItems,
    placeItems,
    justifySelf,
    alignSelf,
    placeSelf,
    gridRow,
    gridColumn,
    gridArea,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    margin,
    style
  } = props;
  const gridStyle = {
    display: "grid",
    grid,
    gridTemplate,
    gridTemplateColumns: templateColumns,
    gridTemplateRows: templateRows,
    gridTemplateAreas: templateAreas ? templateAreas.trim().split("\n").map((row) => `"${row.trim()}"`).join(" ") : void 0,
    gap,
    rowGap,
    columnGap,
    gridAutoColumns: autoColumns,
    gridAutoRows: autoRows,
    gridAutoFlow: autoFlow,
    justifyContent,
    alignContent,
    placeContent,
    justifyItems,
    alignItems,
    placeItems,
    justifySelf,
    alignSelf,
    placeSelf,
    gridRow,
    gridColumn,
    gridArea,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    margin,
    ...style
  };
  Object.keys(gridStyle).forEach((key) => {
    if (gridStyle[key] === void 0) delete gridStyle[key];
  });
  return gridStyle;
};
const buildGridItemInlineStyles = ({
  gridArea,
  gridRow,
  gridColumn,
  justifySelf,
  alignSelf,
  placeSelf,
  style
}) => {
  const itemStyle = {
    gridArea,
    gridRow,
    gridColumn,
    justifySelf,
    alignSelf,
    placeSelf,
    ...style
  };
  Object.keys(itemStyle).forEach((key) => {
    if (itemStyle[key] === void 0) delete itemStyle[key];
  });
  return itemStyle;
};
export {
  buildGridClassNames,
  buildGridInlineStyles,
  buildGridItemClassNames,
  buildGridItemInlineStyles
};
//# sourceMappingURL=Grid.utils.js.map

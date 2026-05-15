import { GAP_MAP, PAPER_DESIGN_CLASSES } from "./PaperDesign.constants";
function resolveGap(gap) {
  if (!gap) return void 0;
  return GAP_MAP[gap];
}
function buildGridStyle(columns, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gap, rowGap, columnGap, justifyContent, alignContent, justifyItems, alignItems, gridStyle) {
  const raw = {
    display: "grid",
    gridTemplateColumns: gridTemplateColumns ?? (columns > 1 ? `repeat(${columns}, minmax(0, 1fr))` : void 0),
    gridTemplateRows,
    gridTemplateAreas: gridTemplateAreas ? gridTemplateAreas.trim().split("\n").map((row) => `"${row.trim()}"`).join(" ") : void 0,
    gap: resolveGap(gap),
    rowGap: resolveGap(rowGap),
    columnGap: resolveGap(columnGap),
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
    ...gridStyle
  };
  Object.keys(raw).forEach((key) => {
    if (raw[key] === void 0) delete raw[key];
  });
  return raw;
}
function buildPaperDesignClasses(className, unstyled) {
  const base = PAPER_DESIGN_CLASSES.grid;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
export {
  buildGridStyle,
  buildPaperDesignClasses,
  resolveGap
};
//# sourceMappingURL=PaperDesign.utils.js.map

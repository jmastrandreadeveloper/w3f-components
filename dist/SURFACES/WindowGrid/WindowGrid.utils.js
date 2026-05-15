function buildGridStyle(options, resolvedColumns, autoResponsive) {
  const raw = {
    display: "grid",
    gridTemplateColumns: autoResponsive ? resolvedColumns : options.gridTemplateColumns ?? resolvedColumns,
    gridTemplateRows: options.gridTemplateRows,
    gridTemplateAreas: options.gridTemplateAreas ? options.gridTemplateAreas.trim().split("\n").map((row) => `"${row.trim()}"`).join(" ") : void 0,
    gap: options.gap,
    rowGap: options.rowGap,
    columnGap: options.columnGap,
    gridAutoColumns: options.autoColumns,
    gridAutoRows: options.autoRows,
    gridAutoFlow: options.autoFlow,
    justifyContent: options.justifyContent,
    alignContent: options.alignContent,
    justifyItems: options.justifyItems,
    alignItems: options.alignItems,
    height: "100%",
    width: "100%"
  };
  Object.keys(raw).forEach((key) => {
    if (raw[key] === void 0) delete raw[key];
  });
  return raw;
}
function buildWindowGridClasses(windowClasses, gridBaseClass, unstyled) {
  if (unstyled) return [windowClasses, gridBaseClass, `${gridBaseClass}--unstyled`].filter(Boolean).join(" ");
  return [windowClasses, gridBaseClass].join(" ");
}
export {
  buildGridStyle,
  buildWindowGridClasses
};
//# sourceMappingURL=WindowGrid.utils.js.map

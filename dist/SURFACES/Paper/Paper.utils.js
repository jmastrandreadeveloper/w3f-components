import { PAPER_CLASSES } from "./Paper.constants";
function buildPaperClasses(variant, gridColor, size, fullWidth, debug, className, unstyled) {
  if (unstyled) {
    return [PAPER_CLASSES.base, "w3f-paper--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    PAPER_CLASSES.base,
    variant !== "default" && `w3f-paper--${variant}`,
    gridColor !== "default" && `w3f-paper--grid-${gridColor}`,
    size !== "md" && `w3f-paper--${size}`,
    fullWidth && PAPER_CLASSES.fullWidth,
    debug && PAPER_CLASSES.debug,
    className
  ].filter(Boolean).join(" ");
}
function buildPaperStyle(widthUnits, heightUnits, style) {
  return {
    ...style,
    ...widthUnits ? { width: `calc(var(--w3f-paper-grid-size) * ${widthUnits})`, maxWidth: "none" } : {},
    ...heightUnits ? { height: `calc(var(--w3f-paper-grid-size) * ${heightUnits})` } : {}
  };
}
export {
  buildPaperClasses,
  buildPaperStyle
};
//# sourceMappingURL=Paper.utils.js.map

import { MSN_CLASSES, MSN_DEFAULTS } from "./Masonry.constants";
function buildMasonryRootClasses(variant, className, unstyled) {
  const base = MSN_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const varCls = {
    column: MSN_CLASSES.varColumn,
    flex: MSN_CLASSES.varFlex,
    grid: MSN_CLASSES.varGrid
  }[variant];
  return [base, varCls, className].filter(Boolean).join(" ");
}
function buildMasonryRootStyle(variant, opts) {
  const gap = opts.gap ?? MSN_DEFAULTS.gap;
  const padding = opts.padding ?? MSN_DEFAULTS.padding;
  if (variant === "column") {
    const { xs = 1, sm = 2, md = 3, lg = 4, xl } = opts.columns ?? MSN_DEFAULTS.columns;
    return {
      padding,
      columnGap: gap,
      "--w3f-msn-cols-xs": xs,
      "--w3f-msn-cols-sm": sm,
      "--w3f-msn-cols-md": md,
      "--w3f-msn-cols-lg": lg,
      "--w3f-msn-cols-xl": xl ?? lg,
      "--w3f-msn-gap": gap,
      ...opts.style
    };
  }
  if (variant === "flex") {
    const base = opts.baseColumnWidth ?? MSN_DEFAULTS.baseColumnWidth;
    return {
      padding,
      gap,
      "--w3f-msn-base": base,
      "--w3f-msn-gap": gap,
      ...opts.style
    };
  }
  const min = opts.minCardWidth ?? MSN_DEFAULTS.minCardWidth;
  const cols = opts.gridColumns ? `repeat(${opts.gridColumns}, 1fr)` : `repeat(auto-fit, minmax(${min}, 1fr))`;
  return {
    padding,
    gap,
    gridTemplateColumns: cols,
    ...opts.style
  };
}
function buildMasonryItemClasses(variant, size, className) {
  const sizeClass = variant !== "column" ? {
    small: MSN_CLASSES.itemSmall,
    medium: MSN_CLASSES.itemMedium,
    large: MSN_CLASSES.itemLarge,
    full: MSN_CLASSES.itemFull
  }[size] ?? "" : "";
  return [MSN_CLASSES.item, sizeClass, className].filter(Boolean).join(" ");
}
function buildMasonryCardClasses(hover, className) {
  return [
    MSN_CLASSES.card,
    hover ? MSN_CLASSES.cardHover : "",
    className
  ].filter(Boolean).join(" ");
}
export {
  buildMasonryCardClasses,
  buildMasonryItemClasses,
  buildMasonryRootClasses,
  buildMasonryRootStyle
};
//# sourceMappingURL=Masonry.utils.js.map

import { IMAGE_GALLERY_CLASSES } from "./ImageGallery.constants";
function buildGalleryClasses(layout, className, unstyled) {
  const base = IMAGE_GALLERY_CLASSES.gallery;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const layoutClass = IMAGE_GALLERY_CLASSES[layout] || "";
  return [base, layoutClass, className].filter(Boolean).join(" ");
}
function buildGridStyle(layout, columns, gap) {
  if (layout !== "grid") return {};
  return {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `var(--w3f-space-${gap})`
  };
}
export {
  buildGalleryClasses,
  buildGridStyle
};
//# sourceMappingURL=ImageGallery.utils.js.map

import { IMAGE_LIST_DEFAULTS } from "./ImageList.constants";
function getTemplateColumns(variant, cols) {
  if (variant === "standard") {
    return cols ? `repeat(${cols}, 1fr)` : `repeat(auto-fill, minmax(${IMAGE_LIST_DEFAULTS.standardMinWidth}, 1fr))`;
  }
  return `repeat(${cols || IMAGE_LIST_DEFAULTS.quiltedCols}, 1fr)`;
}
export {
  getTemplateColumns
};
//# sourceMappingURL=ImageList.utils.js.map

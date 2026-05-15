import { SIZE_MAX_HEIGHTS } from "./BottomSheetPanel.constants";
function getMaxHeight(size, maxHeight) {
  if (maxHeight) return maxHeight;
  return SIZE_MAX_HEIGHTS[size] ?? SIZE_MAX_HEIGHTS.auto;
}
export {
  getMaxHeight
};
//# sourceMappingURL=BottomSheetPanel.utils.js.map

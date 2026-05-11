import type { BottomSheetSize } from './BottomSheetPanel.types';
import { SIZE_MAX_HEIGHTS } from './BottomSheetPanel.constants';

export function getMaxHeight(size: BottomSheetSize, maxHeight?: string): string {
  if (maxHeight) return maxHeight;
  return SIZE_MAX_HEIGHTS[size] ?? SIZE_MAX_HEIGHTS.auto;
}

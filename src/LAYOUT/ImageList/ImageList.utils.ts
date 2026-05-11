import type { ImageListVariant } from './ImageList.types';
import { IMAGE_LIST_DEFAULTS } from './ImageList.constants';

/**
 * Calcula el templateColumns según la variante y cols.
 */
export function getTemplateColumns(variant: ImageListVariant, cols?: number): string {
    if (variant === 'standard') {
        return cols
            ? `repeat(${cols}, 1fr)`
            : `repeat(auto-fill, minmax(${IMAGE_LIST_DEFAULTS.standardMinWidth}, 1fr))`;
    }
    return `repeat(${cols || IMAGE_LIST_DEFAULTS.quiltedCols}, 1fr)`;
}

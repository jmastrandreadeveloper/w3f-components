import type { RatingIconType, RatingSize, RatingVariant } from './Rating.types';
export declare function buildContainerClasses(size: RatingSize, hasError: boolean, disabled: boolean, className?: string, unstyled?: boolean, variant?: RatingVariant): string;
export declare function getIconColor(index: number, ratingVal: number, iconType: RatingIconType, precision: number, disabled: boolean, hasError: boolean): string;
export declare function getFillPercentage(index: number, ratingVal: number): number;
//# sourceMappingURL=Rating.utils.d.ts.map
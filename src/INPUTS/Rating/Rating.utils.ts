import type { RatingIconType, RatingSize, RatingVariant } from './Rating.types';
import { RATING_CLASSES, RATING_VARIANT_CLASSES } from './Rating.constants';

export function buildContainerClasses(
    size: RatingSize,
    hasError: boolean,
    disabled: boolean,
    className?: string,
    unstyled?: boolean,
    variant?: RatingVariant,
): string {
    if (unstyled) {
        return [
            RATING_CLASSES.container,
            'w3f-rating--unstyled',
            className,
        ]
            .filter(Boolean)
            .join(' ');
    }
    return [
        RATING_CLASSES.container,
        RATING_CLASSES.sizes[size],
        hasError && RATING_CLASSES.error,
        disabled && RATING_CLASSES.disabled,
        variant && RATING_VARIANT_CLASSES[variant],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function getIconColor(
    index: number,
    ratingVal: number,
    iconType: RatingIconType,
    precision: number,
    disabled: boolean,
    hasError: boolean,
): string {
    if (disabled) return 'var(--w3f-gray-400)';
    if (hasError && ratingVal === 0) return 'var(--w3f-danger-500)';

    if (iconType === 'smiley') {
        if (index < ratingVal) {
            const colorMap = [
                'var(--w3f-danger-500)',
                'var(--w3f-secondary-500)',
                'var(--w3f-warning-500)',
                'var(--w3f-success-400)',
                'var(--w3f-success-600)',
            ];
            return colorMap[index] || 'var(--w3f-gray-500)';
        }
        return 'var(--w3f-gray-400)';
    }

    const isFilled = index < ratingVal;
    const isHalf = precision === 0.5 && index + 0.5 === ratingVal;

    if (isFilled || isHalf) {
        return iconType === 'heart' ? 'var(--w3f-danger-500)' : 'var(--w3f-warning-500)';
    }
    return 'var(--w3f-gray-400)';
}

export function getFillPercentage(index: number, ratingVal: number): number {
    if (index + 1 <= ratingVal) return 100;
    if (index < ratingVal && ratingVal < index + 1) return (ratingVal - index) * 100;
    return 0;
}

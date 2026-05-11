import type { SlideToggleSize, SlideToggleVariant } from './SlideToggle.types';
import { SLIDE_TOGGLE_CLASSES, SLIDE_TOGGLE_SIZE_CONFIGS } from './SlideToggle.constants';

export function getSizeConfig(size: SlideToggleSize) {
    return SLIDE_TOGGLE_SIZE_CONFIGS[size];
}

export function buildToggleClasses(
    size: SlideToggleSize,
    variant: SlideToggleVariant,
    disabled: boolean,
    loading: boolean,
    hasError: boolean,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [
            SLIDE_TOGGLE_CLASSES.base,
            'w3f-slide-toggle--unstyled',
        ]
            .filter(Boolean)
            .join(' ');
    }
    return [
        SLIDE_TOGGLE_CLASSES.base,
        size !== 'md' && `${SLIDE_TOGGLE_CLASSES.base}--${size}`,
        variant !== 'primary' && `${SLIDE_TOGGLE_CLASSES.base}--${variant}`,
        disabled && SLIDE_TOGGLE_CLASSES.isDisabled,
        loading && SLIDE_TOGGLE_CLASSES.isLoading,
        hasError && SLIDE_TOGGLE_CLASSES.hasError,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildTrackClasses(isChecked: boolean): string {
    return [
        SLIDE_TOGGLE_CLASSES.track,
        isChecked && SLIDE_TOGGLE_CLASSES.trackChecked,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildHandleClasses(isDragging: boolean): string {
    return [
        SLIDE_TOGGLE_CLASSES.handle,
        isDragging && SLIDE_TOGGLE_CLASSES.handleDragging,
    ]
        .filter(Boolean)
        .join(' ');
}

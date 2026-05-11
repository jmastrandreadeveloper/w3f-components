import type { SlideToggleSize, SlideToggleSizeConfig } from './SlideToggle.types';

// maxPosition = width - handleSize - 2 * offset(4px)
export const SLIDE_TOGGLE_SIZE_CONFIGS: Record<SlideToggleSize, SlideToggleSizeConfig> = {
    sm: { width: 36, height: 18, handleSize: 14, maxPosition: 14 },
    md: { width: 44, height: 22, handleSize: 18, maxPosition: 18 },
    lg: { width: 52, height: 26, handleSize: 22, maxPosition: 22 },
};

export const SLIDE_TOGGLE_DEFAULTS = {
    checked: false,
    disabled: false,
    size: 'md' as const,
    variant: 'primary' as const,
    loading: false,
    labelPosition: 'right' as const,
    showIcon: true,
    className: '',
    unstyled: false as const,
} as const;

export const SLIDE_TOGGLE_CLASSES = {
    base: 'w3f-slide-toggle',
    track: 'w3f-slide-toggle__track',
    handle: 'w3f-slide-toggle__handle',
    trackChecked: 'is-checked',
    handleDragging: 'is-dragging',
    isDisabled: 'is-disabled',
    isLoading: 'is-loading',
    hasError: 'has-error',
    container: 'w3f-slide-toggle-container',
    containerLabelLeft: 'w3f-slide-toggle-container--label-left',
    label: 'w3f-slide-toggle__label',
    labelRight: 'w3f-slide-toggle__label--right',
    labelLeft: 'w3f-slide-toggle__label--left',
    labelDisabled: 'w3f-slide-toggle__label--disabled',
    checkIcon: 'w3f-slide-toggle__check-icon',
    messages: 'w3f-slide-toggle__messages',
    message: 'w3f-input-message',
    messageError: 'w3f-input-message--error',
    messageHelper: 'w3f-input-message--helper',
} as const;

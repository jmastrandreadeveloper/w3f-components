import type { ToggleButtonColor, ToggleButtonSize, ToggleButtonOrientation } from './ToggleButton.types';

export const TOGGLE_BUTTON_CLASSES = {
    button: 'w3f-toggle-button',
    selected: 'w3f-toggle-button--selected',
    full: 'w3f-toggle-button--full',
    disabled: 'w3f-toggle-button--disabled',
    colorModifiers: {
        primary: '',
        secondary: 'w3f-toggle-button--secondary',
        success: 'w3f-toggle-button--success',
        danger: 'w3f-toggle-button--danger',
        warning: 'w3f-toggle-button--warning',
        info: 'w3f-toggle-button--info',
    } as Record<ToggleButtonColor, string>,
    sizeModifiers: {
        sm: 'w3f-toggle-button--sm',
        md: 'w3f-toggle-button--md',
        lg: 'w3f-toggle-button--lg',
    } as Record<ToggleButtonSize, string>,
} as const;

export const TOGGLE_BUTTON_DEFAULTS = {
    selected: false,
    color: 'primary' as ToggleButtonColor,
    size: 'md' as ToggleButtonSize,
    fullWidth: false,
    disabled: false,
    className: '',
    unstyled: false as const,
} as const;

export const TOGGLE_GROUP_DEFAULTS = {
    exclusive: false,
    color: 'primary' as ToggleButtonColor,
    size: 'md' as ToggleButtonSize,
    fullWidth: false,
    orientation: 'horizontal' as ToggleButtonOrientation,
    required: false,
    disabled: false,
    className: '',
} as const;

export const TOGGLE_GROUP_CLASSES = {
    wrapper: 'w3f-toggle-group-wrapper',
    group: 'w3f-toggle-group',
    label: 'w3f-toggle-group-label',
    required: 'w3f-input-required',
    full: 'w3f-toggle-group--full',
    error: 'w3f-toggle-group--error',
    disabled: 'w3f-toggle-group--disabled',
    orientationModifiers: {
        horizontal: 'w3f-toggle-group--horizontal',
        vertical: 'w3f-toggle-group--vertical',
    } as Record<ToggleButtonOrientation, string>,
    paddingX: 'w3f-px-1',
    message: 'w3f-input-message',
    messageError: 'w3f-input-message--error',
    messageHelper: 'w3f-input-message--helper',
} as const;

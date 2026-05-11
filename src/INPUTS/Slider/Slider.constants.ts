export const SLIDER_CLASSES = {
    component: 'w3f-slider-component',
    wrapper: 'w3f-slider-wrapper',
    container: 'w3f-slider-container',
    input: 'w3f-range-input',
    label: 'w3f-text-primary w3f-text-xl w3f-margin-bottom-4 w3f-block',
    valueWrapper: 'w3f-margin-top-4',
    valueBadge: 'w3f-bg-primary w3f-text-on-primary w3f-padding-x-2 w3f-padding-y-1 w3f-radius-lg w3f-margin-left-2 w3f-shadow-sm',
} as const;

export const SLIDER_VARIANT_CLASSES: Record<string, string> = {
    solid: 'w3f-slider--solid',
    outlined: 'w3f-slider--outlined',
    ghost: 'w3f-slider--ghost',
    soft: 'w3f-slider--soft',
};

export const SLIDER_DEFAULTS = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: true,
    disabled: false,
    unstyled: false as const,
};

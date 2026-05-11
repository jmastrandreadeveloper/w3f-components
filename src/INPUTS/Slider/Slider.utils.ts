export function calcPercentage(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100;
}

export function buildSliderBackground(percentage: number): string {
    return `linear-gradient(to right, var(--w3f-slider-fill-bg, var(--w3f-primary)) 0%, var(--w3f-slider-fill-bg, var(--w3f-primary)) ${percentage}%, var(--w3f-slider-track-bg, var(--w3f-gray-200)) ${percentage}%, var(--w3f-slider-track-bg, var(--w3f-gray-200)) 100%)`;
}

import type { SliderVariant } from './Slider.types';
import { SLIDER_VARIANT_CLASSES } from './Slider.constants';

export function buildSliderClasses(className?: string, unstyled?: boolean, variant?: SliderVariant): string {
    const base = 'w3f-slider-component';
    if (unstyled) {
        return [base, 'w3f-slider--unstyled', className].filter(Boolean).join(' ');
    }
    return [base, variant && SLIDER_VARIANT_CLASSES[variant], className].filter(Boolean).join(' ');
}

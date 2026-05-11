import type { RadioGroupDirection } from './RadioButton.types';
import { RADIO_CLASSES } from './RadioButton.constants';

export function buildRadioButtonClasses(
    direction: RadioGroupDirection,
    disabled: boolean,
    className?: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [RADIO_CLASSES.button, 'w3f-radio--unstyled', className].filter(Boolean).join(' ');
    }
    return [
        RADIO_CLASSES.button,
        direction === 'horizontal' ? RADIO_CLASSES.spacingH : RADIO_CLASSES.spacingV,
        disabled && RADIO_CLASSES.buttonDisabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildRadioGroupContainerClasses(direction: RadioGroupDirection, unstyled?: boolean): string {
    if (unstyled) {
        return [RADIO_CLASSES.radioContainer[direction], 'w3f-radio--unstyled'].filter(Boolean).join(' ');
    }
    return RADIO_CLASSES.radioContainer[direction];
}

import type { PopUpSize } from './PopUp.types';
import { POPUP_CLASSES } from './PopUp.constants';

export function buildPopUpOverlayClasses(isOpen: boolean): string {
    return [POPUP_CLASSES.overlay, isOpen && POPUP_CLASSES.overlayOpen]
        .filter(Boolean)
        .join(' ');
}

export function buildPopUpContainerClasses(className: string, size: PopUpSize, unstyled?: boolean): string {
    const base = POPUP_CLASSES.container;
    const sizeClass = `${base}--${size}`;
    if (unstyled) return [base, sizeClass, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, sizeClass, className].filter(Boolean).join(' ');
}

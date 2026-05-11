import { LIVE_FORM_CLASSES } from './LiveForm.constants';

/**
 * Construye las clases CSS del contenedor LiveForm.
 */
export function buildLiveFormClasses(
    className?: string,
    hasValues?: boolean,
    unstyled?: boolean,
): string {
    const base = LIVE_FORM_CLASSES.base;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        hasValues && LIVE_FORM_CLASSES.active,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

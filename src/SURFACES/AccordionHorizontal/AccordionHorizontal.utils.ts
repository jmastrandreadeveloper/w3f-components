import type { AccordionHColor, AccordionHSize, AccordionHVariant } from './AccordionHorizontal.types';
import { ACCORDION_H_CLASSES } from './AccordionHorizontal.constants';

/**
 * Construye las clases del contenedor AccordionHorizontal.
 */
export function buildAccordionHClasses(
    variant: AccordionHVariant,
    size: AccordionHSize,
    className: string,
    unstyled?: boolean,
): string {
    const base = ACCORDION_H_CLASSES.container;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        variant === 'outlined' && ACCORDION_H_CLASSES.outlined,
        variant === 'elevated' && ACCORDION_H_CLASSES.elevated,
        variant === 'borderless' && ACCORDION_H_CLASSES.borderless,
        size === 'sm' && ACCORDION_H_CLASSES.sm,
        size === 'lg' && ACCORDION_H_CLASSES.lg,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del AccordionItemH.
 */
export function buildAccordionItemHClasses(
    isExpanded: boolean,
    disabled: boolean,
    color: AccordionHColor | null,
    className: string,
): string {
    return [
        ACCORDION_H_CLASSES.item,
        isExpanded && ACCORDION_H_CLASSES.itemExpanded,
        disabled && ACCORDION_H_CLASSES.itemDisabled,
        color && `w3f-color-${color}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del contenedor de contenido horizontal.
 */
export function buildAccordionHContentClasses(isExpanded: boolean): string {
    return [
        ACCORDION_H_CLASSES.contentContainer,
        isExpanded && ACCORDION_H_CLASSES.contentShow,
    ]
        .filter(Boolean)
        .join(' ');
}

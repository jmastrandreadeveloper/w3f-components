import type { AccordionColor, AccordionSize, AccordionVariant } from './Accordion.types';
import { ACCORDION_CLASSES } from './Accordion.constants';

/**
 * Construye las clases del contenedor Accordion.
 */
export function buildAccordionClasses(
    variant: AccordionVariant,
    size: AccordionSize,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [ACCORDION_CLASSES.container, 'w3f-accordion--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        ACCORDION_CLASSES.container,
        variant === 'outlined' && ACCORDION_CLASSES.outlined,
        variant === 'borderless' && ACCORDION_CLASSES.borderless,
        variant === 'elevated' && ACCORDION_CLASSES.elevated,
        size === 'sm' && ACCORDION_CLASSES.sm,
        size === 'lg' && ACCORDION_CLASSES.lg,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del AccordionItem.
 */
export function buildAccordionItemClasses(
    disabled: boolean,
    color: AccordionColor | null,
    className: string,
): string {
    return [
        ACCORDION_CLASSES.item,
        disabled && ACCORDION_CLASSES.itemDisabled,
        color && `w3f-accordion-item-${color}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del contenedor de contenido (animación expand/collapse).
 */
export function buildContentContainerClasses(isExpanded: boolean): string {
    return [
        ACCORDION_CLASSES.contentContainer,
        isExpanded && ACCORDION_CLASSES.contentShow,
    ]
        .filter(Boolean)
        .join(' ');
}

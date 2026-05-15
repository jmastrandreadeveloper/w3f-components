import type { AccordionHColor, AccordionHSize, AccordionHVariant } from './AccordionHorizontal.types';
/**
 * Construye las clases del contenedor AccordionHorizontal.
 */
export declare function buildAccordionHClasses(variant: AccordionHVariant, size: AccordionHSize, className: string, unstyled?: boolean): string;
/**
 * Construye las clases del AccordionItemH.
 */
export declare function buildAccordionItemHClasses(isExpanded: boolean, disabled: boolean, color: AccordionHColor | null, className: string): string;
/**
 * Construye las clases del contenedor de contenido horizontal.
 */
export declare function buildAccordionHContentClasses(isExpanded: boolean): string;
//# sourceMappingURL=AccordionHorizontal.utils.d.ts.map
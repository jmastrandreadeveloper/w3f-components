import type { AccordionColor, AccordionSize, AccordionVariant } from './Accordion.types';
/**
 * Construye las clases del contenedor Accordion.
 */
export declare function buildAccordionClasses(variant: AccordionVariant, size: AccordionSize, className: string, unstyled?: boolean): string;
/**
 * Construye las clases del AccordionItem.
 */
export declare function buildAccordionItemClasses(disabled: boolean, color: AccordionColor | null, className: string): string;
/**
 * Construye las clases del contenedor de contenido (animación expand/collapse).
 */
export declare function buildContentContainerClasses(isExpanded: boolean): string;
//# sourceMappingURL=Accordion.utils.d.ts.map
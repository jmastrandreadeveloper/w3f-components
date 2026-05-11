import { SECTION_CLASSES, SUBSECTION_CLASSES } from './Section.constants';

/**
 * Construye las clases CSS de Section.
 */
export function buildSectionClasses(className?: string): string {
    return [SECTION_CLASSES.base, className].filter(Boolean).join(' ');
}

/**
 * Construye las clases CSS de SubSection.
 */
export function buildSubSectionClasses(className?: string): string {
    return [SUBSECTION_CLASSES.base, className].filter(Boolean).join(' ');
}

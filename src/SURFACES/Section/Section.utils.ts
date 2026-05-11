import { SECTION_CLASSES } from './Section.constants';

export function buildSectionPanelClassName(className: string, unstyled?: boolean): string {
    const base = SECTION_CLASSES.marginBottom;
    if (unstyled) return [`${base}--unstyled`, className].filter(Boolean).join(' ');
    return `${base} ${className}`.trim();
}

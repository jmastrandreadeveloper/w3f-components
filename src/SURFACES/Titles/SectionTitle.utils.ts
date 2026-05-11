import type React from 'react';
import type { SectionTitleAlign } from './SectionTitle.types';
import { SECTION_TITLE_CLASSES } from './SectionTitle.constants';

const ALIGN_CLASS: Record<SectionTitleAlign, string> = {
    left: SECTION_TITLE_CLASSES.alignLeft,
    center: SECTION_TITLE_CLASSES.alignCenter,
    right: SECTION_TITLE_CLASSES.alignRight,
    justify: SECTION_TITLE_CLASSES.alignJustify,
};

export function buildSectionTitleClasses(
    align: SectionTitleAlign,
    className: string,
    unstyled?: boolean,
): string {
    const base = SECTION_TITLE_CLASSES.container;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        ALIGN_CLASS[align],
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/** Si el usuario pasa un borderColor custom, lo aplica como variable inline. */
export function buildSectionTitleStyle(
    borderColor: string,
    style: React.CSSProperties,
): React.CSSProperties {
    return {
        ...(borderColor ? { '--w3f-section-title-border': borderColor } as React.CSSProperties : {}),
        ...style,
    };
}

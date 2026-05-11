import React from 'react';
import type { SectionTitleProps } from './SectionTitle.types';
import { SECTION_TITLE_DEFAULTS, SECTION_TITLE_CLASSES } from './SectionTitle.constants';
import { buildSectionTitleClasses, buildSectionTitleStyle } from './SectionTitle.utils';

/**
 * SectionTitle — Título de sección con subtítulo y línea separadora.
 *
 * @example
 * <SectionTitle
 *   title="Variantes"
 *   subtitle="Todos los estilos disponibles"
 *   align="center"
 * />
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    align = SECTION_TITLE_DEFAULTS.align,
    borderColor = SECTION_TITLE_DEFAULTS.borderColor,
    unstyled = SECTION_TITLE_DEFAULTS.unstyled,
    className = SECTION_TITLE_DEFAULTS.className,
    style = {},
}) => {
    const cls = buildSectionTitleClasses(align, className, unstyled);
    const computedStyle = buildSectionTitleStyle(borderColor, style);

    return (
        <div className={cls} style={computedStyle}>
            {title && <h3 className={SECTION_TITLE_CLASSES.title}>{title}</h3>}
            {subtitle && <p className={SECTION_TITLE_CLASSES.subtitle}>{subtitle}</p>}
        </div>
    );
};

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;

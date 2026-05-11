import React from 'react';
import type { SectionProps } from './Section.types';
import { SECTION_CLASSES } from './Section.constants';
import { buildSectionClasses } from './Section.utils';

export type { SectionProps } from './Section.types';

/**
 * Section Component - W3F Framework
 *
 * Contenedor semántico de sección con título opcional.
 *
 * @example
 * <Section title="Configuración">
 *   <Form>...</Form>
 * </Section>
 */
const Section: React.FC<SectionProps> = ({
    children,
    title,
    as: Element = 'section',
    className,
    style,
    ...rest
}) => {
    const classes = buildSectionClasses(className);

    return (
        <Element className={classes} style={style} {...rest}>
            {title && <h2 className={SECTION_CLASSES.title}>{title}</h2>}
            {children}
        </Element>
    );
};

Section.displayName = 'Section';

export { Section };
export default Section;

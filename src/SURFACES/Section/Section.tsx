import React, { forwardRef } from 'react';
import { Panel } from '../../LAYOUT/Panels/Panel';
import type { SectionProps } from './Section.types';
import { SECTION_DEFAULTS, SECTION_CLASSES } from './Section.constants';
import { buildSectionPanelClassName } from './Section.utils';

/**
 * Section — Organiza contenido en secciones con título y descripción.
 * Utiliza Panel como contenedor base.
 *
 * @example
 * <Section title="Configuración" description="Ajusta los parámetros" card>
 *   <Input label="Nombre" />
 * </Section>
 */
export const Section = forwardRef<HTMLElement, SectionProps>(({
    title,
    description,
    children,
    unstyled = SECTION_DEFAULTS.unstyled,
    className = SECTION_DEFAULTS.className,
    card = SECTION_DEFAULTS.card,
    round,
    color,
    border,
    ...rest
}, ref) => {
    const panelClassName = buildSectionPanelClassName(className, unstyled);

    return (
        <Panel
            ref={ref}
            card={card}
            round={round}
            color={color}
            border={border}
            className={panelClassName}
            padding={false}
            {...rest}
        >
            <div className={SECTION_CLASSES.header}>
                <h3 className={SECTION_CLASSES.title}>{title}</h3>
            </div>
            <div className={SECTION_CLASSES.body}>
                {description && (
                    <p className={SECTION_CLASSES.description}>{description}</p>
                )}
                <div className={SECTION_CLASSES.content}>{children}</div>
            </div>
        </Panel>
    );
});

Section.displayName = 'Section';

export default Section;

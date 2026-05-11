import React from 'react';
import type { SubSectionProps } from './Section.types';
import { SUBSECTION_CLASSES } from './Section.constants';
import { buildSubSectionClasses } from './Section.utils';

export type { SubSectionProps } from './Section.types';

/**
 * SubSection Component - W3F Framework
 *
 * Sub-sección dentro de una Section con título más pequeño.
 */
const SubSection: React.FC<SubSectionProps> = ({
    children,
    title,
    className,
    style,
    ...rest
}) => {
    const classes = buildSubSectionClasses(className);

    return (
        <div className={classes} style={style} {...rest}>
            {title && <h3 className={SUBSECTION_CLASSES.title}>{title}</h3>}
            {children}
        </div>
    );
};

SubSection.displayName = 'SubSection';

export { SubSection };
export default SubSection;

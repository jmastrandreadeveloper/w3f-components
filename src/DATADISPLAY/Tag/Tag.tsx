import React, { forwardRef } from 'react';
import type { TagProps } from './Tag.types';
import { TAG_DEFAULTS } from './Tag.constants';
import { buildTagClasses } from './Tag.utils';
import { useBridgeBind } from '@w3f/bridge';

/**
 * Componente Tag - Etiqueta o Insignia (Badge).
 * Similar a la clase w3-tag de W3.CSS.
 */
const Tag = forwardRef<HTMLSpanElement, TagProps>(({
    color,
    light = TAG_DEFAULTS.light,
    variant,
    children,
    className = TAG_DEFAULTS.className,
    style = {},
    unstyled = TAG_DEFAULTS.unstyled,
    bindId,
    ...rest
}, ref) => {
    useBridgeBind({ bindId });
    const classes = buildTagClasses(color, light, className, unstyled, variant);

    return (
        <span ref={ref} className={classes} style={style} {...rest}>
            {children}
        </span>
    );
});

Tag.displayName = 'Tag';

export { Tag };
export default Tag;

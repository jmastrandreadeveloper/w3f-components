import React from 'react';
import type { StackProps } from './Stack.types';
import { STACK_DEFAULTS } from './Stack.constants';
import { buildStackClasses, buildStackStyles } from './Stack.utils';

export type { StackProps, StackSize, StackAlign, StackJustify } from './Stack.types';

/**
 * Stack — Contenedor flex para separar elementos vertical u horizontalmente.
 *
 * @example
 * // Horizontal con gap libre y alineación
 * <Stack horizontal gap="1rem" justify="end" align="center">
 *   <Button>Cancelar</Button>
 *   <Button color="primary">Guardar</Button>
 * </Stack>
 *
 * @example
 * // Vertical compacto
 * <Stack size="sm">
 *   <Input name="email" />
 *   <Input name="password" />
 * </Stack>
 */
const Stack: React.FC<StackProps> = ({
    as: Tag = 'div',
    children,
    horizontal = STACK_DEFAULTS.horizontal,
    size       = STACK_DEFAULTS.size,
    spacing,
    gap,
    align,
    justify,
    className,
    style,
    ...rest
}) => {
    const classes     = buildStackClasses(horizontal, size, spacing, gap, className);
    const inlineStyle = buildStackStyles(gap, align, justify, style);

    return (
        <Tag className={classes} style={inlineStyle} {...rest}>
            {children}
        </Tag>
    );
};

Stack.displayName = 'Stack';

export { Stack };
export default Stack;

import type React from 'react';
import type { StackSize } from './Stack.types';
import { STACK_CLASSES, ALIGN_MAP, JUSTIFY_MAP } from './Stack.constants';

export function buildStackClasses(
    horizontal: boolean,
    size: StackSize,
    spacing?: string,
    gap?: string,
    className?: string,
): string {
    const classes: string[] = [];

    if (horizontal) {
        classes.push(STACK_CLASSES.horizontal);
    } else {
        classes.push(size === 'sm' ? STACK_CLASSES.verticalSm : STACK_CLASSES.vertical);
    }

    // spacing token solo si no hay gap libre
    if (spacing && !gap) {
        classes.push(`w3f-gap-${spacing}`);
    }

    if (className) classes.push(className);

    return classes.join(' ');
}

export function buildStackStyles(
    gap?: string,
    align?: string,
    justify?: string,
    style?: React.CSSProperties,
): React.CSSProperties | undefined {
    const result: React.CSSProperties = { ...style };

    if (gap)     result.gap            = gap;
    if (align)   result.alignItems     = ALIGN_MAP[align]   ?? align;
    if (justify) result.justifyContent = JUSTIFY_MAP[justify] ?? justify;

    return Object.keys(result).length ? result : undefined;
}

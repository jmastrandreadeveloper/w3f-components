import type { CSSProperties } from 'react';
import type { FabColor, FabSize, FabPosition } from './FloatingActionButton.types';
import { FAB_CLASSES } from './FloatingActionButton.constants';

/**
 * Construye las clases CSS del FAB.
 */
export function buildFabClasses(
    size: FabSize,
    color: FabColor,
    position: FabPosition,
    extended: boolean,
    hasText: boolean,
    mobileIconOnly: boolean,
    disabled: boolean,
    hasError: boolean,
    className?: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [FAB_CLASSES.base, 'w3f-fab--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        FAB_CLASSES.base,
        FAB_CLASSES.sizes[size],
        FAB_CLASSES.colors[color],
        position.includes('left') && FAB_CLASSES.positions.left,
        position.includes('center') && FAB_CLASSES.positions.center,
        position.includes('top') && FAB_CLASSES.positions.top,
        (extended || hasText) && FAB_CLASSES.extended,
        mobileIconOnly && extended && FAB_CLASSES.mobileIconOnly,
        disabled && FAB_CLASSES.disabled,
        hasError && FAB_CLASSES.error,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Genera el estilo inline de posición para el FAB.
 */
export function buildFabStyle(position: FabPosition, offset: number): CSSProperties {
    const style: CSSProperties = {};
    if (position.includes('bottom')) {
        style.bottom = `${offset}px`;
    } else if (position.includes('top')) {
        style.top = `${offset}px`;
    }
    return style;
}

/**
 * Genera el estilo inline para el mensaje de error/helper del FAB.
 */
export function buildFabMessageStyle(
    position: FabPosition,
    offset: number,
): CSSProperties {
    return {
        position: 'fixed',
        bottom: position.includes('bottom') ? `${offset + 72}px` : 'auto',
        top: position.includes('top') ? `${offset + 72}px` : 'auto',
        right: position.includes('right') ? 'var(--w3f-space-6)' : 'auto',
        transform: position.includes('center') ? 'translateX(-50%)' : 'none',
        left: position.includes('center')
            ? '50%'
            : position.includes('left')
            ? 'var(--w3f-space-6)'
            : 'auto',
        zIndex: 1000,
        maxWidth: '200px',
    };
}

/**
 * Construye las clases del contenedor del grupo (Speed Dial).
 */
export function buildFabGroupClasses(isOpen: boolean, className?: string): string {
    return [FAB_CLASSES.group, isOpen && FAB_CLASSES.groupOpen, className]
        .filter(Boolean)
        .join(' ');
}

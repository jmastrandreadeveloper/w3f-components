import type React from 'react';
import type { BottomNavColor, BottomNavVariant } from './BottomNavigation.types';
import { BOTTOM_NAV_CLASSES } from './BottomNavigation.constants';

/**
 * Construye las clases del contenedor principal de BottomNavigation.
 */
export function buildBottomNavClasses(
    variant: BottomNavVariant,
    color: BottomNavColor,
    fixed: boolean,
    disabled: boolean,
    className: string,
    unstyled?: boolean,
): string {
    const base = BOTTOM_NAV_CLASSES.nav;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        `w3f-bottom-nav--${variant}`,
        `w3f-bottom-nav--${color}`,
        fixed && 'w3f-bottom-nav--fixed',
        disabled && 'w3f-bottom-nav--disabled',
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases de una acción individual.
 */
export function buildActionClasses(
    isActive: boolean,
    disabled: boolean,
    showLabel: boolean,
    className: string,
): string {
    return [
        BOTTOM_NAV_CLASSES.action,
        isActive && BOTTOM_NAV_CLASSES.actionActive,
        disabled && BOTTOM_NAV_CLASSES.actionDisabled,
        !showLabel && !isActive && BOTTOM_NAV_CLASSES.actionIconOnly,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Formatea el valor del badge (trunca a "99+" si supera 99).
 */
export function formatBadge(badge: React.ReactNode | number): React.ReactNode {
    if (typeof badge === 'number' && badge > 99) return '99+';
    return badge as React.ReactNode;
}

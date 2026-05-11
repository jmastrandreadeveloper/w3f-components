import type React from 'react';
import type { DrawerAnchor, DrawerColor, DrawerVariant } from './Drawer.types';
import { DRAWER_CLASSES } from './Drawer.constants';

/**
 * Construye las clases del elemento aside del Drawer.
 */
export function buildDrawerClasses(
    anchor: DrawerAnchor,
    variant: DrawerVariant,
    color: DrawerColor,
    visible: boolean,
    open: boolean,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [DRAWER_CLASSES.drawer, 'w3f-drawer--unstyled', className]
            .filter(Boolean)
            .join(' ');
    }
    return [
        DRAWER_CLASSES.drawer,
        `w3f-drawer--${anchor}`,
        `w3f-drawer--${variant}`,
        color !== 'default' && `w3f-drawer--${color}`,
        visible && open && DRAWER_CLASSES.open,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye el style de tamaño del Drawer según el anchor.
 */
export function buildDrawerSizeStyle(
    anchor: DrawerAnchor,
    width: number | string,
    height: number | string,
): React.CSSProperties {
    const isHorizontal = anchor === 'left' || anchor === 'right';
    return isHorizontal
        ? { width: typeof width === 'number' ? `${width}px` : width }
        : { height: typeof height === 'number' ? `${height}px` : height };
}

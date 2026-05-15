import type React from 'react';
import type { DrawerAnchor, DrawerColor, DrawerVariant } from './Drawer.types';
/**
 * Construye las clases del elemento aside del Drawer.
 */
export declare function buildDrawerClasses(anchor: DrawerAnchor, variant: DrawerVariant, color: DrawerColor, visible: boolean, open: boolean, className: string, unstyled?: boolean): string;
/**
 * Construye el style de tamaño del Drawer según el anchor.
 */
export declare function buildDrawerSizeStyle(anchor: DrawerAnchor, width: number | string, height: number | string): React.CSSProperties;
//# sourceMappingURL=Drawer.utils.d.ts.map
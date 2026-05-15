import type React from 'react';
import type { BottomNavColor, BottomNavVariant } from './BottomNavigation.types';
/**
 * Construye las clases del contenedor principal de BottomNavigation.
 */
export declare function buildBottomNavClasses(variant: BottomNavVariant, color: BottomNavColor, fixed: boolean, disabled: boolean, className: string, unstyled?: boolean): string;
/**
 * Construye las clases de una acción individual.
 */
export declare function buildActionClasses(isActive: boolean, disabled: boolean, showLabel: boolean, className: string): string;
/**
 * Formatea el valor del badge (trunca a "99+" si supera 99).
 */
export declare function formatBadge(badge: React.ReactNode | number): React.ReactNode;
//# sourceMappingURL=BottomNavigation.utils.d.ts.map
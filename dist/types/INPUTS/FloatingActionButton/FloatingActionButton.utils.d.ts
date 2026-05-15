import type { CSSProperties } from 'react';
import type { FabColor, FabSize, FabPosition } from './FloatingActionButton.types';
/**
 * Construye las clases CSS del FAB.
 */
export declare function buildFabClasses(size: FabSize, color: FabColor, position: FabPosition, extended: boolean, hasText: boolean, mobileIconOnly: boolean, disabled: boolean, hasError: boolean, className?: string, unstyled?: boolean): string;
/**
 * Genera el estilo inline de posición para el FAB.
 */
export declare function buildFabStyle(position: FabPosition, offset: number): CSSProperties;
/**
 * Genera el estilo inline para el mensaje de error/helper del FAB.
 */
export declare function buildFabMessageStyle(position: FabPosition, offset: number): CSSProperties;
/**
 * Construye las clases del contenedor del grupo (Speed Dial).
 */
export declare function buildFabGroupClasses(isOpen: boolean, className?: string): string;
//# sourceMappingURL=FloatingActionButton.utils.d.ts.map
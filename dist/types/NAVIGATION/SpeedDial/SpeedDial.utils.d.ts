import type React from 'react';
import type { SpeedDialColor, SpeedDialDirection, SpeedDialPosition, SpeedDialSize, SpeedDialTooltipPlacement } from './SpeedDial.types';
/**
 * Retorna el placement por defecto del tooltip según la dirección.
 */
export declare function defaultTooltipPlacement(direction: SpeedDialDirection): SpeedDialTooltipPlacement;
/**
 * Construye las clases del contenedor principal.
 */
export declare function buildSpeedDialClasses(position: SpeedDialPosition, isOpen: boolean, hidden: boolean, className: string, unstyled?: boolean): string;
/**
 * Construye las clases del FAB principal.
 */
export declare function buildFabClasses(color: SpeedDialColor, size: SpeedDialSize): string;
/**
 * Construye las clases del contenedor de acciones.
 */
export declare function buildActionsClasses(direction: SpeedDialDirection): string;
/**
 * Construye las clases del FAB de una acción.
 */
export declare function buildActionFabClasses(color: SpeedDialColor | undefined, className: string): string;
/**
 * Construye las clases del tooltip de una acción.
 */
export declare function buildActionTooltipClasses(placement: SpeedDialTooltipPlacement, tooltipOpen: boolean): string;
/**
 * Construye el estilo de offset de posición.
 */
export declare function buildOffsetStyle(position: SpeedDialPosition, offset: number | undefined): React.CSSProperties | undefined;
//# sourceMappingURL=SpeedDial.utils.d.ts.map
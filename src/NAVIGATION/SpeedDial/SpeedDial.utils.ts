import type React from 'react';
import type {
    SpeedDialColor,
    SpeedDialDirection,
    SpeedDialPosition,
    SpeedDialSize,
    SpeedDialTooltipPlacement,
} from './SpeedDial.types';
import { SPEED_DIAL_CLASSES } from './SpeedDial.constants';

/**
 * Retorna el placement por defecto del tooltip según la dirección.
 */
export function defaultTooltipPlacement(
    direction: SpeedDialDirection,
): SpeedDialTooltipPlacement {
    switch (direction) {
        case 'up':
        case 'down':
            return 'left';
        case 'left':
        case 'right':
            return 'top';
        default:
            return 'left';
    }
}

/**
 * Construye las clases del contenedor principal.
 */
export function buildSpeedDialClasses(
    position: SpeedDialPosition,
    isOpen: boolean,
    hidden: boolean,
    className: string,
    unstyled?: boolean,
): string {
    const base = SPEED_DIAL_CLASSES.container;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        `w3f-speed-dial--${position}`,
        isOpen && SPEED_DIAL_CLASSES.open,
        hidden && SPEED_DIAL_CLASSES.hidden,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del FAB principal.
 */
export function buildFabClasses(color: SpeedDialColor, size: SpeedDialSize): string {
    return [
        SPEED_DIAL_CLASSES.fab,
        `w3f-speed-dial__fab--${color}`,
        size !== 'default' && `w3f-speed-dial__fab--${size}`,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del contenedor de acciones.
 */
export function buildActionsClasses(direction: SpeedDialDirection): string {
    return [SPEED_DIAL_CLASSES.actions, `w3f-speed-dial__actions--${direction}`]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del FAB de una acción.
 */
export function buildActionFabClasses(
    color: SpeedDialColor | undefined,
    className: string,
): string {
    return [
        SPEED_DIAL_CLASSES.actionFab,
        color && `w3f-speed-dial-action__fab--${color}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye las clases del tooltip de una acción.
 */
export function buildActionTooltipClasses(
    placement: SpeedDialTooltipPlacement,
    tooltipOpen: boolean,
): string {
    return [
        SPEED_DIAL_CLASSES.actionTooltip,
        `w3f-speed-dial-action__tooltip--${placement}`,
        tooltipOpen && SPEED_DIAL_CLASSES.actionTooltipOpen,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Construye el estilo de offset de posición.
 */
export function buildOffsetStyle(
    position: SpeedDialPosition,
    offset: number | undefined,
): React.CSSProperties | undefined {
    if (offset === undefined) return undefined;
    const style: React.CSSProperties = {};
    if (position.includes('bottom')) style.bottom = `${offset}px`;
    if (position.includes('top')) style.top = `${offset}px`;
    if (position.includes('right')) style.right = `${offset}px`;
    if (position.includes('left')) style.left = `${offset}px`;
    return style;
}

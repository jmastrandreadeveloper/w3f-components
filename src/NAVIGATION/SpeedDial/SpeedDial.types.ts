import type React from 'react';

// ─── Tipos de dirección, posición, color, tamaño ───────────────────────────
export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';
export type SpeedDialPosition =
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left';
export type SpeedDialColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
export type SpeedDialSize = 'default' | 'sm' | 'lg';
export type SpeedDialTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type SpeedDialOpenReason = 'toggle' | 'hover' | 'focus';
export type SpeedDialCloseReason =
    | 'toggle'
    | 'hover'
    | 'blur'
    | 'escapeKeyDown'
    | 'backdropClick';

// ─── Props del componente principal ───────────────────────────────────────
export interface SpeedDialProps {
    ariaLabel: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    openIcon?: React.ReactNode;
    direction?: SpeedDialDirection;
    open?: boolean;
    defaultOpen?: boolean;
    onOpen?: (e: React.SyntheticEvent, reason: SpeedDialOpenReason) => void;
    onClose?: (e: React.SyntheticEvent | KeyboardEvent, reason: SpeedDialCloseReason) => void;
    hidden?: boolean;
    color?: SpeedDialColor;
    size?: SpeedDialSize;
    position?: SpeedDialPosition;
    offset?: number;
    openOnHover?: boolean;
    backdrop?: boolean;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
}

// ─── Props de la acción ────────────────────────────────────────────────────
export interface SpeedDialActionProps {
    icon?: React.ReactNode;
    tooltipTitle?: string;
    tooltipOpen?: boolean;
    tooltipPlacement?: SpeedDialTooltipPlacement;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    color?: SpeedDialColor;
    disabled?: boolean;
    className?: string;
    // Internas (inyectadas por SpeedDial via cloneElement)
    _direction?: SpeedDialDirection;
    _onActionClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

import type React from 'react';
import type { SpeedDialCloseReason, SpeedDialOpenReason } from './SpeedDial.types';
/**
 * Hook que gestiona el estado abierto/cerrado del SpeedDial.
 */
export declare function useSpeedDialOpen(openProp: boolean | undefined, defaultOpen: boolean, onOpen: ((e: React.SyntheticEvent, reason: SpeedDialOpenReason) => void) | undefined, onClose: ((e: React.SyntheticEvent | KeyboardEvent, reason: SpeedDialCloseReason) => void) | undefined): {
    isOpen: boolean;
    handleOpen: (event: React.SyntheticEvent, reason: SpeedDialOpenReason) => void;
    handleClose: (event: React.SyntheticEvent | KeyboardEvent, reason: SpeedDialCloseReason) => void;
    handleToggle: (event: React.MouseEvent) => void;
    handleActionClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
/**
 * Hook que gestiona apertura/cierre por hover.
 */
export declare function useSpeedDialHover(openOnHover: boolean, handleOpen: (e: React.SyntheticEvent, reason: SpeedDialOpenReason) => void, handleClose: (e: React.SyntheticEvent | KeyboardEvent, reason: SpeedDialCloseReason) => void, containerRef: React.RefObject<HTMLElement | null>): {
    handleMouseEnter: (event: React.MouseEvent) => void;
    handleMouseLeave: (event: React.MouseEvent) => void;
    handleFocus: (event: React.FocusEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
};
/**
 * Hook que escucha la tecla Escape para cerrar el SpeedDial.
 */
export declare function useSpeedDialEscKey(isOpen: boolean, handleClose: (e: KeyboardEvent, reason: SpeedDialCloseReason) => void): void;
//# sourceMappingURL=SpeedDial.hooks.d.ts.map
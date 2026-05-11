import { useState, useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import type {
    SpeedDialCloseReason,
    SpeedDialOpenReason,
} from './SpeedDial.types';
import { HOVER_CLOSE_DELAY } from './SpeedDial.constants';

/**
 * Hook que gestiona el estado abierto/cerrado del SpeedDial.
 */
export function useSpeedDialOpen(
    openProp: boolean | undefined,
    defaultOpen: boolean,
    onOpen: ((e: React.SyntheticEvent, reason: SpeedDialOpenReason) => void) | undefined,
    onClose: ((e: React.SyntheticEvent | KeyboardEvent, reason: SpeedDialCloseReason) => void) | undefined,
) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp! : internalOpen;

    const handleOpen = useCallback(
        (event: React.SyntheticEvent, reason: SpeedDialOpenReason) => {
            if (!isControlled) setInternalOpen(true);
            if (onOpen) onOpen(event, reason);
        },
        [isControlled, onOpen],
    );

    const handleClose = useCallback(
        (event: React.SyntheticEvent | KeyboardEvent, reason: SpeedDialCloseReason) => {
            if (!isControlled) setInternalOpen(false);
            if (onClose) onClose(event, reason);
        },
        [isControlled, onClose],
    );

    const handleToggle = useCallback(
        (event: React.MouseEvent) => {
            if (isOpen) {
                handleClose(event, 'toggle');
            } else {
                handleOpen(event, 'toggle');
            }
        },
        [isOpen, handleClose, handleOpen],
    );

    const handleActionClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            handleClose(event, 'toggle');
        },
        [handleClose],
    );

    return { isOpen, handleOpen, handleClose, handleToggle, handleActionClick };
}

/**
 * Hook que gestiona apertura/cierre por hover.
 */
export function useSpeedDialHover(
    openOnHover: boolean,
    handleOpen: (e: React.SyntheticEvent, reason: SpeedDialOpenReason) => void,
    handleClose: (e: React.SyntheticEvent | KeyboardEvent, reason: SpeedDialCloseReason) => void,
    containerRef: React.RefObject<HTMLElement | null>,
) {
    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent) => {
            if (!openOnHover) return;
            if (hoverTimerRef.current) {
                clearTimeout(hoverTimerRef.current);
                hoverTimerRef.current = null;
            }
            handleOpen(event, 'hover');
        },
        [openOnHover, handleOpen],
    );

    const handleMouseLeave = useCallback(
        (event: React.MouseEvent) => {
            if (!openOnHover) return;
            hoverTimerRef.current = setTimeout(() => {
                handleClose(event, 'hover');
            }, HOVER_CLOSE_DELAY);
        },
        [openOnHover, handleClose],
    );

    const handleFocus = useCallback(
        (event: React.FocusEvent) => {
            if (openOnHover) handleOpen(event, 'focus');
        },
        [openOnHover, handleOpen],
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent) => {
            if (
                openOnHover &&
                containerRef.current &&
                !containerRef.current.contains(event.relatedTarget as Node)
            ) {
                handleClose(event, 'blur');
            }
        },
        [openOnHover, handleClose, containerRef],
    );

    // Limpiar timer al desmontar
    useEffect(() => {
        return () => {
            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        };
    }, []);

    return { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur };
}

/**
 * Hook que escucha la tecla Escape para cerrar el SpeedDial.
 */
export function useSpeedDialEscKey(
    isOpen: boolean,
    handleClose: (e: KeyboardEvent, reason: SpeedDialCloseReason) => void,
) {
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose(event, 'escapeKeyDown');
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);
}

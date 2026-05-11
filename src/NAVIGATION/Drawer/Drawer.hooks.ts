import { useState, useEffect, useCallback, useRef } from 'react';
import type { DrawerVariant, DrawerCloseReason } from './Drawer.types';
import { DRAWER_DEFAULTS } from './Drawer.constants';

/**
 * Hook que gestiona el ciclo de vida de montaje/desmontaje animado del Drawer.
 */
export function useDrawerAnimation(open: boolean, variant: DrawerVariant) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
        } else {
            setVisible(false);
            if (variant === 'temporary') {
                const timer = setTimeout(
                    () => setMounted(false),
                    DRAWER_DEFAULTS.animationDuration,
                );
                return () => clearTimeout(timer);
            }
        }
    }, [open, variant]);

    return { mounted, visible };
}

/**
 * Hook que registra el listener de tecla ESC para cerrar el Drawer.
 */
export function useDrawerEscKey(
    open: boolean,
    closeOnEsc: boolean,
    variant: DrawerVariant,
    onClose: ((e: Event, reason: DrawerCloseReason) => void) | undefined,
) {
    useEffect(() => {
        if (!open || !closeOnEsc || variant === 'permanent') return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onClose) onClose(e, 'escapeKeyDown');
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEsc, onClose, variant]);
}

/**
 * Hook que bloquea el scroll del body cuando el Drawer temporal está abierto.
 */
export function useDrawerBodyScroll(open: boolean, variant: DrawerVariant) {
    useEffect(() => {
        if (variant !== 'temporary') return;
        if (open) {
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [open, variant]);
}

/**
 * Hook que gestiona el focus trap para el Drawer temporal.
 */
export function useDrawerFocusTrap(
    open: boolean,
    variant: DrawerVariant,
    drawerRef: React.RefObject<HTMLElement | null>,
) {
    useEffect(() => {
        if (!open || variant !== 'temporary' || !drawerRef.current) return;
        const prev = document.activeElement as HTMLElement | null;
        drawerRef.current.focus();
        return () => {
            if (prev?.focus) prev.focus();
        };
    }, [open, variant, drawerRef]);
}

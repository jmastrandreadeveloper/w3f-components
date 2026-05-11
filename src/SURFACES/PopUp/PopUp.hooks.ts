import { useEffect, useCallback } from 'react';

/**
 * Maneja el cierre del PopUp con tecla Escape y bloqueo del scroll del body.
 */
export function usePopUpKeyboard(isOpen: boolean, onClose: () => void): void {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);
}

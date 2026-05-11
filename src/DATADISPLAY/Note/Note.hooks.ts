import { useState, useCallback } from 'react';

/**
 * Hook para manejar la lógica de dismiss/cierre de una nota.
 */
export const useNoteDismiss = (onDismiss?: () => void) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = useCallback(() => {
        setIsVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    }, [onDismiss]);

    return { isVisible, handleDismiss };
};

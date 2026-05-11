import { useState, useCallback } from 'react';

/**
 * Hook para manejar el estado de colapsado/desplegado de un panel.
 */
export const usePanelState = (initialState: boolean = true) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const togglePanel = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return {
        isOpen,
        togglePanel,
    };
};

import { useState } from 'react';

/**
 * Hook para mantener la coherencia estructural con otros componentes.
 */
export const useVerticalPaddingState = () => {
    const [isReady] = useState(true);

    return {
        isReady,
    };
};

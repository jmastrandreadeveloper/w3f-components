import { useState, useEffect, useRef } from 'react';

/**
 * Hook para la animación de expand/collapse de StepContent (vertical).
 */
export function useStepContentAnimation(active: boolean) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState(active ? 'none' : '0');

    useEffect(() => {
        if (active) {
            const el = contentRef.current;
            if (el) setMaxHeight(`${el.scrollHeight + 50}px`);
        } else {
            setMaxHeight('0');
        }
    }, [active]);

    return { contentRef, maxHeight };
}

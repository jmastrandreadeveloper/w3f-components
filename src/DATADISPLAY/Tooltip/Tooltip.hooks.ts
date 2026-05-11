import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Hook para manejar la visibilidad del tooltip con delays.
 */
export const useTooltipVisibility = (showDelay: number, hideDelay: number) => {
    const [isVisible, setIsVisible] = useState(false);
    const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = useCallback(() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        showTimerRef.current = setTimeout(() => {
            setIsVisible(true);
        }, showDelay);
    }, [showDelay]);

    const handleMouseLeave = useCallback(() => {
        if (showTimerRef.current) clearTimeout(showTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
            setIsVisible(false);
        }, hideDelay);
    }, [hideDelay]);

    useEffect(() => {
        return () => {
            if (showTimerRef.current) clearTimeout(showTimerRef.current);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

    return { isVisible, handleMouseEnter, handleMouseLeave };
};

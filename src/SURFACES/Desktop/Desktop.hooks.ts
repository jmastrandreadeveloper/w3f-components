import { useState, useCallback, useEffect } from 'react';
import { bringToFront, syncWindowOrder } from './Desktop.utils';

/**
 * Gestiona el orden z-index de las ventanas en el Desktop.
 */
export function useWindowOrder(children: React.ReactNode) {
    const [windowOrder, setWindowOrder] = useState<string[]>([]);

    useEffect(() => {
        const currentKeys: string[] = [];
        const childArray = Array.isArray(children) ? children : [children];
        for (const child of childArray) {
            if (child && typeof child === 'object' && 'key' in child && child.key) {
                currentKeys.push(String(child.key));
            }
        }
        setWindowOrder((prev) => syncWindowOrder(prev, currentKeys));
    }, [children]);

    const handleWindowFocus = useCallback((key: string) => {
        setWindowOrder((prev) => bringToFront(prev, key));
    }, []);

    return { windowOrder, handleWindowFocus };
}

import type React from 'react';

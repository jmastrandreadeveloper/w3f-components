import { useState, useCallback, useRef, useEffect } from 'react';
import { SUBMENU_CLOSE_DELAY } from './Menu.constants';

/**
 * Gestiona apertura/cierre del MenuBarCategory con cierre al hacer clic fuera.
 */
export function useMenuOpen() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, close]);

    return { isOpen, toggle, close, containerRef };
}

/**
 * Gestiona el hover-delay del submenú de un MenuItem.
 */
export function useMenuItemSubmenu() {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowSubmenu(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => setShowSubmenu(false), SUBMENU_CLOSE_DELAY);
    }, []);

    return { showSubmenu, setShowSubmenu, handleMouseEnter, handleMouseLeave };
}

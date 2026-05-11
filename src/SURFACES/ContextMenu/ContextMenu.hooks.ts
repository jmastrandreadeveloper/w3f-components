import { useState, useCallback, useEffect, useRef } from 'react';
import type { MenuPosition } from './ContextMenu.utils';

interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
}

/**
 * Gestiona el estado del menú contextual (posición, visibilidad, cierre).
 */
export function useContextMenu(wrapperRef?: React.RefObject<HTMLDivElement | null>) {
    const [menuState, setMenuState] = useState<ContextMenuState>({
        visible: false,
        x: 0,
        y: 0,
    });
    const menuRef = useRef<HTMLDivElement>(null);

    const showMenu = useCallback((x: number, y: number) => {
        setMenuState({ visible: true, x, y });
    }, []);

    const hideMenu = useCallback(() => {
        setMenuState((prev) => ({ ...prev, visible: false }));
    }, []);

    useEffect(() => {
        if (!menuState.visible) return;

        const handleClose = (e: MouseEvent | KeyboardEvent) => {
            if ((e as KeyboardEvent).key === 'Escape') {
                hideMenu();
                return;
            }
            const target = e.target as Node;
            // Click outside the dropdown closes the menu
            if (e.type === 'click' && !menuRef.current?.contains(target)) {
                hideMenu();
                return;
            }
            // Right-click outside both dropdown AND wrapper closes the menu
            if (e.type === 'contextmenu' &&
                !menuRef.current?.contains(target) &&
                !wrapperRef?.current?.contains(target)
            ) {
                hideMenu();
            }
        };

        document.addEventListener('click', handleClose as EventListener);
        document.addEventListener('contextmenu', handleClose as EventListener);
        document.addEventListener('keydown', handleClose as EventListener);
        return () => {
            document.removeEventListener('click', handleClose as EventListener);
            document.removeEventListener('contextmenu', handleClose as EventListener);
            document.removeEventListener('keydown', handleClose as EventListener);
        };
    }, [menuState.visible, hideMenu, wrapperRef]);

    return { menuState, menuRef, showMenu, hideMenu };
}

/**
 * Gestiona el estado del submenú de un ContextMenuItem.
 */
export function useContextMenuItemSubmenu(hasSubItems: boolean) {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (hasSubItems) setShowSubmenu(true);
    }, [hasSubItems]);

    const handleMouseLeave = useCallback(() => {
        if (hasSubItems) {
            timeoutRef.current = setTimeout(() => setShowSubmenu(false), 200);
        }
    }, [hasSubItems]);

    return { showSubmenu, setShowSubmenu, itemRef, handleMouseEnter, handleMouseLeave };
}

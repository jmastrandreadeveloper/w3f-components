/**
 * Gestiona apertura/cierre del MenuBarCategory con cierre al hacer clic fuera.
 */
export declare function useMenuOpen(): {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    containerRef: import("react").RefObject<HTMLDivElement | null>;
};
/**
 * Gestiona el hover-delay del submenú de un MenuItem.
 */
export declare function useMenuItemSubmenu(): {
    showSubmenu: boolean;
    setShowSubmenu: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
};
//# sourceMappingURL=Menu.hooks.d.ts.map
interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
}
/**
 * Gestiona el estado del menú contextual (posición, visibilidad, cierre).
 */
export declare function useContextMenu(wrapperRef?: React.RefObject<HTMLDivElement | null>): {
    menuState: ContextMenuState;
    menuRef: import("react").RefObject<HTMLDivElement | null>;
    showMenu: (x: number, y: number) => void;
    hideMenu: () => void;
};
/**
 * Gestiona el estado del submenú de un ContextMenuItem.
 */
export declare function useContextMenuItemSubmenu(hasSubItems: boolean): {
    showSubmenu: boolean;
    setShowSubmenu: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    itemRef: import("react").RefObject<HTMLDivElement | null>;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
};
export {};
//# sourceMappingURL=ContextMenu.hooks.d.ts.map